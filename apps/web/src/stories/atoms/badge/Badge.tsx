/**
 * FoodBridge Status Badge Component
 * Used to indicate the status of an item (e.g., order status, notification).
 * Supports standard semantic states: success, warning, danger, and neutral.
 * Includes an optional status dot for additional visual weighting.
 *
 * @param {string} className - Optional classes for custom overrides
 * @param {ReactNode} children - The text content of the badge
 * @param {"success" | "warning" | "danger" | "neutral"} badgeType - The semantic color variant
 * @param {boolean} showDot - Whether to display the small indicator dot
 */
import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export type BadgeType = "success" | "warning" | "danger" | "neutral";

export interface BadgeProps {
  className?: string;
  children?: ReactNode;
  badgeType?: BadgeType;
  showDot?: boolean;
}


const badgeMapper: Record<BadgeType, string> = {
  success: "bg-green-100 text-green-800",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-red-100 text-red-800",
  neutral: "bg-gray-100 text-gray-800",
};


const dotMapper: Record<BadgeType, string> = {
  success: "bg-green-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  neutral: "bg-gray-500",
};

const Badge = ({
  className,
  children,
  badgeType = "neutral",
  showDot = false,
}: BadgeProps) => {
  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
          badgeMapper[badgeType],
          className
        )
      )}
    >
      {showDot && (
        <span 
          className={clsx("h-1.5 w-1.5 rounded-full", dotMapper[badgeType])} 
          aria-hidden="true" 
        />
      )}
      {children}
    </span>
  );
};

export default Badge;