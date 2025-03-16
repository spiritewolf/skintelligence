import { extendType, nonNull, objectType } from 'nexus';
import {
  SkincareCategoryEnum,
  SubmitResponsesForRecommendationData,
} from './input';
import { submitResponsesForRecommendationResolver } from './resolvers';

// export const Questionnaire = objectType({
//   name: 'Questionnaire',
//   definition(t) {
//     t.nonNull.id('id');
//     t.nonNull.id('userId');
//     t.nullable.list.nonNull.field('responses', { type: QuestionnaireResponse });
//   },
// });

export const SkincareProduct = objectType({
  name: 'SkincareProduct',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.string('description');
    t.nullable.string('link');
    t.nonNull.field('category', { type: SkincareCategoryEnum });
  },
});

export const SkincareRecommendation = objectType({
  name: 'SkincareRecommendation',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.id('userId');
    t.nonNull.list.nonNull.field('products', { type: SkincareProduct });
  },
});

export const SkincareQuestionnaireMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('submitResponsesForRecommendation', {
      type: nonNull(SkincareRecommendation),
      args: { data: nonNull(SubmitResponsesForRecommendationData) },
      resolve: submitResponsesForRecommendationResolver,
    });
  },
});
