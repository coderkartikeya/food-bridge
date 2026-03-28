import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

/**
 * Custom Heading storybook component 
 * We can define headingType (H1,H2,H3,H4,H5) 
 * fontColor is from defined colors.
 */

type HeadingType = "h1" | "h2" | "h3" | "h4" | "h5";
type FontWeight = "bold" | "regular" | "semibold";

type HeadingProps = {
  className?: string;
  children?: ReactNode;
  headingType?: HeadingType;
  fontWeight?: FontWeight;
  fontColor?: string;
};

const weightMapper: Record<FontWeight, string> = {
  regular: "font-normal",
  semibold: "font-semibold",
  bold: "font-bold",
};

const sizeMapper: Record<HeadingType, string> = {
  h1: "text-4xl md:text-5xl",
  h2: "text-3xl md:text-4xl",
  h3: "text-2xl md:text-3xl",
  h4: "text-xl md:text-2xl",
  h5: "text-lg md:text-xl",
};

const Heading = ({
  className,
  children,
  headingType = "h1",
  fontWeight = "bold",
  fontColor = "text-dark", 
}: HeadingProps) => {
    
  const Tag = headingType;

  return (
    <Tag
      className={twMerge(
        clsx(
          sizeMapper[headingType],
          weightMapper[fontWeight],
          fontColor,
          className
        )
      )}
    >
      {children}
    </Tag>
  );
};

export default Heading;