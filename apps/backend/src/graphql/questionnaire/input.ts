import { enumType, inputObjectType } from 'nexus';
import { SkincareCategory } from '../../types';

export const QuestionnaireResponse = inputObjectType({
  name: 'QuestionnaireResponse',
  definition(t) {
    t.nonNull.string('questionId');
    t.nonNull.string('answer');
  },
});

export const SubmitResponsesForRecommendationData = inputObjectType({
  name: 'SubmitResponsesForRecommendationData',
  definition(t) {
    t.nonNull.id('userId');
    t.nonNull.list.nonNull.field('responses', { type: QuestionnaireResponse });
  },
});

export const SkincareCategoryEnum = enumType({
  name: 'SkincareCategoryEnum',
  members: SkincareCategory,
});
