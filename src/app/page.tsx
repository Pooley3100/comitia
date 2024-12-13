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
  return (
    <div className="flex flex-col w-full gap-4 items-center mt-10 font-roman">
    {/** List of all public questions */}
    {questions.map((question) => {
      return(<a className="bg-red-600 w-3/5 rounded-md flex justify-between items-center p-5 shadow-lg hover:bg-red-500" href={`/${question.url}`}>
        <h2 className="text-3xl">{question.question}</h2>
        <div className="flex flex-col bg-white text-black p-2 rounded-lg"><p>Views: {question.views}</p><p>Reponses: {question._count.responseId}</p></div>
        </a>)
    })}
    </div>
  );
}
