import { analyzeJob } from "../services/gemini";

function TestAI() {
  async function runAI() {
    try {
      alert("Calling OpenRouter AI...");

      const result = await analyzeJob(
        "Microsoft is hiring a Software Engineer with salary 18 LPA."
      );

      console.log("AI Response:", result);

      alert(result);
    } catch (error) {
      console.error("OpenRouter Error:", error);
      alert("Error! Check Console (F12)");
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <button
        onClick={runAI}
        className="bg-violet-600 text-white px-8 py-4 rounded-xl"
      >
        Test OpenRouter AI
      </button>
    </div>
  );
}

export default TestAI;