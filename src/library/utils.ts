'use server'
import prisma from './prisma';

export async function getRandomURL() : Promise<string> {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let url : string = '';

    while (url.length < 12) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        url += characters[randomIndex];
    }

    return prisma.questions.findFirst({ where: { url } })
        .then((question) => {
            if (question) {
                return getRandomURL();
            } else {
                return url;
            }
        })
        .catch((err) => {
            console.log(err);
            return "Error";
        });
}

export async function getResponsesByUrl(url: string, lastResponseTimestamp?: Date | null) {
  const queryTime : Date = lastResponseTimestamp ? lastResponseTimestamp : new Date('04 Dec 1995 00:12:00 GMT');
  const questionWithResponses = await prisma.questions.findUnique({
    where: { url },
    include: {
      responseId: {
        where: {createdAt: {
          gt: queryTime
        }}
      },
    },
  });

  if (!questionWithResponses) {
    throw new Error("Question not found");
  }

  return questionWithResponses.responseId;
}