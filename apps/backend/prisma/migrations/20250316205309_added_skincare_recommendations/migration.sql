-- CreateTable
CREATE TABLE "SkincareProduct" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT,
    "brand" TEXT,
    "concerns" TEXT[],
    "recommendationNote" TEXT,
    "category" TEXT NOT NULL,

    CONSTRAINT "SkincareProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkincareRecommendation" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "SkincareRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SkincareProductToSkincareRecommendation" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_SkincareProductToSkincareRecommendation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SkincareProductToSkincareRecommendation_B_index" ON "_SkincareProductToSkincareRecommendation"("B");

-- AddForeignKey
ALTER TABLE "SkincareRecommendation" ADD CONSTRAINT "SkincareRecommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkincareProductToSkincareRecommendation" ADD CONSTRAINT "_SkincareProductToSkincareRecommendation_A_fkey" FOREIGN KEY ("A") REFERENCES "SkincareProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkincareProductToSkincareRecommendation" ADD CONSTRAINT "_SkincareProductToSkincareRecommendation_B_fkey" FOREIGN KEY ("B") REFERENCES "SkincareRecommendation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
