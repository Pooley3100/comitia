'use client'
import NewResponse from "@/components/forms/NewResponse";
import { getResponsesByUrl } from "@/library/utils";
import { useState, useEffect } from "react";
import { Response } from "@prisma/client";
import LikeButtons from "./LikeButtons";

const Answers = ({ url }: { url: string }) => {
  const [formShow, setFormShow] = useState<Boolean>(false);
  const [responses, setResponses] = useState<Response[]>([]);
  const [lastResponseTimestamp, setLastResponseTimestamp] = useState<Date | null>(null);

  useEffect(() => {
    async function fetchResponses() {
      try {
        const fetchedResponses: Response[] = await getResponsesByUrl(url, lastResponseTimestamp);
        //console.log(fetchedResponses)
        //debugger;
        if (fetchedResponses.length > 0) {
          setResponses((prevResponses) => [...prevResponses, ...fetchedResponses]);
          setLastResponseTimestamp(fetchedResponses[fetchedResponses.length - 1].createdAt);
        }
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    }
    //Update Responses then set timer to check every 10 seconds
    fetchResponses();
    const timer = setInterval(() => fetchResponses(), 10000);
    return () => {
      clearInterval(timer);
    };
  }, [url, lastResponseTimestamp]);

  function formSet() {
    setFormShow(!formShow);
  }

  console.log(responses);
  return (
    <>
      {formShow && <NewResponse url={url} formSet={formSet} />}
      <div className="flex flex-col w-full h-auto bg-red-500 p-2 items-center rounded-lg mb-10">
        <h1 className="text-white text-2xl font-roman">Responses</h1>
        <ul className="flex flex-col items-center w-5/6 mt-2">
          {responses.map((response) => (
            <li key={response.id} className="bg-white w-full rounded-lg shadow-md p-2 mb-2">
              <div className="flex flex-row justify-between items-center">
                <div>
                  <p className="text-gray-400 capitalize">{response.name}</p>
                  <p className="text-black">{response.responseText}</p>
                </div>
                <LikeButtons />
              </div>
            </li>
          ))}
          <li>
            <button
              onClick={formSet}
              className="bg-white rounded-3xl p-3 hover:bg-slate-200 text-4xl text-black"
            >
              +
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Answers;