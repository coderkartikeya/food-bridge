import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

type FontSize = "sm" | "md" | "lg" | "xl" | "xs";
type FontWeight = "bold" | "regular" | "semibold";

/**
 * TextProps defining what it expects.
 * Like fontSize,fontWeight,fontColor
 * childrne is for rendering children inside it and className for custom classes .
 */
type TextProps = {
  children?: ReactNode;
  className?: string;
  fontSize?: FontSize;
  fontWeight?: FontWeight;
  fontColor?: string;
};

const sizeMapper: Record<FontSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const weightMapper: Record<FontWeight, string> = {
  regular: "font-normal",
  semibold: "font-semibold",
  bold: "font-bold",
};

const Text = ({
  children,
  className,
  fontSize="sm",
  fontWeight="regular",
  fontColor="black",
}: TextProps) => {
  return (
    <p
      className={twMerge(
        clsx(
          fontSize && sizeMapper[fontSize],
          fontWeight && weightMapper[fontWeight],
          className,
        ),
      )}
      style={{
        font:fontColor
      }}
    >
      {children}
    </p>
  );
};

export default Text;
