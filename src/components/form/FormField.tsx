import React from "react";

interface FormFieldProps {
  title: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value?: string;
  id?: string;
  placeholder?: string;
  error?: string | null;
}

const FormField = ({
  title,
  handleInputChange,
  value,
  id = title.toLowerCase(),
  name = title.toLowerCase(),
  placeholder = "Enter " + title,
  error,
}: FormFieldProps) => {
  return (
    <div className="px-5 w-full max-w-[30rem] flex flex-col items-start my-1">
      <label htmlFor={name ? name : id} className="font-medium text-gray-800">
        {title}
      </label>
      <input
        type={title.endsWith("Password") ? "password" : "text"}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className={`w-full bg-gray-300/50
        border-2 rounded-md 
        px-4 py-2 ${
          error ? "border-red-600 focus:border-transparent" : "border-gray-400"
        } 
        focus:ring-2 focus:ring-green-500 focus:outline-none`}
      />
    </div>
  );
};

export default FormField;
