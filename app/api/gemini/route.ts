import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mimeType, prompt } = await req.json();

    if (!imageBase64 || !mimeType || !prompt) {
      return NextResponse.json({
        error: "Missing image, MIME type, or prompt",
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType,
                data: imageBase64,
              },
            },
          ],
        },
      ],
    });

    const output = result.response.text();
    return NextResponse.json({ output }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { Message: "Internal server error" },
      { status: 500 }
    );
  }
}
