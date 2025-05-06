import { PlusCircle } from "lucide-react";
import SearchInput from "./SearchInput";

interface LibraryControlsProps {
  onAddBook: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export default function LibraryControls({
  onAddBook,
  onSearch,
  searchQuery,
}: LibraryControlsProps) {
  return (
    <div className="flex flex-row gap-2 mt-4">
      <button
        className="bg-transparent border rounded-md p-2 hover:bg-[rgba(0,0,0,0.2)] transition-colors flex items-center justify-center"
        style={{
          borderColor: "var(--color-border)",
          color: "var(--color-text)",
        }}
        aria-label="Add book"
        title="Add new book"
        onClick={onAddBook}
      >
        <PlusCircle size={18} />
      </button>
      <SearchInput
        placeholder="Search books..."
        ariaLabel="Search books"
        value={searchQuery}
        onChange={onSearch}
      />
    </div>
  );
}
