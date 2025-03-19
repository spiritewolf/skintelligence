import { SkincareQuestionnaire } from '@/skintelligence/frontend/components/skincareQuestionnaire';

export default async function Questionnaire({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <SkincareQuestionnaire userId={id} />;
}
