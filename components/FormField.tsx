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
  return <div className="flexStart flex-col w-full gap-4">
    <label htmlFor="" className="w-full text-gray-100 ">{title}</label>
    
  </div>;
};

export default FormField;
