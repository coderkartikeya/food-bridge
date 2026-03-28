/**
 * FoodBridge Select/Dropdown Component 
 */
import {
  useState,
  useRef,
  useEffect,
  useId,
  useCallback,
  type KeyboardEvent,
} from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Icon } from "../../atoms/Icon/Icons"; // Import your centralized Icon component

export type Option = {
  label: string;
  value: string;
};

export interface SelectProps {
  options: Option[];
  value?: string | string[];
  onChange?: (value: any) => void;
  multiple?: boolean;
  label?: string;
  placeholder?: string;
  error?: string | boolean;
  helperText?: string;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  className?: string;
  menuClassName?: string;
}

const useClickOutside = (
  ref: React.RefObject<HTMLDivElement | null>,
  handler: () => void
) => {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

const Dropdown = ({
  options,
  value,
  onChange,
  multiple = false,
  label,
  placeholder = "Select an option…",
  error,
  helperText,
  disabled = false,
  searchable = false,
  clearable = false,
  className,
  menuClassName,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const listboxId = useId();
  const labelId = useId();

  useClickOutside(containerRef, () => {
    setIsOpen(false);
    setSearch("");
    setFocusedIndex(-1);
  });

  const filteredOptions =
    searchable && search.trim()
      ? options.filter((o) =>
          o.label.toLowerCase().includes(search.toLowerCase())
        )
      : options;

  const selectedOptions = options.filter((opt) =>
    multiple
      ? (value as string[])?.includes(opt.value)
      : value === opt.value
  );

  const hasValue = multiple
    ? (value as string[])?.length > 0
    : Boolean(value);

  const open = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
    setFocusedIndex(-1);
    if (searchable) {
      setTimeout(() => searchRef.current?.focus(), 0);
    }
  }, [disabled, searchable]);

  const close = useCallback(() => {
    setIsOpen(false);
    setSearch("");
    setFocusedIndex(-1);
    setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  const toggle = () => (isOpen ? close() : open());

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const cur = Array.isArray(value) ? value : [];
      const next = cur.includes(optionValue)
        ? cur.filter((v) => v !== optionValue)
        : [...cur, optionValue];
      onChange?.(next);
    } else {
      onChange?.(optionValue);
      close();
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(multiple ? [] : "");
  };

  const handleTriggerKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) open();
      setFocusedIndex(0);
    } else if (e.key === "Escape") {
      close();
    }
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredOptions[focusedIndex].value);
    } else if (e.key === "Escape") {
      close();
    } else if (e.key === "Tab") {
      close();
    }
  };

  const handleListKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredOptions[focusedIndex].value);
    } else if (e.key === "Escape") {
      close();
    }
  };

  useEffect(() => {
    if (focusedIndex < 0 || !listRef.current) return;
    const items =
      listRef.current.querySelectorAll<HTMLLIElement>("[role='option']");
    items[focusedIndex]?.scrollIntoView({ block: "nearest" });
  }, [focusedIndex]);

  const triggerClasses = clsx(
    "flex items-center justify-between w-full min-h-[42px] px-3 py-2 rounded-lg border bg-white outline-none transition-all duration-150 cursor-pointer select-none gap-2",
    !error && !isOpen && !disabled && "border-gray-300 hover:border-gray-400",
    !error && isOpen && "border-green-600 ring-2 ring-green-600/20",
    error && "border-red-500 ring-2 ring-red-500/20",
    disabled && "bg-gray-50 border-gray-200 cursor-not-allowed opacity-60"
  );

  return (
    <div className="flex flex-col gap-1.5 w-full relative" ref={containerRef}>
      {label && (
        <label
          id={labelId}
          className={clsx(
            "text-sm font-medium leading-none",
            disabled ? "text-gray-400" : "text-gray-700"
          )}
        >
          {label}
        </label>
      )}

      <div
        ref={triggerRef}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? listboxId : undefined}
        aria-labelledby={label ? labelId : undefined}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={toggle}
        onKeyDown={handleTriggerKeyDown}
        className={twMerge(triggerClasses, className)}
      >
        <div className="flex-1 min-w-0">
          {!hasValue && (
            <span className="text-gray-400 truncate text-sm select-none">
              {placeholder}
            </span>
          )}

          {hasValue && !multiple && (
            <span className="text-gray-900 truncate text-sm font-medium">
              {selectedOptions[0]?.label}
            </span>
          )}

          {hasValue && multiple && (() => {
            const visible = selectedOptions.slice(0, 2);
            const hidden = selectedOptions.length - 2;
            return (
              <div className="flex flex-wrap gap-1 items-center">
                {visible.map((opt) => (
                  <span
                    key={opt.value}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-green-50 text-green-800 border border-green-200 max-w-[150px]"
                  >
                    <span className="truncate">{opt.label}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(opt.value);
                      }}
                      className="shrink-0 text-green-600 hover:text-green-900 transition-colors rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-green-500 flex items-center justify-center"
                      aria-label={`Remove ${opt.label}`}
                    >
                      <Icon name="closeSmall" size={10} />
                    </button>
                  </span>
                ))}
                {hidden > 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                    +{hidden}
                  </span>
                )}
              </div>
            );
          })()}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {clearable && hasValue && !disabled && (
            <>
              <button
                type="button"
                onClick={handleClear}
                className="p-0.5 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 flex items-center justify-center"
                aria-label="Clear selection"
                tabIndex={-1}
              >
                <Icon name="close" size={14} />
              </button>
              <span className="w-px h-4 bg-gray-200" aria-hidden="true" />
            </>
          )}
          <Icon
            name="chevronDown"
            size={16}
            className={clsx(
              "text-gray-400 transition-transform duration-200",
              isOpen && "rotate-180 text-green-600"
            )}
          />
        </div>
      </div>

      {isOpen && (
        <div
          className={twMerge(
            clsx(
              "absolute z-50 w-full top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg shadow-gray-900/10 overflow-hidden animate-dropdownIn",
              menuClassName
            )
          )}
        >
          {searchable && (
            <div className="p-2 border-b border-gray-100">
              <div className="relative">
                <Icon 
                  name="search" 
                  size={14} 
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
                />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setFocusedIndex(0);
                  }}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search…"
                  className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all placeholder:text-gray-400"
                  aria-label="Search options"
                  aria-autocomplete="list"
                  aria-controls={isOpen ? listboxId : undefined}
                />
              </div>
            </div>
          )}

          <ul
            id={listboxId}
            ref={listRef}
            role="listbox"
            aria-multiselectable={multiple}
            tabIndex={searchable ? -1 : 0}
            onKeyDown={!searchable ? handleListKeyDown : undefined}
            className="max-h-60 overflow-y-auto py-1.5 overscroll-contain focus:outline-none"
          >
            {filteredOptions.length === 0 ? (
              <li className="flex flex-col items-center gap-1.5 py-6 text-sm text-gray-400">
                <Icon name="emptyState" size={20} />
                No results found
              </li>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = multiple
                  ? (value as string[])?.includes(option.value)
                  : value === option.value;
                const isFocused = focusedIndex === index;

                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(option.value);
                    }}
                    onMouseEnter={() => setFocusedIndex(index)}
                    className={clsx(
                      "flex items-center justify-between mx-1.5 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors duration-75",
                      isSelected
                        ? "bg-green-50 text-green-800 font-medium"
                        : isFocused
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    {multiple && (
                      <span
                        aria-hidden="true"
                        className={clsx(
                          "shrink-0 mr-2.5 w-4 h-4 rounded border flex items-center justify-center transition-colors",
                          isSelected
                            ? "bg-green-600 border-green-600 text-white"
                            : "border-gray-300 bg-white"
                        )}
                      >
                        {isSelected && <Icon name="check" size={10} />}
                      </span>
                    )}

                    <span className="flex-1 truncate">{option.label}</span>

                    {!multiple && isSelected && (
                      <Icon name="check" size={14} className="text-green-600 shrink-0 ml-2" />
                    )}
                  </li>
                );
              })
            )}
          </ul>

          {multiple && selectedOptions.length > 0 && (
            <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100 bg-gray-50/80">
              <span className="text-xs text-gray-500">
                {selectedOptions.length}{" "}
                {selectedOptions.length === 1 ? "item" : "items"} selected
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange?.([]);
                }}
                className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors focus:outline-none focus-visible:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}

      {(helperText || typeof error === "string") && (
        <div
          className={clsx(
            "flex items-center gap-1.5 text-xs mt-0.5",
            error ? "text-red-500" : "text-gray-400"
          )}
        >
          {error && <Icon name="errorCircle" size={12} />}
          <span>{typeof error === "string" ? error : helperText}</span>
        </div>
      )}
    </div>
  );
};

export default Dropdown;