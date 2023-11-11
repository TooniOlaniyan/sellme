"use client";
import { SessionInterface } from "@/coomon.types";
import { ChangeEvent } from "react";
import Image from "next/image";
import FormField from "./FormField";

type Props = {
  type: string;
  session: SessionInterface;
};

const ProjectForm = ({ type, session }: Props) => {
  const handleFormSubmit = (e: React.FormEvent) => {};
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {};

  const handleStateChange = (fieldName : string , value:string) => {

  }

  const form = {
    image: "",
    title:''
  };
  return (
    <form onSubmit={handleFormSubmit} className="flexStart form" action="">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your image"}
        </label>
        <input
          type="file"
          id="image"
          accept="imgage/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            alt="Project poster"
            className="sm:p-10 object-contain z-20"
            fill
          />
        )}
      </div>
      <FormField
        title="Tiltle"
        state={form.title}
        setState={(value) => handleStateChange("title", value)}
        placeholder="Flexxible"
      />
    </form>
  );
};

export default ProjectForm;
