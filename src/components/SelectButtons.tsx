'use client'
import { useState } from "react";
import Image from "next/image";

/**
 * Renders a component with select buttons.
 * 
 * @param {Object} formSet - The form set object.
 * @returns {Function} - A function that takes a form option string and returns null.
 */
interface Props {
  isLiked: boolean;
  isDisliked: boolean;
  isSelected: boolean;
  selectedText: string;
  // ... other props
}

interface FormSetProps {
  formSet: (formOption: string) => void;
}

const SelectButtons = ({formSet}: FormSetProps) => {
    const [showTextQ, setTextQ] = useState<boolean>(false);
    const [showTextP, setTextP] = useState<boolean>(false);
    
    const setShowText = (bool: boolean, box: string) => {
        box === 'question' ? setTextQ(bool) : setTextP(bool);
    };
    
    return (
        <div className='w-full h-screen flex justify-center items-center text-black font-roman'>
            <div className='w-full xl:w-4/5 h-3/5 flex flex-row justify-center gap-5 items-center'>
                <div className="invisible 2xl:visible relative w-1/5 h-full">
                    <Image src='/column.png' alt="column" layout="fill" className="" />
                </div>
                <button className={`w-1/3 2xl:w-1/5 h-1/2 ${showTextQ ? "bg-black bg-opacity-50" : "bg-red-500"} rounded-lg shadow-lg text-center`} id="qButton" onMouseEnter={() => setShowText(true, 'question')} onMouseLeave={() => setShowText(false, 'question')} onClick={() => formSet('qAndA')}>
                    {!showTextQ && <p className="text-5xl">Q&A</p>}
                    {showTextQ && <span className="  text-gray-200 p-2 text-2xl">Create a question and answer page</span>}
                </button>
                <div className="relative w-1/3 2xl:w-1/5 h-full">
                    <Image src='/column.png' alt="column" layout="fill" className="" />
                </div>
                <button className={`w-1/3 2xl:w-1/5 h-1/2 ${showTextP ? "bg-black bg-opacity-50" : "bg-yellow-400"} rounded-lg shadow-lg text-center`} id="pButton" onMouseEnter={() => setShowText(true, 'poll')} onMouseLeave={() => setShowText(false, 'poll')} onClick={() => formSet('poll')}>
                    {!showTextP && <p className="text-5xl">Poll</p>}
                    {showTextP && <span className="  text-gray-200 p-2 text-2xl">Create a poll</span>}
                </button>
                <div className="invisible 2xl:visible relative w-1/5 h-full">
                    <Image src='/column.png' alt="column" layout="fill" className="" />
                </div>
            </div>
        </div>
    )
}

export default SelectButtons