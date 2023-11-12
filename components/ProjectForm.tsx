"use client";
import { useState } from "react";
import { SessionInterface } from "@/coomon.types";
import { ChangeEvent } from "react";
import Image from "next/image";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";

type Props = {
  type: string;
  session: SessionInterface;
};

const ProjectForm = ({ type, session }: Props) => {
  const handleFormSubmit = (e: React.FormEvent) => {};

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.includes("image")) {
      return alert("Please upload and image file ");
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string
      handleStateChange('image' , result)
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    liveSiteUrl: "",
    githubUrl: "",
    category: "",
  });
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
      <FormField
        title="Description"
        state={form.description}
        setState={(value) => handleStateChange("description", value)}
        placeholder="Showcase and discover remarkable developers"
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        setState={(value) => handleStateChange("liveSiteUrl", value)}
        placeholder="https://website.com"
      />
      <FormField
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        setState={(value) => handleStateChange("githubUrl", value)}
        placeholder="https://github.com"
      />

      {/* Custoom input field */}
      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <button>Create</button>
      </div>
    </form>
  );
};

export default ProjectForm;
