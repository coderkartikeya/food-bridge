/**
 * FoodBridge Card Container
 * A layout primitive that provides the standard FoodBridge shell.
 * Acts as a transparent wrapper for any content.
 * * @param {boolean} hoverable - Adds elevation and transition on hover
 * @param {boolean} shadow - Applies the brand shadow style
 * @param {string} className - Custom tailwind classes for sizing/layout
 */
import { forwardRef, type HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  shadow?: boolean;
  noPadding?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, hoverable = false, shadow = true, noPadding = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            "bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300",
            shadow && "shadow-sm shadow-gray-200/50",
            hoverable && "hover:shadow-xl hover:-translate-y-1 cursor-pointer",
            !noPadding && "p-5",
            
            className
          )
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;