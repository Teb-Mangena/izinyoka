import { GoogleGenAI } from "@google/genai";
import { ENV } from "../config/env.js";

const ai = new GoogleGenAI({
  apiKey: ENV.GEMINI_API_KEY,
});

export async function verifyImage(imageUrl) {
  
  const response = await fetch(imageUrl);
  const imageArrayBuffer = await response.arrayBuffer();
  const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64');

  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
    {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64ImageData,
      },
    },
    { text: "Verify if the given image shows illegal electricity connections. provide a short feedback" }
  ],
  });

  return result.text;
}