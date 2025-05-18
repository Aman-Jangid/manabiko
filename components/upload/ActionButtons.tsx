import React from "react";
import { EnhancedChapter } from "./ChapterViewer";
import EnhanceLoadingIndicator from "./EnhanceLoadingIndicator";

interface ActionButtonsProps {
  isEnhancing: boolean;
  enhanceError: string | null;
  enhancedChapters: EnhancedChapter[] | null;
  onProcess: () => void;
  onCancel: () => void;
  onAddToLibrary: () => void;
  isAddingToLibrary: boolean;
}

export default function ActionButtons({
  isEnhancing,
  enhanceError,
  enhancedChapters,
  onProcess,
  onCancel,
  onAddToLibrary,
  isAddingToLibrary,
}: ActionButtonsProps) {
  return (
    <div className="self-end flex flex-row gap-4 z-50 mb-2 max-h-12 min-w-fit sm:max-h-14">
      <div className="flex flex-col items-start self-center h-10 rounded-lg px-2 py-1">
        {isEnhancing && <EnhanceLoadingIndicator />}
        {enhanceError && (
          <div className="text-red-400 text-xs mb-2">{enhanceError}</div>
        )}
      </div>

      {!isEnhancing && !enhancedChapters && (
        <button
          className="px-6 py-1.5 border-2 border-[var(--color-accent)]/80 rounded-xl hover:bg-[var(--color-accent)]/20 transition-all text-base font-semibold text-[var(--color-accent)]/80 flex items-center gap-2"
          onClick={onProcess}
          disabled={isEnhancing}
        >
          Process
        </button>
      )}

      {isEnhancing ? (
        <button
          className="px-6 py-1.5 border-2 border-[var(--color-accent-secondary)]/60 rounded-xl hover:bg-[var(--color-accent-secondary)]/20 transition-all text-base font-semibold text-[var(--color-accent-secondary)]/60 flex items-center gap-2"
          onClick={onCancel}
        >
          Cancel
        </button>
      ) : (
        <>
          {enhancedChapters && enhancedChapters.length > 0 && (
            <button
              className="px-6 py-1.5 border-2 border-[var(--color-accent-quaternary)] rounded-xl hover:bg-[var(--color-accent-quaternary)]/30 transition-all text-base font-semibold text-[var(--color-accent-quaternary)] flex items-center gap-2 min-w-[148px] justify-center"
              onClick={onAddToLibrary}
              disabled={isAddingToLibrary}
            >
              {isAddingToLibrary ? (
                <svg
                  className="animate-spin h-5 w-5 text-[var(--color-accent-quaternary)]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Add to Library"
              )}
            </button>
          )}
          <button
            className="px-6 py-1.5 border-2 border-[var(--color-accent-secondary)]/60 rounded-xl hover:bg-[var(--color-accent-secondary)]/20 transition-all text-base font-semibold text-[var(--color-accent-secondary)]/60 flex items-center gap-2"
            onClick={onCancel}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
