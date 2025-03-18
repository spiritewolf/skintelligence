import { QuestionnaireResponse } from '@prisma/client';
import { SkincareProduct } from '@skintelligence/backend/types';
import { spawn } from 'child_process';
import path from 'path';

export async function getSkincareProductRecommendations({
  questionnaireResponses,
}: {
  questionnaireResponses: QuestionnaireResponse[];
}): Promise<SkincareProduct[]> {
  return new Promise((resolve, reject) => {
    if (!questionnaireResponses || questionnaireResponses.length === 0) {
      return reject(
        new Error('Invalid input: questionnaireResponses cannot be empty.')
      );
    }

    const pythonScriptPath = path.resolve(
      process.cwd(),
      'apps/backend/services/app.py'
    );

    import('fs').then((fs) => {
      if (!fs.existsSync(pythonScriptPath)) {
        return reject(
          new Error(`Python script not found at: ${pythonScriptPath}`)
        );
      }
    });

    //extract answers
    const responses = questionnaireResponses.map((d) => d.answer).join(' ');

    console.log('Executing Python script:', pythonScriptPath);
    console.log('Passing responses:', responses);

    //spawn Python process
    const python = spawn('python3', [pythonScriptPath, responses]);

    let resultData = '';
    let errorData = '';

    python.stdout.on('data', (chunk) => {
      resultData += chunk.toString();
      console.log('Python stdout:', chunk.toString());
    });

    python.stderr.on('data', (chunk) => {
      errorData += chunk.toString();
      console.error('Python stderr:', chunk.toString());
    });

    python.on('error', (err) => {
      console.error('Failed to start Python script:', err);
      reject(new Error(`Failed to execute Python script: ${err.message}`));
    });

    python.on('close', (code) => {
      if (code !== 0) {
        return reject(
          new Error(
            `Python script failed with exit code ${code}: ${errorData.trim()}`
          )
        );
      }

      try {
        const result: SkincareProduct[] = JSON.parse(resultData.trim());
        resolve(result);
      } catch (parseError) {
        console.error('Failed to parse Python output:', parseError);
        reject(new Error('Failed to parse Python output as JSON.'));
      }
    });
  });
}
