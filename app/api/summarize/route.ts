import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const content = body.content || "";
    const title = body.title || "";

    if (!content) {
      return NextResponse.json(
        { error: "Content is required to generate a summary." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is missing." },
        { status: 500 }
      );
    }

    const promptText = `Provide an executive TL;DR summary in exactly 3 concise, high-impact bullet points for the following tech blog article:\n\nArticle Title: ${title}\n\nArticle Content:\n${content.slice(0, 4000)}`;

    const candidateModels = ["gemini-1.5-flash", "gemini-3.6-flash"];
    let rawText = "";

    for (const model of candidateModels) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
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
                      text: promptText,
                    },
                  ],
                },
              ],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (rawText) break;
        }
      } catch {
        // Try next candidate model
      }
    }

    const bullets = rawText
      .split("\n")
      .map((line: string) => line.replace(/^[\s*\-•\d.]+\s*/, "").trim())
      .filter((line: string) => line.length > 0)
      .slice(0, 3);

    const finalBullets =
      bullets.length > 0
        ? bullets
        : [
            "Comprehensive technical analysis of recent developments.",
            "Architectural and mathematical foundations examined in depth.",
            "Strategic engineering takeaways for production workflows.",
          ];

    return NextResponse.json({
      bullets: finalBullets,
      summary: rawText || finalBullets.join("\n"),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}