'use client'
import { useState } from "react";
import Image from "next/image";

/**
 * Renders a component with select buttons.
 * 
 * @param {Object} formSet - The form set object.
 * @returns {Function} - A function that takes a form option string and returns null.
 */
const SelectButtons = ({formSet} : {formSet: (formOption: string) => void}) => {
    const [showTextQ, setTextQ] = useState<Boolean>(false);
    const [showTextP, setTextP] = useState<Boolean>(false)
    function setShowText(bool: Boolean, box: String) {
        box === 'question' ? setTextQ(bool) : setTextP(bool)
    }
    return (
        <div className='w-full h-full flex justify-center items-center text-black font-roman'>
            <div className='w-full xl:w-4/5 h-4/5 flex flex-row justify-center gap-5 items-center'>
                <div className="invisible xl:visible relative w-1/2 h-full">
                    <Image src='/column.png' alt="column" layout="fill" className="" />
                </div>
                <button className={`w-1/2 h-1/2 ${showTextQ ? "bg-black bg-opacity-50" : "bg-red-500"} rounded-lg shadow-lg text-center`} onMouseEnter={() => setShowText(true, 'question')} onMouseLeave={() => setShowText(false, 'question')} onClick={() => formSet('qAndA')}>
                    {!showTextQ && <p className="text-5xl">Q&A</p>}
                    {showTextQ && <span className="  text-gray-200 p-2 text-2xl">Create a question and answer page</span>}
                </button>
                <div className="relative w-1/2 h-full">
                    <Image src='/column.png' alt="column" layout="fill" className="" />
                </div>
                <button className={`w-1/2 h-1/2 ${showTextP ? "bg-black bg-opacity-50" : "bg-yellow-400"} rounded-lg shadow-lg text-center`} onMouseEnter={() => setShowText(true, 'poll')} onMouseLeave={() => setShowText(false, 'poll')} onClick={() => formSet('poll')}>
                    {!showTextP && <p className="text-5xl">Poll</p>}
                    {showTextP && <span className="  text-gray-200 p-2 text-2xl">Create a poll</span>}
                </button>
                <div className="invisible xl:visible relative w-1/2 h-full">
                    <Image src='/column.png' alt="column" layout="fill" className="" />
                </div>
            </div>
        </div>
    )
}

export default SelectButtons