'use client'
import NewResponse from "@/components/forms/NewResponse";
import { getResponsesByUrl, updateViews } from "@/library/utils";
import { useState, useEffect } from "react";
import { Response } from "@prisma/client";
import LikeButtons from "./LikeButtons";
import { orderResponses } from "@/library/clientUtils";

const Answers = ({ url }: { url: string }) => {
  const [formShow, setFormShow] = useState<Boolean>(false);
  const [responses, setResponses] = useState<Response[]>([]);
  const [lastResponseTimestamp, setLastResponseTimestamp] = useState<Date | null>(null);
  useEffect(() => {
    updateViews(url);
  }, []);
  //Out here so use effect can call and to allow force updates
  async function fetchResponses() {
    try {
      //Uses time stamp to check if responses have been added.
      const fetchedResponses: Response[] = await getResponsesByUrl(url, lastResponseTimestamp);
      console.log('Fetched: ', fetchedResponses)

      if (fetchedResponses.length > 0) {
        //Update time stamp for last update.
        setLastResponseTimestamp(fetchedResponses[fetchedResponses.length - 1].createdAt);
        //Updates response and also order by likes
        setResponses((prevResponses) => {
          return (orderResponses([...prevResponses, ...fetchedResponses]))
        });
      }
    } catch (error) {
      console.error("Error fetching responses:", error);
    }
  }
  //Called by like button upon click to re order posts by likes
  function updateLikeOrder(responseIndex : number){
    setResponses((prevResponses : Response[]) => {
      const responses = prevResponses.map((response) => {
        if (response.id == responseIndex){
          response.likes += 1
        }
        return response
      })
      return(orderResponses(responses))
    })
  }
  useEffect(() => {
    //Update Responses then set timer to check every 10 seconds
    fetchResponses();
    const timer = setInterval(() => fetchResponses(), 10000);
    return () => {
      clearInterval(timer);
    };
  }, [url, lastResponseTimestamp]);

  function formSet() {
    setFormShow(!formShow);
    //Force immediate update to db for responses
    if(formShow){
      fetchResponses();
    }
  }

  console.log('Current Responses', responses);
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
                <LikeButtons updateOrder={updateLikeOrder} responseId={response.id} url={url} likes={response.likes} />
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