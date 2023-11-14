import React, { MouseEventHandler } from "react";
import Image from "next/image";

type Props = {
  title: string;
  leftIcon?: string | null;
  type?: "button" | "submit";
  isSubmitting?: boolean;
  handleClick?: MouseEventHandler;
  bgColor?: string;
  textColor?: string;
  rightIcon?: string | null;
};

const Button = ({
  title,
  leftIcon,
  rightIcon,
  type,
  handleClick,
  bgColor,
  textColor,
  isSubmitting,
}: Props) => {
  return (
    <button
      type={type || "button"}
      disabled={isSubmitting}
      className={`flexCenter gap-3 px-4 py-3
      ${textColor || 'text-white'}
      
      ${
        isSubmitting ? "bg-black/50" : bgColor ? bgColor : "bg-primary-purple"
      } rounded-xl text-sm font-medium max-md:w-full   `}
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} alt="left" width={14} height={14} />}
      {title}
      {rightIcon && (
        <Image src={rightIcon} alt="right" width={14} height={14} />
      )}
    </button>
  );
};

export default Button;
