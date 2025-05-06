import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export type EnhancedChapter = {
  title?: string;
  c?: string;
  p?: number | string;
  t?: EnhancedChapter[];
  topics?: EnhancedChapter[];
  children?: EnhancedChapter[];
};

export default function ChapterViewer({
  chapters,
}: {
  chapters: EnhancedChapter[];
}) {
  const [expandedChapters, setExpandedChapters] = useState<
    Record<string, boolean>
  >({});

  function toggleChapter(key: string) {
    setExpandedChapters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function getSubChapters(item: EnhancedChapter) {
    return item.t || item.topics || item.children || [];
  }

  function renderChapters(
    chapters: EnhancedChapter[],
    level = 0,
    parentKey = ""
  ) {
    return chapters.map((item, idx) => {
      const key = parentKey + (item.title || item.c || "") + idx;
      const subChapters = getSubChapters(item);
      const hasChildren = subChapters.length > 0;
      const isExpanded = expandedChapters[key] || false;

      return (
        <div key={key} style={{ marginLeft: level * 16, marginBottom: 4 }}>
          <div
            className="flex items-center rounded-lg px-2 hover:bg-blend-darken py-1 cursor-pointer"
            onClick={() => hasChildren && toggleChapter(key)}
            style={{
              minHeight: 30,
              userSelect: "none",
              fontWeight: 500,
              fontSize: "1rem",
              ...(hasChildren ? { background: "var(--color-surface)" } : {}),
            }}
          >
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown size={18} className="mr-2 text-gray-500" />
              ) : (
                <ChevronRight size={18} className="mr-2 text-gray-500" />
              )
            ) : (
              <span
                style={{
                  width: 18,
                  display: "inline-block",
                }}
              />
            )}
            <span className="text-[var(--color-text-secondary)]">
              {item.title || item.c}
            </span>
            {item.p && (
              <span className="text-xs text-blue-500 ml-2">p.{item.p}</span>
            )}
          </div>
          {hasChildren && isExpanded && (
            <div>{renderChapters(subChapters, level + 1, key)}</div>
          )}
        </div>
      );
    });
  }

  return (
    <div className="w-full">
      {chapters && chapters.length > 0 && (
        <>
          <h3 className="text-md font-medium mb-2 text-left mt-8 text-[var(--color-text)]">
            Extracted Table of Contents
          </h3>
          <div
            className="w-full mx-auto overflow-y-scroll h-40 sm:h-60 items-start rounded"
            style={{ maxHeight: "220px" }}
          >
            {renderChapters(chapters)}
          </div>
        </>
      )}
    </div>
  );
}
