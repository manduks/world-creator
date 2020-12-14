
import * as React from "react";

interface SizeInputProps {
  label: string;
  name: string;
  placeholder: string;
  value: number;
  rest: object;
}

export default function SizeInput({ label, name, placeholder, value, ...rest }: SizeInputProps) {
  return (
    <div className="input-container">
      <label title={label}>{label}</label>
      <input
        aria-label={label}
        name={name}
        placeholder={placeholder}
        value={value}
        {...rest}
      />
    </div>
  );
}