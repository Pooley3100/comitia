import prisma from "@/library/prisma";
import { Questions } from "@prisma/client";
import Answers from "@/components/Answers";
import { Suspense } from "react";
import QRCode from "react-qr-code";
import { updateViews } from "@/library/utils";

const Forum = async ({ params }: { params: Promise<{ slug: string }>}) => {
  const url = (await params).slug
  console.log("url is: ", url)
  //await new Promise((resolve) => setTimeout(resolve, 2000))
  let question: Questions | null
  //First search through question database:
  question = await prisma.questions.findFirst({ where: { url } })
    .then((question) => {
      if (question) {
        //Question found  
        return question;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  let poll = null
  //Search through polls database
  if (!question) {
    poll = await prisma.polls.findFirst({ where: { url } }).then((poll) => {
      if (poll) {
        return poll;
      } else {
        return null;
      }
    }).catch((err) => {
      console.log(err);
      return null;
    })
  }

  const NotFound = <p>Question Not Found</p>
  const QuestionList =
    <div className="flex-col w-4/5 justify-center p-2">
      {/* Question and QR code */}
      <div className="flex flex-col w-full h-auto bg-red-500 p-2 items-center rounded-lg mb-10">
        <h1 className="text-5xl font-roman text-white">{question?.question}</h1>
        <div className="flex flex-row justify-start w-full">
          <p className="w-4/6 h-auto bg-white p-3 font-roman text-black m-3 rounded-md lg:text-2xl">{question?.details}</p>
          <div className="w-2/6 justify-center items-center flex">
            <QRCode
              size={256}
              className="h-auto w-auto border-8 border-yellow-400 shadow-2xl"
              value={"http://localhost:3000/" + url}
              viewBox={'0 0 256 256'}
            />
          </div>
        </div>
      </div>

      {/* List of answers */}
      <Suspense>
        <Answers url={url} />
      </Suspense>
    </div>

  const PollObj =
    <div className="flex w-4/5 justify-center items-center p-2">
      {/* Question and QR code */}
      <div className="flex flex-col w-2/3 h-auto bg-yellow-400 p-2 items-center rounded-lg mb-10">
        <h1 className="text-5xl font-roman text-black">{poll?.question}</h1>
        <div className="flex flex-row justify-start w-full">
          <div className="w-full pt-5 justify-center items-center flex">
            <QRCode
              size={256}
              className="h-auto w-auto border-8 border-red-500 shadow-2xl"
              value={"http://localhost:3000/" + url}
              viewBox={'0 0 256 256'}
            />
          </div>
        </div>
      </div>

      {/* List of options to vote on*/}

    </div>

  return (
    <div className="flex w-ful h-full justify-center p-7">
      {(!question && !poll) ? NotFound : (question) ? QuestionList : PollObj}
    </div>
  )
}

export default Forum