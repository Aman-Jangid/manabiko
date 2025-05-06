import { Tool } from "@/app/reader/page";
import {
  Highlighter,
  PencilRuler,
  PenTool,
  StickyNote,
  SwatchBook,
  Timer,
  XIcon,
} from "lucide-react";
import { JSX } from "react";

type Props = {
  showToolkit: boolean;
  setShowToolkit: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTool: string;
  handleSetToolMobile: (tool: Tool) => void;
  transformValue: string;
};

export default function UserEditsMobile({
  showToolkit,
  setShowToolkit,
  selectedTool,
  handleSetToolMobile,
  transformValue,
}: Props): JSX.Element {
  const tools = [
    { icon: StickyNote, tool: Tool.STICKY_NOTE, label: "Sticky Note" },
    { icon: Timer, tool: Tool.TIMER, label: "Timer" },
    { icon: SwatchBook, tool: Tool.SWATCH_BOOK, label: "Swatch Book" },
    { icon: Highlighter, tool: Tool.HIGHLIGHTER, label: "Highlighter" },
    { icon: PenTool, tool: Tool.PEN_TOOL, label: "Pen Tool" },
  ];

  return (
    <div
      className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-20"
      style={{
        background: "var(--color-bg)",
        transform: showToolkit ? "translateY(-200px)" : "none",
      }}
    >
      {/* Tool Icons */}
      <div
        className="absolute w-10 flex flex-col items-center justify-center gap-3 rounded-full rounded-t-none shadow-lg transition-all duration-300 z-10 overflow-hidden"
        style={{
          background: "var(--color-bg)",
          transform: showToolkit ? "translateY(50%)" : "none",
          opacity: showToolkit ? 1 : 0,
          height: showToolkit ? "210px" : "0px",
        }}
      >
        {showToolkit &&
          tools.map(({ icon: Icon, tool, label }, i) => (
            <button
              key={tool}
              style={{ marginTop: i === 0 ? "12px" : "0px" }}
              onClick={() => handleSetToolMobile(tool)}
              title={label}
              aria-label={label}
              className="flex items-center justify-center"
            >
              <Icon
                className="w-6 h-6 transition-colors duration-200"
                strokeWidth={1.4}
                stroke={
                  selectedTool === tool
                    ? "var(--color-accent-quaternary)"
                    : "var(--color-text-secondary)"
                }
              />
            </button>
          ))}
      </div>

      {/* Dynamic Shape Indicator (based on tool) */}
      <div
        className={`absolute w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300 z-8 ${
          selectedTool === Tool.PEN_TOOL ? "rounded-tr-full" : "rounded-t-none"
        } rounded-b-full overflow-hidden`}
        style={{
          background: "var(--color-bg)",
          transform: transformValue,
          opacity: showToolkit ? 1 : 0,
          height:
            showToolkit && selectedTool !== Tool.STICKY_NOTE ? "180px" : "0px",
        }}
      />

      {/* Toggle Button */}
      <div className="w-9 h-9 bg-[var(--color-text)]/50 rounded-full flex items-center justify-center shadow-lg z-20">
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{ background: "var(--color-bg)", color: "var(--color-text)" }}
          onClick={() => setShowToolkit((prev) => !prev)}
          title={showToolkit ? "Close tools" : "Open tools"}
          aria-label={showToolkit ? "Close tools" : "Open tools"}
        >
          {showToolkit ? (
            <XIcon className="w-5 h-5" />
          ) : (
            <PencilRuler className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
