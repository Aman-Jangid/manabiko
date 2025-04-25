import Together from "together-ai";

export interface TOCItemLLM {
  title: string;
  pageNumber: number;
}

export async function enhanceTOCWithLLM(
  tocItems: TOCItemLLM[]
): Promise<TOCItemLLM[]> {
  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey)
    throw new Error("TOGETHER_API_KEY is not set in environment variables");

  const together = new Together({ apiKey });

  const prompt = `
Here is a list of extracted table of contents entries from a book:
${tocItems
  .map((item, i) => `${i + 1}. ${item.title} (p.${item.pageNumber})`)
  .join("\n")}

Please return a cleaned, deduplicated, and well-structured JSON array of main chapters only (ignore prefaces, appendices, etc.), with each item as {title, pageNumber}. Do not include any explanation, just the JSON array.
`;

  const response = await together.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    stream: false,
  });

  try {
    const content = response.choices?.[0]?.message?.content;
    if (typeof content !== "string") {
      throw new Error("LLM response content is missing or not a string");
    }
    return JSON.parse(content);
  } catch (e) {
    throw new Error(
      "Failed to parse LLM response: " +
        (e instanceof Error ? e.message : String(e))
    );
  }
}
