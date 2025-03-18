import { Context } from '@skintelligence/backend/context';
import {
  SkincareCategory,
  SkincareRecommendation,
} from '@skintelligence/backend/types';
import { FieldResolver } from 'nexus';
import { getSkincareProductRecommendations } from './util';

export const submitResponsesForRecommendationResolver: FieldResolver<
  'Mutation',
  'submitResponsesForRecommendation'
> = async (
  _parent,
  { data },
  { prismaDb, res }: Context
): Promise<SkincareRecommendation> => {
  const products = await getSkincareProductRecommendations({
    questionnaireResponses: data.responses,
  });

  const createdRecommendation = await prismaDb.skincareRecommendation.create({
    data: {
      userId: data.userId,
    },
  });
  const skincareProductCreateData = products.map((product) => ({
    ...product,
    category: product.category as SkincareCategory,
    brand: product.brand ?? null,
    concerns: product.concerns ?? undefined,
    link: product.link ?? null,
    recommendationNote: product.recommendationNote ?? null,
    recommendationId: createdRecommendation.id,
  }));

  await prismaDb.skincareProduct.createMany({
    data: skincareProductCreateData,
  });

  const skincareRecommendation =
    await prismaDb.skincareRecommendation.findUniqueOrThrow({
      where: {
        id: createdRecommendation.id,
      },
      include: {
        products: true,
      },
    });

  return {
    ...skincareRecommendation,
    products: skincareRecommendation.products.map((p) => ({
      ...p,
      category: p.category as SkincareCategory,
    })),
  };
};
