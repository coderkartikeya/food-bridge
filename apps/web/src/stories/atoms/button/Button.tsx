import type { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

/**
 * Custom Button Component 
 */
type ButtonType = "primary" | "secondary" | "tertiary" | "destructive";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  buttonType?: ButtonType;
}

const typeMapper: Record<ButtonType, string> = {
  primary: "bg-green-600 text-white border-transparent hover:bg-green-700",
  secondary: "bg-white text-green-600 border-2 border-green-600 hover:bg-green-50",
  tertiary: "bg-transparent text-green-600 border-transparent hover:text-green-700 hover:underline px-0 py-0", 
  destructive: "bg-red-600 text-white border-transparent hover:bg-red-700",
};

const Button = ({
  className,
  children,
  buttonType = "primary",
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        clsx(
          "inline-flex items-center justify-center px-6 py-2 rounded-lg font-semibold transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          typeMapper[buttonType],
          buttonType === "destructive" ? "focus-visible:ring-red-600" : "focus-visible:ring-green-600",
          className
        )
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;