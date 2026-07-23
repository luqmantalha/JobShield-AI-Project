import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY is missing.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3.1-flash-lite",
});

export async function verifyRecruiter(
  name: string,
  company: string,
  email: string
) {
  const prompt = `
You are JobShield AI.

Analyze this recruiter.

Recruiter Name: ${name}

Company: ${company}

Email: ${email}

Return ONLY valid JSON.

{
  "trustScore": 0,
  "risk": "LOW",
  "recommendation": "",
  "summary": "",
  "officialDomain": true,
  "companyVerified": true,
  "emailProfessional": true,
  "reasons": [
    ""
  ]
}

Rules:
- trustScore between 0 and 100.
- risk must be LOW, MEDIUM or HIGH.
- reasons should contain exactly 4 short points.
`;

  const result = await model.generateContent(prompt);

  const response = await result.response;

  const text = response
    .text()
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  JSON.parse(text);

  return text;
}