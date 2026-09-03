import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const { content, title } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: 'Article content is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey.trim().length > 0) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const prompt = `You are a technical AI researcher summarizer for SAGE University Bhopal blog.
Summarize the following technical article into exactly 3 clear, high-impact bullet points. Each bullet point should be 1 to 2 concise sentences highlighting key technical takeaways. Do not include introductory text, numbers, or bullet markers like asterisks or dashes. Return each bullet point on a new line.

Article Title: ${title}

Article Content:
${content.slice(0, 4000)}`;

        let text = '';
        const candidateModels = ['gemini-1.5-pro', 'gemini-3.6-flash'];

        for (const modelName of candidateModels) {
          try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent(prompt);
            text = result.response.text();
            if (text) break;
          } catch (modelErr: any) {
            console.warn(`Model ${modelName} failed, trying next candidate:`, modelErr.message);
          }
        }

        const bullets = text
          .split('\n')
          .map((line) => line.replace(/^[\s*\-•\d.]+\s*/, '').trim())
          .filter((line) => line.length > 0)
          .slice(0, 3);

        if (bullets.length > 0) {
          return NextResponse.json({ bullets });
        }
      } catch (genAiError) {
        console.error("Gemini API call failed, falling back to heuristic summary:", genAiError);
      }
    }

    // Heuristic Fallback when GEMINI_API_KEY is not set or API call fails
    const sentences = content
      .replace(/#+\s+/g, '')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/\$\$[\s\S]*?\$\$/g, '')
      .replace(/\$[^$]+\$/g, '')
      .split(/(?<=[.!?])\s+/)
      .filter((s: string) => s.trim().length > 20);

    const bullets = [
      sentences[0] || `Technical overview of ${title} at SAGE University Bhopal.`,
      sentences[Math.floor(sentences.length / 2)] || `Mathematical and architectural insights into model evaluation and state representation.`,
      sentences[sentences.length - 1] || `Key engineering takeaways for real-world deployment and campus research.`,
    ].map((s: string) => s.trim());

    return NextResponse.json({ bullets, note: 'Generated using heuristic fallback (set GEMINI_API_KEY for live API inference)' });
  } catch (error) {
    console.error('Error in /api/summarize:', error);
    return NextResponse.json(
      { error: 'An error occurred while generating the summary' },
      { status: 500 }
    );
  }
}
