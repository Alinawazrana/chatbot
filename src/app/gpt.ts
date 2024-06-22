'use server'

type Answer = {
  id: string;
  question: string;
  answer: string;
}

//atteched to question and answer body
export async function callChatHistory(){

  const reponse = await fetch("http://127.0.0.1:8000/chathistory",{
      method: "GET",
      headers: {
          "Content-Type": "application/json", // Set the content type
        }
    })
    const res = await reponse.json()
    return res
}


//atteched to pormpt and button
export async function callGPTfun(userQuestion: string){
    const data = {
        "message": userQuestion
    }
    const reponse = await fetch("http://127.0.0.1:8000/chatbot",{
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Set the content type
          },
        body: JSON.stringify(data),
      })
      const res = await reponse.json()
      const responseMessage: Answer = 

       {
        id: String(Math.random() + 1),
        question: userQuestion,
        answer: res
      }
      return responseMessage
}