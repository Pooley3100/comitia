'use client'

import React from 'react'
import { getCookie } from '@/library/clientUtils'

const DeletePage = ({ deleteId }: { deleteId: string | null }) => {
    let result = null;
    if (deleteId) {
        result = getCookie(deleteId);
    }
    return (
        <>
        {result && 
        <button>Delete Post</button>
        }
        </>
    )
}

export default DeletePage