'use client'

import { Polls, Prisma } from "@prisma/client"
import { updateVoteClick } from "@/library/utils";
import { useState } from "react";

const PollVotePage = ({ url, pollObj }: { url: string, pollObj: Polls }) => {
  const [reveal, setReveal] = useState<Boolean>(false);
  const options = pollObj.options;
  const updateVotes = (index: number) => {
    setReveal(true)
    updateVoteClick(url, index);
  }
  const sum = (arr: number[]): number => {
    return arr.reduce((acc, curr) => acc + curr, 0);
  }
  const totVotes = sum(pollObj.clickCount)

  return (
    <div className='bg-yellow-400 flex flex-col w-2/3 h-auto gap-4 p-10 shadow-md rounded-lg text-black justify-center items-center'>
      {options &&
        options!.map((option, count) => {
          if (!reveal) {
            return (<button key={count} onClick={() => { updateVotes(count) }} className="capitalize bg-red-500 p-3 rounded-md shadow-md h-[100px] w-[200px]">{option}</button>)
          } else {
            const width = (Math.round((pollObj.clickCount[count] / totVotes) * 600)).toString()
            const test = `w-[${width}px] h-[100px] bg-yellow-500`
            console.log(test)
            return (
              <button key={count} className="w-[600px] relative bg-white h-[100px] items-center flex">
                <p className="absolute text-5xl pl-5">{option}</p>
                <div className={test}></div>
                <p className="absolute right-5 text-2xl text-blue-300">{Math.round((pollObj.clickCount[count] / totVotes) * 100)}%</p>
              </button>
            )
          }
        })
      }

    </div>
  )
}

export default PollVotePage