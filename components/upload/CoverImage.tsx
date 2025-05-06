import { useState } from "react";
import Image from "next/image";
import { RefreshCcw, Undo, Redo } from "lucide-react";
import { setOLCover } from "@/services/openLibraryService";

interface CoverImageProps {
  coverImage: string | null;
  isbn?: string;
  onCoverChange: (newCover: string) => void;
}

export default function CoverImage({
  coverImage,
  isbn,
  onCoverChange,
}: CoverImageProps) {
  const [fetchingCover, setFetchingCover] = useState(false);
  const [prevCover, setPrevCover] = useState<string | null>(null);
  const [newCover, setNewCover] = useState<string | null>(null);
  const [currentCoverState, setCurrentCoverState] = useState<
    "original" | "new" | null
  >(null);

  const getNewCover = async () => {
    if (fetchingCover || !isbn) return;
    setFetchingCover(true);

    try {
      const fetchedCover = await setOLCover(isbn);
      if (fetchedCover) {
        // download the new cover image
        const file = await fetch("/api/file/download", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: fetchedCover }),
        });

        const newCoverUrl = URL.createObjectURL(await file.blob());

        setNewCover(newCoverUrl);
        setPrevCover(coverImage);
        onCoverChange(newCoverUrl);
        setCurrentCoverState("new");
      }
    } catch (error) {
      console.error("Failed to fetch new cover:", error);
    } finally {
      setFetchingCover(false);
    }
  };

  const switchCover = () => {
    if (currentCoverState === "new" && prevCover) {
      onCoverChange(prevCover);
      setCurrentCoverState("original");
    } else if (currentCoverState === "original" && newCover) {
      onCoverChange(newCover);
      setCurrentCoverState("new");
    }
  };

  if (!coverImage) return null;

  return (
    <div className="w-36 h-50 rounded relative">
      <Image
        src={coverImage}
        alt="Book cover"
        width={144}
        height={200}
        className="object-cover w-full h-full rounded"
        sizes="144px"
      />
      {isbn && (
        <button
          className="absolute bottom-0 -right-10 rounded-xl p-1 border-2 border-[var(--color-accent-quaternary)]/80 transition-all duration-200 hover:bg-[var(--color-accent-quaternary)]/20"
          title="get cover from OpenLibrary"
          onClick={newCover ? switchCover : getNewCover}
          disabled={fetchingCover}
        >
          {fetchingCover && !newCover ? (
            <RefreshCcw
              size={16}
              className="animate-spin text-[var(--color-accent-quaternary)]"
            />
          ) : currentCoverState === "new" && prevCover ? (
            <Undo size={16} />
          ) : currentCoverState === "original" && newCover ? (
            <Redo size={16} />
          ) : (
            <RefreshCcw
              size={16}
              className="text-[var(--color-accent-quaternary)]"
            />
          )}
        </button>
      )}
    </div>
  );
}
