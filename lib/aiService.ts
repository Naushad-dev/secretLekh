import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function summarizeNote(content: string): Promise<string> {
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_AI_MODEL || '' });

    const prompt = `Summarize the following note in 3 concise bullet points. Only use information present in the note. Format each bullet point starting with "• ". Note: ${content}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    console.log("The response from AI...", text)

    if (!text) {
        throw new Error('No summary returned from AI');
    }

    return text;
}
