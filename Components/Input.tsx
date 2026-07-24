import React from "react";

function Input({
  placeholder,
  label,
  ...props
}: {
  placeholder?: string;
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-3">
      {label && <label>{label}</label>}
      <input
        {...props}
        type="text"
        placeholder={placeholder}
        className="w-[610px] bg-primary px-4 py-2 rounded-md"
      />
    </div>
  );
}

export default Input;
