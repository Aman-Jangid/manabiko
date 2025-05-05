import {
  Highlighter,
  PenTool,
  StickyNote,
  SwatchBook,
  Timer,
} from "lucide-react";
import { JSX } from "react";

enum Tool {
  HIGHLIGHTER = "HIGHLIGHTER",
  STICKY_NOTE = "STICKY_NOTE",
  PEN_TOOL = "PEN_TOOL",
  TIMER = "TIMER",
  SWATCH_BOOK = "SWATCH_BOOK",
}

const toolIcons = {
  [Tool.STICKY_NOTE]: StickyNote,
  [Tool.PEN_TOOL]: PenTool,
  [Tool.TIMER]: Timer,
  [Tool.SWATCH_BOOK]: SwatchBook,
  [Tool.HIGHLIGHTER]: Highlighter,
};

const tools: Tool[] = [
  Tool.STICKY_NOTE,
  Tool.PEN_TOOL,
  Tool.TIMER,
  Tool.SWATCH_BOOK,
  Tool.HIGHLIGHTER,
];

export default function UserEdits({
  selectedTool,
  handleSetTool,
}: {
  selectedTool: string;
  handleSetTool: (tool: Tool) => void;
}): JSX.Element {
  const renderToolButton = (tool: Tool) => {
    const Icon = toolIcons[tool];
    const isSelected = selectedTool === tool;
    const isSticky = tool === Tool.STICKY_NOTE;

    return (
      <button
        key={tool}
        className={`w-8 h-8 md:w-10 md:h-10 text-[var(--color-text-secondary)] rounded-xl flex items-center justify-center transition-all duration-100 z-20 ${
          tool !== Tool.STICKY_NOTE ? "rounded-b-none" : ""
        }`}
        style={
          isSelected
            ? {
                background: "var(--color-surface-secondary)",
                color: "var(--color-text)",
                ...(isSticky ? { marginBottom: "10px" } : {}),
              }
            : {}
        }
        title={tool.replace("_", " ").toLowerCase()}
        onClick={() => handleSetTool(tool)}
        aria-label={tool}
      >
        <Icon
          className="w-5 h-5 md:w-6 md:h-6 hover:scale-110 transition-all duration-100"
          strokeWidth={1.4}
        />
      </button>
    );
  };

  return (
    <div
      className={`w-[94%] h-${
        selectedTool === Tool.STICKY_NOTE ? "fit" : "[28vh]"
      } self-center justify-center bg-[var(--color-bg)]/50 rounded-lg overflow-hidden mt-2`}
    >
      <div className="w-full flex flex-cols gap-2.5 transition-all duration-200 z-20">
        {tools.map(renderToolButton)}
      </div>

      <div
        className={`w-full bg-[var(--color-surface-secondary)] rounded-xl ${
          selectedTool === Tool.HIGHLIGHTER
            ? "rounded-tr-none"
            : "rounded-tr-[12px]"
        }`}
        style={{
          height:
            selectedTool === Tool.STICKY_NOTE
              ? "0vh"
              : selectedTool === Tool.HIGHLIGHTER
              ? "20vh"
              : "20vh",
        }}
      ></div>
    </div>
  );
}
