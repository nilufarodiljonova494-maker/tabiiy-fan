import express from "express";
import type { Request, Response } from "express";
import path from "path";
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

interface HistoryPart {
  text: string;
}

interface HistoryEntry {
  role: "user" | "model";
  parts: HistoryPart[];
}

interface TutorRequestBody {
  prompt?: string;
  history?: HistoryEntry[];
  grade?: string;
  mode?: string;
}

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    ok: true,
    hasKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

app.post("/api/tutor", async (req: Request, res: Response) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(503).json({
      error: "GEMINI_API_KEY sozlanmagan. Settings > Secrets bo'limida GEMINI_API_KEY ni tekshiring.",
    });
    return;
  }

  const body = (req.body ?? {}) as TutorRequestBody;
  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  if (!prompt) {
    res.status(400).json({ error: "Savol matni bo'sh bo'lmasligi kerak." });
    return;
  }

  const gradeLabel = body.grade === "3" ? "3-sinf" : body.grade === "4" ? "4-sinf" : "3-4-sinf";
  const modeGuidance: Record<string, string> = {
    explain: "Mavzuni o'quvchi uchun sodda, qiziqarli va hayotiy misollar bilan tushuntirib bering.",
    lesson: "O'qituvchi uchun aniq tuzilgan dars rejasi (maqsad, kirish, asosiy qism, mustahkamlash va uyga vazifa) tuzib bering.",
    experiment: "Boshlang'ich sinf o'quvchilari uchun xavfsiz, oddiy uy sharoitida bajarish mumkin bo'lgan qiziqarli tajriba va tushuntirish bering.",
    quiz: "Mavzu bo'yicha 5 ta qiziqarli test savoli (4 ta variant bilan) va oxirida to'g'ri javoblar kalitini bering.",
  };

  const extraMode = body.mode && modeGuidance[body.mode] ? ` ${modeGuidance[body.mode]}` : "";
  const systemInstruction =
    `Siz boshlang'ich ta'lim (${gradeLabel}) Tabiiy fanlar (Biologiya, Fizika, Kimyo, Geografiya, Koinot) bo'yicha aqlli AI ustozsiz. ` +
    `Barcha javoblarni sof, ravon va tushunarli o'zbek tilida (lotin alifbosida) yozing. ` +
    `Javoblaringiz aniq, ilmiy jihatdan to'g'ri, bolalar va o'qituvchilar uchun qulay tuzilgan bo'lsin.${extraMode}`;

  const rawHistory = Array.isArray(body.history) ? body.history : [];
  const safeHistory = rawHistory
    .filter(
      (item): item is HistoryEntry =>
        (item?.role === "user" || item?.role === "model") &&
        Array.isArray(item.parts) &&
        item.parts.some((p) => typeof p?.text === "string" && p.text.trim().length > 0)
    )
    .slice(-12)
    .map((item) => ({
      role: item.role,
      parts: item.parts
        .filter((p) => typeof p?.text === "string" && p.text.trim().length > 0)
        .map((p) => ({ text: p.text })),
    }));

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
      timeout: 20000,
      retryOptions: { attempts: 2 },
    },
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: [
        ...safeHistory,
        { role: "user", parts: [{ text: prompt }] },
      ],
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
        abortSignal: controller.signal,
      },
    });

    clearTimeout(timeoutId);
    const text = response.text?.trim();
    if (!text) {
      res.status(502).json({ error: "AI javob qaytarmadi. Iltimos, savolni qayta yuboring." });
      return;
    }

    res.json({ text });
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const errObj = err as { status?: number; message?: string; name?: string };
    const status = typeof errObj?.status === "number" ? errObj.status : 500;
    const message = errObj?.message || "Server xatoligi yuz berdi.";
    console.error("Gemini API error:", status, errObj?.name, message);

    if (errObj?.name === "AbortError" || status === 504) {
      res.status(504).json({
        error: "AI javobi kutish vaqti tugadi. Iltimos, qayta urinib ko'ring.",
      });
      return;
    }
    if (status === 400 || status === 403) {
      res.status(status).json({
        error: "API kalit bilan bog'liq xatolik (Settings > Secrets bo'limida GEMINI_API_KEY ni tekshiring).",
      });
      return;
    }
    if (status === 429) {
      res.status(429).json({
        error: "So'rovlar limiti vaqtincha tugadi. Birozdan so'ng qayta urinib ko'ring.",
      });
      return;
    }
    res.status(status >= 400 && status < 600 ? status : 500).json({
      error: `AI xizmatida xatolik: ${message}`,
    });
  }
});

async function startServer() {
  const gamesDir = path.resolve(
    process.cwd(),
    process.env.NODE_ENV === "production" ? "dist/games" : "public/games"
  );
  app.use("/games", express.static(gamesDir));
  app.use("/games", (_req: Request, res: Response) => {
    res.status(404).send("O'yin fayli topilmadi");
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), "dist");
    app.use(express.static(distDir));
    app.get("/{*splat}", (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
