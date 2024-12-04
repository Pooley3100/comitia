'use client'

import NewResponse from "@/components/forms/NewResponse"
import { useState } from "react";

const Answers = () => {
    const [formShow, setFormShow] = useState<Boolean>(false);
    function formSet() {
        setFormShow(!formShow);
    }

    return (
        <>
            {formShow && <NewResponse formSet={formSet}/>}
            <div className="flex flex-col w-full h-auto bg-red-500 p-2 items-center rounded-lg mb-10">
                <h1 className="text-white text-2xl font-roman">Responses</h1>
                <ul>
                    <li><button onClick={formSet} className="bg-white rounded-3xl p-3 hover:bg-slate-200 text-4xl">+</button></li>
                </ul>
            </div>
        </>
    )
}

export default Answers