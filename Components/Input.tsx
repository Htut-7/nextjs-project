import React from "react";

function Input({
  placeholder,
  label,
}: {
  placeholder?: string;
  label?: string;
}) {
  return (
    <>
      {label && <label>{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        className="w-[610px] bg-primary px-4 py-2 rounded-md"
      />
    </>
  );
}

export default Input;
