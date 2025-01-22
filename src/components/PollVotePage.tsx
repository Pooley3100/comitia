'use client'

import { Polls, Prisma } from "@prisma/client"
import { checkPolls, updateVoteClick } from "@/library/utils";
import { useEffect, useState } from "react";

const PollVotePage = ({ url, pollObj }: { url: string, pollObj: Polls }) => {
  const [reveal, setReveal] = useState<Boolean>(false);
  const [likes, setLikes] = useState<number[]>(pollObj.clickCount)
  //Live check of likes
  useEffect(() => {
    async function updateLikes(){
      const newLikes = await checkPolls(url);
      if(newLikes){
        setLikes(newLikes)
      };
    }
    const timer = setInterval(()=>updateLikes(), 20000);
    return(()=>clearInterval(timer));
  }, [])

  const options = pollObj.options;
  const updateVotes = (index: number) => {
    setReveal(true)
    pollObj.clickCount[index] += 1;
    updateVoteClick(url, index);
  }
  const sum = (arr: number[]): number => {
    return arr.reduce((acc, curr) => acc + curr, 0);
  }
  const totVotes = sum(pollObj.clickCount)

  return (
    <div className='bg-yellow-400 flex flex-col w-auto h-auto gap-4 p-10 shadow-md rounded-lg text-black justify-center items-center'>
      {options &&
        options!.map((option, count) => {
          if (!reveal) {
            return (<button key={count} onClick={() => { updateVotes(count) }} className="capitalize bg-red-500 p-3 rounded-md shadow-md h-[100px] w-[200px]">{option}</button>)
          } else {
            //Can't use tailwind for dynamic class client side so do this with styles
            const width = (Math.round((likes[count] / totVotes) * 600)).toString()
            return (
              <button key={count} className="w-[600px] relative bg-white h-[100px] items-center flex rounded-md shadow-md font-roman">
                <p className="absolute text-5xl pl-5 capitalize">{option}</p>
                <div className='h-[100px] bg-yellow-500 rounded-md shadow-md' style={{ width: `${width}px` }}></div>
                <p className="absolute right-5 text-2xl text-blue-300">{Math.round((likes[count] / totVotes) * 100)}%</p>
              </button>
            )
          }
        })
      }

    </div>
  )
}

export default PollVotePage