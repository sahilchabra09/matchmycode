import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectProps<T extends string> {
  options: { label: string; value: T }[];
  value: T;
  placeholder?: string;
  onChange: (value: T) => void;
  className?: string;
}

export function Select<T extends string>({
  options,
  value,
  placeholder,
  onChange,
  className,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (val: T) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "w-full px-4 py-2 text-left border rounded-md shadow-sm focus:outline-none",
          "bg-background border-input text-foreground",
          !value && "text-muted-foreground"
        )}
      >
        <span>
          {value
            ? options.find((o) => o.value === value)?.label
            : placeholder || "Select an option"}
        </span>
        {isOpen ? (
          <ChevronUp className="absolute right-3 top-3 h-4 w-4" />
        ) : (
          <ChevronDown className="absolute right-3 top-3 h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-auto border rounded-md shadow-lg bg-background text-foreground">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "px-4 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground",
                option.value === value && "bg-accent font-medium"
              )}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}