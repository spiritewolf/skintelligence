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
    const pythonScriptPath = path.resolve(
      process.cwd(),
      'apps/backend/services/app.py'
    );

    const responses = questionnaireResponses
      .map((d: QuestionnaireResponse) => d.answer)
      .join(' ');

    console.log('Executing Python script at:', responses, pythonScriptPath);

    const python = spawn('python3', [pythonScriptPath, responses]);

    let resultData = '';
    let error = '';

    python.stdout.on('data', (chunk) => {
      resultData += chunk.toString();
      console.log('Python stdout:', chunk.toString());
    });

    python.stderr.on('data', (chunk) => (error += chunk.toString()));

    python.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python script failed: ${error}`));
      } else {
        try {
          const result: SkincareProduct[] = JSON.parse(resultData.trim()); //convert Python dict to JSON
          resolve(result);
        } catch (parseError) {
          reject(new Error('Failed to parse Python output as JSON'));
        }
      }
    });
  });
}
