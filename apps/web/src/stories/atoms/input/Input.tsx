/**
 * FoodBridge Input Component (Unified)
 * Handles standard form inputs, search inputs, native HTML5 inputs (date, file, etc.), 
 * AND Toggle Switches (type="toggle").
 *
 * @param {string} label - The label text for the input
 * @param {string | boolean} error - Error message or boolean state triggering red borders
 * @param {boolean} success - Success state triggering green borders
 * @param {string} helperText - Helper text displayed below the input
 * @param {"sm" | "md" | "lg"} inputSize - Size variant of the input/toggle
 * @param {string} containerClassName - Classes to apply to the outer div wrapper
 * @param {string} type - Standard input types OR "toggle"
 */
import { forwardRef, useId, useState, type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Icon } from "../Icon/Icons";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string | boolean;
  success?: boolean;
  helperText?: string;
  inputSize?: "sm" | "md" | "lg";
  containerClassName?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'] | "toggle";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      label,
      error,
      success,
      helperText,
      inputSize = "md",
      required,
      id: externalId, 
      disabled,
      type = "text",
      ...rest
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
    const internalId = useId();
    const inputId = externalId || internalId;

    // ==========================================
    // RENDER PATH A: THE TOGGLE SWITCH
    // ==========================================
    if (type === "toggle") {
      const trackSizes = {
        sm: "w-9 h-5",
        md: "w-11 h-6",
        lg: "w-14 h-7", 
      };

      const thumbSizes = {
        sm: "after:h-4 after:w-4 after:top-[2px] after:start-[2px] peer-checked:after:translate-x-full peer-checked:after:rtl:-translate-x-full",
        md: "after:h-5 after:w-5 after:top-[2px] after:start-[2px] peer-checked:after:translate-x-full peer-checked:after:rtl:-translate-x-full",
        lg: "after:h-6 after:w-6 after:top-[2px] after:start-[2px] peer-checked:after:translate-x-full peer-checked:after:rtl:-translate-x-full",
      };

      return (
        <div className={twMerge("flex flex-col gap-1.5 w-full", containerClassName)}>
          <label
            htmlFor={inputId}
            className={clsx(
              "inline-flex items-center cursor-pointer max-w-fit",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <div className="relative inline-flex items-center">
              <input
                ref={ref}
                type="checkbox" 
                id={inputId}
                role="switch"
                disabled={disabled}
                className="sr-only peer"
                aria-describedby={helperText || error ? `${inputId}-description` : undefined}
                {...rest}
              />
              <div
                className={clsx(
                  "bg-gray-200 rounded-full transition-colors duration-200 ease-in-out",
                  "peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-600 peer-focus:ring-offset-2",
                  "peer-checked:bg-green-700",
                  "after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all after:duration-200",
                  trackSizes[inputSize],
                  thumbSizes[inputSize],
                  className
                )}
              />
            </div>
            {label && (
              <span className={clsx("ms-3 font-medium text-gray-700 select-none", inputSize === "sm" ? "text-sm" : "text-base")}>
                {label}
                {required && <span className="text-red-600 ml-1" aria-hidden="true">*</span>}
              </span>
            )}
          </label>

          {/* Helper / Error for Toggle */}
          {(helperText || typeof error === "string") && (
            <span
              className={clsx(
                "text-sm mt-0.5",
                error ? "text-red-600" : success ? "text-green-700" : "text-gray-500",
                inputSize === "sm" && "text-xs"
              )}
              id={`${inputId}-description`} 
              aria-live={error ? "assertive" : "polite"}
            >
              {typeof error === "string" ? error : helperText}
            </span>
          )}
        </div>
      );
    }

    // ==========================================
    // RENDER PATH B: STANDARD INPUTS
    // ==========================================
    const inputType = type === "password" ? (isPasswordVisible ? "text" : "password") : type;

    const stateClasses = clsx(
      !error && !success && "border-gray-300 focus:border-green-700 focus:ring-1 focus:ring-green-700",
      error && "border-red-600 focus:border-red-600 focus:ring-1 focus:ring-red-600",
      success && !error && "border-green-700 focus:border-green-700 focus:ring-1 focus:ring-green-700",
      disabled && "bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed"
    );

    const typographyClasses = clsx(
      inputSize === "sm" ? "text-sm placeholder:text-sm" : 
      inputSize === "lg" ? "text-lg placeholder:text-lg" : 
      "text-base placeholder:text-base"
    );

    const paddingClasses = clsx(
      type !== "file" && type !== "color" && (inputSize === "sm" ? "py-1.5" : inputSize === "lg" ? "py-3" : "py-2"),
      type !== "file" && type !== "color" && (inputSize === "sm" ? "pr-3" : "pr-4"),
      type === "color" && "p-1 h-10",
      type === "search" ? "pl-10" : type !== "file" && type !== "color" && (inputSize === "sm" ? "pl-3" : "pl-4"),
      type === "password" && "pr-10"
    );

    const nativeTypeClasses = clsx(
      type === "file" && "file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer text-gray-500",
      (type === "date" || type === "time" || type === "datetime-local" || type === "month") && [
        "appearance-none bg-white",
        "[&::-webkit-calendar-picker-indicator]:cursor-pointer",
        "[&::-webkit-calendar-picker-indicator]:opacity-50",
        "hover:[&::-webkit-calendar-picker-indicator]:opacity-100",
        "[&::-webkit-calendar-picker-indicator]:transition-opacity"
      ]
    );

    return (
      <div className={twMerge("flex flex-col gap-1.5 w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId} 
            className={clsx(
              "font-medium text-gray-700",
              inputSize === "sm" ? "text-xs" : "text-sm",
              disabled && "text-gray-400"
            )}
          >
            {label}
            {required && <span className="text-red-600 ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative w-full">
          {type === "search" && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <Icon name="search" size={inputSize === "sm" ? 16 : 20} />
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId} 
            type={inputType}
            required={required}
            disabled={disabled}
            className={twMerge(
              clsx(
                "w-full rounded-lg border bg-white outline-none transition-all duration-200",
                "placeholder:text-gray-400",
                typographyClasses,
                paddingClasses,
                nativeTypeClasses,
                stateClasses,
                className
              )
            )}
            aria-label={!label ? rest['aria-label'] || "Input field" : undefined}
            {...rest}
          />

          {type === "password" && (
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              disabled={disabled}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:text-green-700"
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            >
              <Icon name={isPasswordVisible ? "eyeOff" : "eye"} size={inputSize === "sm" ? 16 : 20} />
            </button>
          )}
        </div>
        {(helperText || typeof error === "string") && (
          <span
            className={clsx(
              "text-sm mt-0.5",
              error ? "text-red-600" : success ? "text-green-700" : "text-gray-500",
              inputSize === "sm" && "text-xs"
            )}
            id={`${inputId}-description`} 
            aria-live={error ? "assertive" : "polite"}
          >
            {typeof error === "string" ? error : helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;