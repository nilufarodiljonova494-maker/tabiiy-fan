export interface TutorOptions {
  grade?: string;
  mode?: string;
}

export interface TutorResult {
  text: string;
  error?: string;
}

export const askScienceTutor = async (
  prompt: string,
  history: { role: 'user' | 'model'; parts: { text: string }[] }[],
  options?: TutorOptions
): Promise<string> => {
  const response = await fetch('/api/tutor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      history,
      grade: options?.grade,
      mode: options?.mode,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "AI xizmatiga ulanishda xatolik yuz berdi.");
  }

  return data.text || "Kechirasiz, javob topilmadi.";
};
