
import * as React from "react";
interface SizeInputProps {
  label: string;
  name: string;
  placeholder: string;
  value: number;
  rest: object;
  onChange: Function,
}
const MIN_VALUE = 1;
const MAX_VALUE = 100000;

export default function SizeInput({ label, name, placeholder, value, onChange, ...rest }: SizeInputProps) {
  return (
    <div className="input-container">
      <label title={label}>{label}</label>
      <input
        aria-label={label}
        name={name}
        placeholder={placeholder}
        value={value}
        type="number"
        min={MIN_VALUE}
        max={MAX_VALUE}
        {...rest}
        onChange={(e)=> {
          const value = parseInt(e.target.value, 10) || 0;
          
          if(value > MAX_VALUE) {
            return alert(`Max value allowed is ${MAX_VALUE}`);
          }
          if(value < MIN_VALUE) {
            return alert(`Min value allowed is ${MIN_VALUE}`);
          }
          onChange(value);
        }}
      />
    </div>
  );
}