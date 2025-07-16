// const apikey ="AIzaSyCLGPWORojdUGZacnWLl0AQQ-nVh9ecBKg";

// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

// async function main(prompt) {
//   const ai = new GoogleGenAI({
//     apiKey: 'AIzaSyCLGPWORojdUGZacnWLl0AQQ-nVh9ecBKg',
//   });
//   const tools = [
//     {
//       googleSearch: {
//       }
//     },
//   ];
//   const config = {
//     thinkingConfig: {
//       thinkingBudget: -1,
//     },
//     tools,
//     responseMimeType: 'text/plain',
//   };
//   const model = 'gemini-2.5-pro';
//   const contents = [
//     {
//       role: 'user',
//       parts: [
//         {
//           text: prompt,
//         },
//       ],
//     },
//   ];

//   const response = await ai.models.generateContentStream({
//     model,
//     config,
//     contents,
//   });

//   let finalResponse = '';
//   for await (const chunk of response) {
//     if (chunk.text) {
//       console.log(chunk.text);        
//       finalResponse += chunk.text;    
//     }
//   }

//   return finalResponse;  
// }

// export default main;

async function main(prompt) {
  const response = await fetch("http://localhost:5000/api/gemini", {
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