import React, { useState } from 'react'
import Image from 'next/image'
import { updateDbLikes } from '@/library/actions'
import {setCookie, getCookie} from '@/library/clientUtils'

/*
* Only one thumb up per cookie, not very fail safe but okay
submits to backend, rearragnge list by number of thumbs up
*   Also has to update likes client side
*/

const LikeButtons = ({responseId, likes, url, updateOrder} : {responseId: number, likes: number, url: string, updateOrder: (responseIndex : number) => void}) => {
    const [stateLikes, setStateLikes] = useState<number>(likes)
    const updateLikes = async() => {
        //check for set cookie
        const cookie = getCookie(url);
        console.log(cookie)
        if(!cookie){
          updateDbLikes(responseId);
          setCookie(url, 'like-set');
          updateOrder(responseId);
          
          //Temp update client side
          setStateLikes(stateLikes + 1);
          
        }
    }

  return (
    <div className=' shadow-md p-2 w-auto flex flex-row items-center justify-center hover:bg-yellow-200 bg-yellow-400'>
        {likes > 0 ? <div className='mr-3 p-3 rounded-3xl bg-red-500 font-roman'>{stateLikes}</div> : null}
        <button onClick={updateLikes} className=''><Image src='thumbsUp.svg' width={30} height={30} alt='thumbs up'/></button>
    </div>
  )
}

export default LikeButtons