import { forwardRef } from "react";
import BookCard from "./BookCard";
import { ExtendedBookMetadata } from "@/types/types";

interface BookGridProps {
  books: ExtendedBookMetadata[];
  onSelectBook: (book: ExtendedBookMetadata) => void;
}

const BookGrid = forwardRef<HTMLDivElement, BookGridProps>(
  ({ books, onSelectBook }, ref) => {
    return (
      <div
        ref={ref}
        className="grid grid-cols-2 h-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 overflow-y-auto scrollbar-hide scroll-smooth"
      >
        {books.map((book) => (
          <BookCard key={book.id} book={book} onSelect={onSelectBook} />
        ))}
      </div>
    );
  }
);

BookGrid.displayName = "BookGrid";

export default BookGrid;
