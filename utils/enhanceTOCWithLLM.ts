import Together from "together-ai";
import { jsonrepair } from "jsonrepair"; // npm install jsonrepair

export interface TOCItemLLM {
  c: string; // Chapter/Title
  p: number; // Page number
  lv: number; // Level
  t?: TOCItemLLM[]; // Children
}

function extractJsonBlock(content: string): string {
  const match = content.match(/```json\s*([\s\S]*?)```/i);
  if (match) return match[1].trim();
  const match2 = content.match(/```([\s\S]*?)```/);
  if (match2) return match2[1].trim();
  const firstBrace = content.indexOf("{");
  const lastBrace = content.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1) {
    return content.slice(firstBrace, lastBrace + 1);
  }
  return content.trim();
}

function splitIntoChunks(text: string, maxChunkLength: number): string[] {
  const lines = text.split("\n");
  const chunks: string[] = [];
  let currentChunk = "";

  for (const line of lines) {
    if ((currentChunk + "\n" + line).length > maxChunkLength) {
      chunks.push(currentChunk.trim());
      currentChunk = line;
    } else {
      currentChunk += "\n" + line;
    }
  }
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  return chunks;
}

export async function enhanceTOCWithLLM(
  rawText: string
): Promise<TOCItemLLM[]> {
  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey) {
    throw new Error("TOGETHER_API_KEY is not set in environment variables");
  }

  const together = new Together({ apiKey });

  const model = "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free";
  const maxTokens = 4000; // Output tokens limit
  const approxCharsPerToken = 3.5;
  const maxPromptTokens = 3000; // Leave space for output
  const maxPromptChars = Math.floor(maxPromptTokens * approxCharsPerToken);

  const chunks = splitIntoChunks(rawText, maxPromptChars);
  console.log(`✅ Split input into ${chunks.length} chunk(s)`);

  let mergedResults: TOCItemLLM[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];

    console.log(
      `🚀 Sending chunk ${i + 1}/${chunks.length} (${chunk.length} characters)`
    );

    const prompt = `
You are a JSON parser specialized in book tables of contents.

INPUT (flat TOC outline):
---
${chunk}
---

TASK:
1. Parse each entry, where format is: title|page|l<level>.
2. Fix hierarchy: entries must nest under the most recent preceding item with a smaller level.
3. For every entry, create an object:
   • c (string): chapter/topic title
   • p (integer): page number
   • lv (integer): nesting level
   • t (array, optional): nested children
4. Use ONLY these keys: c, p, lv, t.
5. Omit t if no children.
6. Output a compact JSON array, no extra text, no comments, no beautification.

EXAMPLE:
\`\`\`json
[
  { "c": "Preface", "p": 19, "lv": 1 },
  {
    "c": "About this book", "p": 23, "lv": 1, "t": [
      { "c": "Who should read this book?", "p": 24, "lv": 2 },
      { "c": "How this book is organized: a roadmap", "p": 25, "lv": 2 }
    ]
  }
]
\`\`\`
Only output valid JSON following this schema.
    `.trim();

    const response = await together.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model,
      stream: false,
      max_tokens: maxTokens,
    });

    const llmContent = response.choices?.[0]?.message?.content;

    console.log(
      `📥 Received response for chunk ${i + 1}:`,
      llmContent?.slice(0, 300),
      "...\n"
    );

    try {
      if (typeof llmContent !== "string") {
        throw new Error("LLM response content is not a string");
      }
      let jsonString = llmContent.trim();
      if (!jsonString.startsWith("[") && !jsonString.startsWith("{")) {
        jsonString = extractJsonBlock(jsonString);
      }
      jsonString = jsonrepair(jsonString);
      const parsed: unknown = JSON.parse(jsonString);

      if (Array.isArray(parsed)) {
        mergedResults = mergedResults.concat(parsed as TOCItemLLM[]);
      } else if (
        parsed &&
        typeof parsed === "object" &&
        "chapters" in parsed &&
        Array.isArray((parsed as { chapters: unknown }).chapters)
      ) {
        mergedResults = mergedResults.concat(
          (parsed as { chapters: TOCItemLLM[] }).chapters
        );
      }
    } catch (e) {
      console.error(
        `❌ Failed to parse LLM response for chunk ${i + 1}:`,
        llmContent,
        e
      );
    }
  }

  console.log(
    `✅ Final merged result contains ${mergedResults.length} TOC item(s).`
  );

  return mergedResults;
}
