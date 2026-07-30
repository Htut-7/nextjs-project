import React from "react";

function Input({
  placeholder,
  label,
  text,
  ...props
}: {
  placeholder?: string;
  label?: string;
  text?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-3">
      {label && <label className="block font-bold">{label}</label>}
      <input
        {...props}
        type="text"
        placeholder={placeholder}
        className="block w-[610px] bg-primary px-4 py-2 rounded-md"
      />
      <p className="text-gray-500 text-xs my-1">{text}</p>
    </div>
  );
}

export default Input;
