'use client'
import { useState } from "react";
import Image from "next/image";
import SelectButtons from "@/components/SelectButtons";
import QAndA from "@/components/forms/QAndA";
import Poll from "@/components/forms/Poll";

const Create = () => {
    const [formShow, setFormShow] = useState<String>("false");
    function formSet(formOption: String) {
        setFormShow(formOption);
    }
    const formCreate =
        <div className="w-full h-full flex items-center justify-center overflow-hidden ">
            <div className={`flex w-2/3 h-2/3 flex-col items-center ${formShow === 'qAndA' ? "bg-red-500" : "bg-yellow-400"} rounded-md shadow-2xl`}>
                <div className="flex w-full justify-end">
                    <button onClick={()=>formSet("false")} className="p-4 bg-white rounded-sm text-black">X</button>
                </div>
                <div className={`flex w-full h-5/6 justify-center`}>
                    {formShow === 'qAndA' ? <QAndA /> : <Poll />}
                </div>
            </div>
        </div>

    return (
        <>
            {formShow === 'false' &&
                <SelectButtons formSet={formSet} />
            }
            {formShow === 'qAndA' &&
                formCreate
            }
            {formShow === 'poll' &&
                formCreate
            }
        </>
    )
}

export default Create