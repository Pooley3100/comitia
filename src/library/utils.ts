'use server'
import prisma from './prisma';

export async function getRandomURL(): Promise<string> {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let url: string = 'q';

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

//Check poll click count for live update
export async function checkPolls(url : string): Promise<number[] | null>{
  try{
    const likes = await prisma.polls.findUnique({
      where: {url},
      select: {
        clickCount: true
      }
    })
    return (likes) ? likes?.clickCount : null;
  } catch(err){
    console.log("error in checking for poll count: ", url)
    return null
  }
}

//Looks for url for Polls
export async function getRandomURLPoll(): Promise<string> {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let url: string = 'p';

  while (url.length < 12) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    url += characters[randomIndex];
  }

  return prisma.polls.findFirst({ where: { url } })
    .then((question) => {
      if (question) {
        return getRandomURLPoll();
      } else {
        return url;
      }
    })
    .catch((err) => {
      console.log(err);
      return "Error";
    });
}

//Update list of responses for a url, return any greater than a time stamp (stop refresh whole lot every time)
export async function getResponsesByUrl(url: string, lastResponseTimestamp?: Date | null) {
  const queryTime: Date = lastResponseTimestamp ? lastResponseTimestamp : new Date('04 Dec 1995 00:12:00 GMT');
  const questionWithResponses = await prisma.questions.findUnique({
    where:  {url},
    include: {
      responseId: {
        where: {
          createdAt: {
            gt: queryTime
          }
        },
        orderBy: {
          createdAt: 'asc' //Vital as it uses last response as current response time stamp client side
        }
      },
    },
  });

  if (!questionWithResponses) {
    throw new Error("Question not found");
  }

  return questionWithResponses.responseId;
}

export async function updateViews(url: string) {
  try {
    await prisma.questions.update({
      where: { url },
      data: {
        views: {
          increment: 1
        }
      }
    });
  } catch (err) {
    console.log('Db err on update views')
  }
}

export async function updateVoteClick(url: string, index: number): Promise<null> {
  try {
    // Fetch the current clickCount array
    const poll = await prisma.polls.findUnique({
      where: { url },
      select: { clickCount: true }
    });

    if (!poll) {
      throw new Error('Poll not found');
    }

    // Update the specific element in the array
    const updatedClickCount = [...poll.clickCount];
    updatedClickCount[index] += 1;

    // Save the updated array back to the database
    await prisma.polls.update({
      where: { url },
      data: {
        clickCount: updatedClickCount
      }
    });

    return null; // Add a return statement
  } catch (err) {
    console.log('Db err on update vote count', err);
    return null; // Add a return statement
  }
}