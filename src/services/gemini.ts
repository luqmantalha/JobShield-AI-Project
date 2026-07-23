import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY is missing in .env");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3.1-flash-lite",
});

export async function analyzeJob(text: string) {
  try {
    const prompt = `
You are JobShield AI.

Analyze the given Job URL and Job Description.

Return ONLY one valid JSON object.

Rules:
- No markdown
- No explanations
- No extra text
- trustScore must be an integer (0-100)
- aiConfidence must be an integer (0-100)
- risk must be exactly one of: LOW, MEDIUM, HIGH

Evaluate:
- Company legitimacy
- Recruiter legitimacy
- Domain authenticity
- Salary realism
- Scam indicators
- Grammar and professionalism

Recommendation should be one short sentence.

Reasons must contain 4 to 6 short points.

Return EXACTLY this JSON:

{
  "company": "",
  "trustScore": 0,
  "risk": "LOW",
  "recommendation": "",
  "domainVerified": true,
  "salaryNormal": true,
  "recruiterVerified": true,
  "scamDetected": false,
  "aiConfidence": 0,
  "reasons": [
    ""
  ]
}

Job Information:

${text}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const content = response.text();

    const clean = content
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    JSON.parse(clean);

    return clean;

  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}