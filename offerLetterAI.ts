import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY is missing in .env");
}

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3.1-flash-lite",
});

export async function analyzeOfferLetter(text: string) {
  try {
    const prompt = `
You are JobShield AI.

Analyze the following Offer Letter carefully.

Return ONLY one valid JSON object.

Do NOT use markdown.
Do NOT add explanations.
Do NOT wrap JSON inside \`\`\`.

Return EXACTLY this structure:

{
  "company": "",
  "trustScore": 0,
  "risk": "LOW",
  "recommendation": "",
  "summary": "",
  "domainVerified": true,
  "salaryNormal": true,
  "recruiterVerified": true,
  "joiningDatePresent": true,
  "officialEmail": true,
  "scamDetected": false,
  "aiConfidence": 0,
  "positivePoints": [
    ""
  ],
  "warningPoints": [
    ""
  ],
  "reasons": [
    ""
  ]
}

Evaluate:

- Company legitimacy
- Recruiter legitimacy
- HR email authenticity
- Company domain authenticity
- Salary realism
- Joining date availability
- Offer letter formatting
- Grammar and professionalism
- Scam indicators

Rules:

- trustScore must be an integer between 0 and 100.
- aiConfidence must be an integer between 0 and 100.
- risk must be exactly one of LOW, MEDIUM or HIGH.
- summary must be one short sentence.
- recommendation must be one short sentence.
- positivePoints must contain 3-5 points.
- warningPoints must contain 0-3 points.
- reasons must contain 4-6 short points.

Offer Letter:

${text}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const content = response.text();

    console.log("RAW GEMINI RESPONSE:");
    console.log(content);

    const clean = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      JSON.parse(clean);
    } catch {
      throw new Error(clean);
    }

    return clean;

  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}