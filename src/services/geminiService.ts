const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function searchProductsWithGemini(query: string) {
  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not found");

  const response = await fetch(
    "https://api.generativeai.google/v1beta2/models/text-bison-001:generate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `Analyze demand, competition, and profit potential for this product in Algeria: ${query}`,
        temperature: 0.7,
        max_output_tokens: 500,
      }),
    }
  );

  const data = await response.json();
  return data.candidates?.[0]?.content || "No recommendations yet";
}
