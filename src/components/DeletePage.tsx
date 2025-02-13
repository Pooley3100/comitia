'use client'

import React, { useState } from 'react'
import { getCookie } from '@/library/clientUtils'

const DeletePage = ({ deleteId }: { deleteId: string | null }) => {
    const [result, setResult]= useState(false);
    React.useEffect(() => {
        if (deleteId) {
            setResult(getCookie(deleteId) ? true : false);
        }
      }, [deleteId]);
    
    return (
        <>
        {result && 
        <button>Delete Post</button>
        }
        </>
    )
}

export default DeletePage