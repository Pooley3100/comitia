'use client'
import { useState } from "react";
import SelectButtons from "@/components/SelectButtons";
import QAndA from "@/components/forms/QAndA";
import Poll from "@/components/forms/Poll";
import Public from "@/components/forms/Public";

const Create = () => {
    const [formShow, setFormShow] = useState<String>("false");
    const [newUrl, setNewUrl] = useState<string>('null');
    function formSet(formOption: String) {
        setFormShow(formOption);
    }
    //Once getting new form, another component is shown asking public or not then redirected to new url
    function publicSet(url: string) {
        setNewUrl(url);
        setFormShow('public');
    }
    const formCreate =
        <div className="w-full h-full flex items-center justify-center overflow-hidden ">
            <div className={`flex w-2/3 h-4/5 flex-col items-center ${formShow === 'qAndA' ? "bg-red-500" : "bg-yellow-400"} rounded-md shadow-2xl`}>
                <div className="flex w-full justify-end">
                    <button onClick={() => formSet("false")} className="p-4 bg-white rounded-sm text-black">X</button>
                </div>
                <div className={`flex w-full h-auto justify-center`}>
                    {formShow === 'qAndA' ? <QAndA update={publicSet} /> : formShow === 'poll' ? <Poll /> : formShow === 'public' ? <Public url={newUrl} /> : <></>}
                </div>
            </div>
        </div>

    return (
        <>
            {formShow === 'false' ?
                <SelectButtons formSet={formSet} />
                : formCreate}
        </>
    )
}

export default Create