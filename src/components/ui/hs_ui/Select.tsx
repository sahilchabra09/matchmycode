import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectProps {
  options: { label: string; value: string }[];
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Select({
  options,
  value,
  placeholder,
  onChange,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (val: string) => {
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
          "bg-background border-input text-foreground", // Default styles
          !value && "text-muted-foreground" // Placeholder text color
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
        <ul
          className={cn(
            "absolute z-10 w-full mt-1 max-h-60 overflow-auto border rounded-md shadow-lg bg-background text-foreground"
          )}
        >
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