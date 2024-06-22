'use client'

import { useEffect, useRef, useState } from "react";
import { callChatHistory, callGPTfun } from "./gpt";

type Answer = {
  id: string;
  question: string;
  answer: string;
};

export default function Home() {
  const [message, setMessage] = useState('');
  const [answer, setAnswer] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);

  const answerContainerRef = useRef<HTMLDivElement>(null); // Add a ref for the answers container

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const history = await callChatHistory();
        setAnswer(history);
      } catch (error) {
        console.error('Failed to fetch chat history:', error);
      }
    };

    fetchChatHistory();
  }, []);

  useEffect(() => {
    // Scroll to the bottom when the answer array updates
    if (answerContainerRef.current) {
      answerContainerRef.current.scrollTop = answerContainerRef.current.scrollHeight;
    }
  }, [answer]);

  const callGPT = async () => {
    setLoading(true);
    const ans = await callGPTfun(message);
    setAnswer((prevAnswers) => [...prevAnswers, ans]);
    setMessage(''); // Clear the input field
    setLoading(false);
  };

  return (
    <main className="bg-gray-200 min-h-screen h-full">
      {/*  logo header  start*/}
      <div className="font-bold text-[24px] text- flex-col">
        <div className="fixed p-6 bg-sky-700 text-center font-extrabold text-5xl w-full text-balance text-rose-600 underline ">
          "ChatBot"
        </div>
      </div>
      {/*  logo header  end*/}

      <div className="flex justify-center items-start">
        <div className="mx-20">
          {/* question answer area start */}
          <div
            className="my-[100px] h-[calc(65vh)] overflow-y-auto bg-slate-500"
            ref={answerContainerRef} // Add the ref to the container
          >
            {answer.map(ans => (
              <div className="p-3 rounded-full bg-pink-300 text-black font-bold" key={ans.id}>
                <div>
                  <div className="p-2 bg-green-300 text-red-600 font-extrabold rounded-full">
                    Question: {ans.question}
                  </div>
                  <div className="bg-yellow-200 text-indigo-700 rounded-full px-20 py-2">
                    Answer: {ans.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* question answer area end */}
          
          {/* prompt and button start */}
          <div className="fixed bottom-0 left-0 right-0 p-6 flex justify-center bg-orange-400 text-lg rounded-full">
            <input
              placeholder="Enter your prompt"
              value={message}
              className="w-[85%] py-3 px-4 rounded-full"
              onChange={(e) => setMessage(e.currentTarget.value)}
            />
            {loading ? (
              <button className="ml-4 bg-lime-900 text-red-800 py-3 px-4 rounded-md" disabled>Loading...</button>
            ) : (
              message.length === 0 ? (
                <button className="ml-4 bg-red-700 text-black py-3 px-4 rounded-full" disabled>Send</button>
              ) : (
                <button className="ml-4 bg-teal-600 text-white py-3 px-4 rounded-full" onClick={callGPT}>Send</button>
              )
            )}
          </div>
          {/* prompt and button end */}
        </div>
      </div>
    </main>
  );
}
