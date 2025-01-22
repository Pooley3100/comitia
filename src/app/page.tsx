import Image from "next/image";
import prisma from "@/library/prisma";

export default async function Home() {
  const questions = await prisma.questions.findMany({where: {
    public: true
  },
  include: {
    _count: {
      select: {responseId: true}
    }
  }})

  const polls = await prisma.polls.findMany({where: {
    public: true
  }});

  const sum = (arr: number[]): number => {
    return arr.reduce((acc, curr) => acc + curr, 0);
  }

  return (
    <div className="flex flex-col w-full gap-4 items-center mt-10 font-roman" id="forumList">
    {/** List of all public questions */}
    {questions.map((question) => {
      return(<a key={question.url} className="bg-red-600 w-3/5 rounded-md flex justify-between items-center p-5 shadow-lg hover:bg-red-500" href={`/${question.url}`}>
        <h2 className="text-3xl">{question.question}</h2>
        <div className="flex flex-col bg-white text-black p-2 rounded-lg"><p>Views: {question.views}</p><p>Reponses: {question._count.responseId}</p></div>
        </a>)
    })}
    {/** List of all polls */}
    {polls.map((poll) => {
      const total = sum(poll.clickCount)
      return(<a key={poll.url} id="qList" className="bg-yellow-500 w-3/5 rounded-md flex justify-between items-center p-5 shadow-lg hover:bg-yellow-700" href={`/${poll.url}`}>
        <h2 className="text-3xl">{poll.question}</h2>
        <div className="flex flex-col bg-white text-black p-2 rounded-lg w-[100px]"><p>Views: {poll.views}</p><p>Votes: {total} </p></div>
        </a>)
    })}
    </div>
  );
}
