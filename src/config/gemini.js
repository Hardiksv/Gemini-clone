

import {
  GoogleGenAI,
} from '@google/genai';



async function main(prompt) {
  const response = await fetch("https://gemini-clone-m3rr.onrender.com/api/gemini", {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let finalResponse = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    console.log(chunk);
    finalResponse += chunk;
  }

  return finalResponse;
}

export default main;
