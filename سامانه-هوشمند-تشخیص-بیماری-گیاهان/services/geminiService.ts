
import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosisResult } from "../types";

export const analyzePlantImage = async (base64Image: string): Promise<DiagnosisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `As an expert plant pathologist, analyze this plant image. 
  Identify if there is any disease. 
  Provide the response in PERSIAN (Farsi) language.
  Be specific and professional.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image.split(',')[1] || base64Image,
            },
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          diseaseName: { type: Type.STRING, description: "Name of the disease in Persian" },
          confidence: { type: Type.STRING, description: "Confidence level like 'بالا' or 'متوسط'" },
          description: { type: Type.STRING, description: "A brief description of the condition in Persian" },
          treatments: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of recommended treatments in Persian"
          },
          preventions: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of prevention strategies in Persian"
          },
        },
        required: ["diseaseName", "confidence", "description", "treatments", "preventions"],
      },
    },
  });

  const resultText = response.text;
  const parsed = JSON.parse(resultText);
  
  return {
    ...parsed,
    timestamp: new Date().toLocaleString('fa-IR'),
  };
};
