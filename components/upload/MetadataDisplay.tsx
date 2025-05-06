import { useResponsive } from "../../app/hooks/useResponsive";

export type BookMetadata = {
  title?: string;
  author?: string;
  publisher?: string;
  year?: string | number;
  isbn?: string;
  description?: string;
  pages?: number;
  fileName: string;
};

interface MetadataDisplayProps {
  metadata: BookMetadata;
  isLoading?: boolean;
}

export default function MetadataDisplay({
  metadata,
  isLoading,
}: MetadataDisplayProps) {
  const { isMobile } = useResponsive();

  if (isLoading) {
    return <div className="text-blue-300">Fetching metadata...</div>;
  }

  return (
    <div>
      {metadata.title && (
        <div className="text-xl font-semibold text-[var(--color-text)]">
          {metadata.title}
        </div>
      )}
      {metadata.author && (
        <div className="text-sm text-[var(--color-text-secondary)]">
          {metadata.author}
        </div>
      )}
      {metadata.publisher && (
        <div className="text-sm text-[var(--color-text-secondary)]">
          {metadata.publisher}
        </div>
      )}
      {metadata.year && (
        <div className="text-sm text-[var(--color-text-secondary)]">
          {metadata.year}
        </div>
      )}
      {metadata.isbn && (
        <div className="text-sm text-[var(--color-text-secondary)]">
          ISBN: {metadata.isbn}
        </div>
      )}
      {metadata.pages && (
        <div className="text-xs text-[var(--color-text-secondary)]">
          {metadata.pages} pages
        </div>
      )}
      {metadata.description && (
        <div
          className="text-xs text-[var(--color-text-secondary)] mt-2"
          title={metadata.description}
        >
          {metadata.description.length > 50
            ? metadata.description.slice(0, isMobile ? 20 : 100) + "..."
            : metadata.description}
        </div>
      )}
    </div>
  );
}
