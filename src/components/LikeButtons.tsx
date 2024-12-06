import React from 'react'
import Image from 'next/image'

/*
* Only one thumb up per IP address, submits to backend, rearragnge list by number of thumbs up
*
*/

const LikeButtons = () => {
  return (
    <div className='bg-slate-300 shadow-md p-2 w-auto flex flex-row hover:bg-slate-500'>
        <button><Image src='thumbsUp.svg' width={30} height={30} alt='thumbs up'/></button>
    </div>
  )
}

export default LikeButtons