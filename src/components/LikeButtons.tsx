import React from 'react'
import Image from 'next/image'
import { updateDbLikes } from '@/library/actions'

/*
* Only one thumb up per IP address, submits to backend, rearragnge list by number of thumbs up
*   Also has to update likes client side
*/

const LikeButtons = ({responseId, likes} : {responseId: number, likes: number}) => {
    const updateLikes = async() => {
        updateDbLikes(responseId);
    }

  return (
    <div className=' shadow-md p-2 w-auto flex flex-row items-center justify-center hover:bg-yellow-200 bg-yellow-400'>
        {likes > 0 ? <div className='mr-3 p-3 rounded-3xl bg-red-500 font-roman'>{likes}</div> : null}
        <button onClick={updateLikes} className=''><Image src='thumbsUp.svg' width={30} height={30} alt='thumbs up'/></button>
    </div>
  )
}

export default LikeButtons