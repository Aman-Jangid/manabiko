import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  className?: string;
}

export const PasswordInput = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  required = true,
  className = "",
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        required={required}
        className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-[var(--color-muted)]/30  text-[var(--color-strong)] focus:outline-none focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] focus:z-10 sm:text-sm pr-10 ${className}`}
        style={{
          background: "var(--color-surface-secondary)",
        }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center z-20"
        onClick={togglePasswordVisibility}
        tabIndex={0}
      >
        {showPassword ? (
          <Eye className="h-4 w-4" style={{ color: "var(--color-muted)" }} />
        ) : (
          <EyeOff className="h-4 w-4" style={{ color: "var(--color-muted)" }} />
        )}
      </button>
    </div>
  );
};
