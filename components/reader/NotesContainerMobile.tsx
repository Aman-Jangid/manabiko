import { PlusCircle, XIcon } from "lucide-react";
import { JSX } from "react";

type Note = {
  title: string;
  content: string;
};

interface NotesContainerMobileProps {
  notes: Note[];
  showNote: number;
  handleShowNote: (index: number) => void;
  handleAddNote: () => void;
  handleDeleteNote: (index: number) => void;
}

export default function NotesContainerMobile({
  notes,
  showNote,
  handleShowNote,
  handleAddNote,
  handleDeleteNote,
}: NotesContainerMobileProps): JSX.Element {
  return (
    <div className="h-full w-full px-2 sm:w-[100%] flex flex-col self-center justify-start items-center bg-[var(--color-bg)]/50 rounded-lg overflow-hidden">
      <div className="w-full h-10 p-2 flex justify-between items-center z-10 rounded-xl">
        <h2 className="font-semibold">Your Notes</h2>
        <button
          className=""
          title="Add note"
          onClick={handleAddNote}
          aria-label="Add note"
        >
          <PlusCircle
            className="w-5 h-5  hover:scale-120 transition-all duration-100"
            strokeWidth={1.4}
          />
        </button>
      </div>
      {/* Scrollable notes list */}
      <div className="h-full max-h-[90%] p-2 w-full flex flex-col gap-2 rounded-lg overflow-y-auto justify-start items-center bg-[var(--color-surface)]/50">
        {notes.length === 0 ? (
          <p className="text-sm text-[var(--color-text-secondary)] py-4">
            No notes yet. Click &quot;+&quot; to add one.
          </p>
        ) : (
          notes.map((note, i) => {
            const isOpen = showNote === i;

            return (
              <div
                key={i}
                className={`w-full flex flex-col items-start justify-start rounded-lg transition-all duration-300 py-1
                ${
                  isOpen
                    ? "bg-[var(--color-surface-secondary)] hover:bg-[var(--color-surface)] shadow-lg"
                    : "bg-[var(--color-surface-secondary)]/50 hover:bg-[var(--color-surface)]/70"
                }`}
                onClick={() => handleShowNote(i)}
              >
                {/* Header */}
                <div className="w-full flex items-center justify-between px-2 py-2 cursor-pointer">
                  <h3
                    className="whitespace-nowrap overflow-hidden text-ellipsis text-sm font-semibold text-start"
                    style={{ color: "var(--color-text)" }}
                  >
                    {note.title}
                  </h3>
                  <button
                    className="flex-shrink-0 ml-2 w-5 h-5 text-[var(--color-text)]/70 rounded-xl flex items-center justify-center transition-all border-2 border-[var(--color-border)] duration-100 z-20 hover:bg-[var(--color-accent-secondary)]/60 hover:text-[var(--color-text)]"
                    title="Delete note"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(i);
                    }}
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Expandable Content */}
                <div
                  className={`w-full px-2 transition-all duration-300 ease-in-out overflow-hidden`}
                  style={{
                    maxHeight: isOpen ? "1000px" : "0px",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  {isOpen && (
                    <p className="text-sm text-[var(--color-text-secondary)] font-normal text-start py-2">
                      {note.content}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
