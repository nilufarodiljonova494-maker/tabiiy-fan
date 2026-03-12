
import { GoogleGenAI } from "@google/genai";

// Always initialize the client with process.env.API_KEY directly as per guidelines.
export const askScienceTutor = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]): Promise<string> => {
  // Initialize right before call to ensure the latest API key is used.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: "Siz tabiiy fanlar (Biologiya, Fizika, Kimyo, Geografiya) bo'yicha mutaxassis o'qituvchisiz. Savollarga o'zbek tilida, sodda va tushunarli tilda javob bering. Murakkab tushunchalarni o'quvchilar tushunishi uchun misollar bilan tushuntiring.",
        temperature: 0.7,
      },
    });

    // Access .text property directly (not as a function call).
    return response.text || "Kechirasiz, javob topilmadi.";
  } catch (error) {
    console.error("Gemini API xatosi:", error);
    return "Tizimda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.";
  }
};
