-- CreateTable
CREATE TABLE "Questions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "deatials" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Polls" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT NOT NULL,
    "clickCount" JSONB NOT NULL,

    CONSTRAINT "Polls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responses" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "responseText" TEXT NOT NULL,

    CONSTRAINT "Responses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Responses" ADD CONSTRAINT "Responses_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
