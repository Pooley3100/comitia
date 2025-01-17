import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Upsert question: Han vs Matt
  const hanVsMatt = await prisma.questions.upsert({
    where: { url: 'han-vs-matt' },
    update: {},
    create: {
      url: 'han-vs-matt',
      question: 'Who is better: Han or Matt?',
      details: 'Based on this we shall decide which kid to get rid of',
      public: true,
      views: 0,
    },
  });

  // Add responses to the Han vs Matt question
  const response1 = await prisma.response.create({
    data: {
      name: 'Margaret',
      questionId: hanVsMatt.id,
      responseText: 'Clearly Han is smarter',
      likes: 0,
    },
  });

  const response2 = await prisma.response.create({
    data: {
      name: 'Tony',
      questionId: hanVsMatt.id,
      responseText: 'But Matt is less entitled',
      likes: 0,
    },
  });

  // Upsert poll: Favorite programming language
  const favoriteProgrammingLanguage = await prisma.polls.upsert({
    where: { url: 'favorite-programming-language' },
    update: {},
    create: {
      url: 'favorite-programming-language',
      question: 'What is your favorite programming language?',
      options: ['JavaScript', 'Python', 'TypeScript', 'Java'],
      public: true,
      clickCount: [0, 0, 0, 0],
    },
  });

  // Upsert poll: Cats vs Dogs
  const catsVsDogs = await prisma.polls.upsert({
    where: { url: 'cats-vs-dogs' },
    update: {},
    create: {
      url: 'cats-vs-dogs',
      question: 'Which is better: cats or dogs?',
      options: ['Cats', 'Dogs'],
      public: true,
      clickCount: [0, 0],
    },
  });

  console.log('Upserted question:', hanVsMatt);
  console.log('Created response:', response1);
  console.log('Created response:', response2);
  console.log('Upserted poll:', favoriteProgrammingLanguage);
  console.log('Upserted poll:', catsVsDogs);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });