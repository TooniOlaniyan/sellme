import React from "react";
type Props = {
  type?: string;
  title: string;
  state: string;
  setState: (value: string) => void;
  placeholder: string;
  isTextArea?: boolean;
};

const FormField = ({
  type,
  title,
  state,
  setState,
  placeholder,
  isTextArea,
}: Props) => {
  return (
    <div className="flexStart flex-col w-full gap-4">
      <label htmlFor="" className="w-full text-gray-100 ">
        {title}
      </label>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          required
          value={state}
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          placeholder={placeholder}
          required
          value={state}
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
          type={type || 'text'}
        />
      )}
    </div>
  );
};

export default FormField;
