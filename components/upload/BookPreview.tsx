import { EnhancedChapter } from "./ChapterViewer";
import ChapterViewer from "./ChapterViewer";
import CoverImage from "./CoverImage";
import MetadataDisplay, { BookMetadata } from "./MetadataDisplay";
import ActionButtons from "./ActionButtons";

interface BookPreviewProps {
  fileName: string;
  coverImage: string | null;
  metadata: BookMetadata;
  isFetchingMetadata: boolean;
  isEnhancing: boolean;
  enhanceError: string | null;
  enhancedChapters: EnhancedChapter[] | null;
  onProcess: () => void;
  onCancel: () => void;
  onAddToLibrary: () => void;
  onCoverChange: (newCover: string) => void;
}

export default function BookPreview({
  fileName,
  coverImage,
  metadata,
  isFetchingMetadata,
  isEnhancing,
  enhanceError,
  enhancedChapters,
  onProcess,
  onCancel,
  onAddToLibrary,
  onCoverChange,
}: BookPreviewProps) {
  return (
    <div
      className="max-w-3xl max-h-[80vh] overflow-hidden w-full border-2 rounded-lg flex flex-col items-center bg-blue-950/10 border-blue-400"
      style={{
        minWidth: Math.max(260, Math.min(window.innerWidth * 0.4, 600)) + "px",
        maxWidth: "98%",
        padding: "1rem 0.75rem",
      }}
    >
      <div className="flex flex-col items-center gap-8 w-[98%] ">
        <p className="text-center text-sm font-medium text-[var(--color-text-secondary)]">
          {fileName}
        </p>
        <div className="flex flex-row w-full items-start gap-4 mb-6 ml-4">
          <CoverImage
            coverImage={coverImage}
            isbn={metadata?.isbn}
            onCoverChange={onCoverChange}
          />
          <div className="flex-1 space-y-2">
            <MetadataDisplay
              metadata={metadata}
              isLoading={isFetchingMetadata}
            />
          </div>
        </div>

        <div className="w-full flex flex-col items-start mt-0">
          <ActionButtons
            isEnhancing={isEnhancing}
            enhanceError={enhanceError}
            enhancedChapters={enhancedChapters}
            onProcess={onProcess}
            onCancel={onCancel}
            onAddToLibrary={onAddToLibrary}
          />

          {enhancedChapters && <ChapterViewer chapters={enhancedChapters} />}
        </div>
      </div>
    </div>
  );
}
