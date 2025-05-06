import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  ariaLabel?: string;
}

export default function SearchInput({
  placeholder = "Search...",
  onChange,
  value = "",
  ariaLabel = "Search",
}: SearchInputProps) {
  return (
    <div className="relative flex-grow">
      <Search
        className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[var(--color-text)]"
        size={16}
      />
      <input
        type="text"
        className="w-full bg-transparent text-[var(--color-text)] border rounded-md pl-9 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-600 text-sm"
        style={{
          borderColor: "var(--color-border)",
        }}
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
