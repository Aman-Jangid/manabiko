import Together from "together-ai";
export interface TOCItemLLM {
  title: string;
  pageNumber: number;
  level: number;
  children?: TOCItemLLM[];
}

// Flatten TOC outline into a compact string for LLM
function flattenTOCOutline(data: TOCItemLLM[]): string {
  const result: string[] = [];
  function recurse(items: TOCItemLLM[]) {
    for (const item of items) {
      result.push(`${item.title}|${item.pageNumber}|l${item.level}`);
      if (item.children) {
        recurse(item.children);
      }
    }
  }
  recurse(data);
  return result.join(" ");
}

function buildTOCPrompt(tocItems: TOCItemLLM[]): string {
  // Only use the flattened TOC string for the LLM
  const tocString = flattenTOCOutline(tocItems);
  return `Below is a flat string representation of a book's table of contents, where each entry is formatted as: title|page|l<level>.
${tocString}

Parse this into a compact JSON array where each chapter is an object with keys: c (chapter title), p (page), lv (level), t (topics array if any), and section (if exists). Only output the JSON, no explanation, no beautification.`;
}

export async function enhanceTOCWithLLM(
  tocItems: TOCItemLLM[]
): Promise<TOCItemLLM[]> {
  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey) {
    throw new Error("TOGETHER_API_KEY is not set in environment variables");
  }

  // No pre-filtering or post-filtering, just send the input as-is
  const tocChunks = [tocItems];

  const together = new Together({ apiKey });
  let mergedResults: TOCItemLLM[] = [];
  let truncated = false;

  for (let i = 0; i < tocChunks.length; i++) {
    const prompt = buildTOCPrompt(tocChunks[i]);
    console.log("Prompt sent to LLM (chunk " + (i + 1) + "):\n", prompt);

    // Set max_tokens to 4000 for each chunk
    const maxTokens = 4000;

    const response = await together.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
      stream: false,
      max_tokens: maxTokens,
    });

    const llmContent = response.choices?.[0]?.message?.content;
    console.log(`LLM raw output for chunk ${i + 1}:`, llmContent);

    // Log the output received from the LLM
    console.log(
      "Output received from LLM (chunk " + (i + 1) + "):\n",
      llmContent
    );

    try {
      if (typeof llmContent !== "string") {
        throw new Error("LLM response content is not a string");
      }
      const parsed: unknown = JSON.parse(llmContent);
      if (Array.isArray(parsed)) {
        mergedResults = mergedResults.concat(parsed);
      } else if (
        parsed &&
        typeof parsed === "object" &&
        "chapters" in parsed &&
        Array.isArray((parsed as { chapters: unknown }).chapters)
      ) {
        const chunkResp = parsed as {
          chapters: unknown[];
          truncated?: boolean;
        };
        mergedResults = mergedResults.concat(
          chunkResp.chapters as TOCItemLLM[]
        );
        if (chunkResp.truncated) truncated = true;
      }
    } catch (e) {
      console.error(
        `Failed to parse LLM response for chunk ${
          i + 1
        } (expected compact JSON):`,
        llmContent,
        e
      );
      // Continue with next chunk
    }
  }

  if (truncated) {
    console.warn("LLM output was truncated for at least one chunk.");
  }

  return mergedResults;
}
