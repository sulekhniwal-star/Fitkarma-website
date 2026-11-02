import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  id: string;
}

export function Input({
  label,
  error,
  hint,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full text-left">
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-semibold text-ink-muted uppercase tracking-wider"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-4 py-3 rounded-xl bg-card-elevated/90 border border-card-border text-ink-primary placeholder:text-ink-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:border-transparent transition-all duration-200 text-sm ${
          error ? "border-red-500 focus-visible:ring-red-500" : ""
        } ${className}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-400 font-medium">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-ink-subtle">
          {hint}
        </p>
      )}
    </div>
  );
}

