interface FormInputProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  className?: string;
}

export const FormInput = ({
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  required = true,
  className = "",
}: FormInputProps) => {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-[var(--color-muted)]/30 text-[var(--color-strong)] focus:outline-none focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] focus:z-10 sm:text-sm ${className}`}
        style={{
          background: "var(--color-surface-secondary)",
        }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
