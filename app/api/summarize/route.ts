import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json(
        { error: "Content is required to generate a summary." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured in environment variables." },
        { status: 500 }
      );
    }

    // Direct REST call to Gemini API (avoids version mismatches and keeps build lightweight)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Provide an executive TL;DR summary in exactly 3 concise, high-impact bullet points for the following tech blog article:\n\n${content}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.text();
      return NextResponse.json(
        { error: `Gemini API error: ${errData}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const summary =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No summary generated.";

    return NextResponse.json({ summary });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}