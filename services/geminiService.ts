
import { GoogleGenAI, Type } from "@google/genai";
import { SynthParams } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generatePatchFromPrompt = async (prompt: string): Promise<SynthParams> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Translate this musical description into 4 parameters (Blue, Green, White, Red) each from 0-100. 
               Description: "${prompt}"
               Blue controls brightness. Green controls movement. White controls space. Red controls grit.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          blue: { type: Type.NUMBER },
          green: { type: Type.NUMBER },
          white: { type: Type.NUMBER },
          red: { type: Type.NUMBER }
        },
        required: ["blue", "green", "white", "red"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text || '{}');
    return {
      blue: Math.min(100, Math.max(0, data.blue || 50)),
      green: Math.min(100, Math.max(0, data.green || 50)),
      white: Math.min(100, Math.max(0, data.white || 50)),
      red: Math.min(100, Math.max(0, data.red || 50)),
    };
  } catch (e) {
    return { blue: 50, green: 50, white: 50, red: 50 };
  }
};
