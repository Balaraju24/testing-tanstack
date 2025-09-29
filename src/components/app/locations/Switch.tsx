import { SwitchProps } from "@/lib/interfaces/location";
import { Loader2 } from "lucide-react";

export function Switch({
  status,
  toggleStatus,
  disabled = false,
  disabledAll = false,
  editDisable = false,
  className = "",
}: SwitchProps) {
  const isActive = status === "Active";
  const isDisabled = disabled || disabledAll || editDisable;

  const handleClick = () => {
    if (isDisabled) return;
    toggleStatus();
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        onClick={handleClick}
        className={`
          relative flex items-center justify-center w-10 h-5 rounded-full transition-all duration-300 ease-in-out
          ${isDisabled ? "cursor-default" : "cursor-pointer"}
          ${isActive ? "bg-green-500" : "bg-red-500"}
          ${isDisabled ? "opacity-70" : ""}
        `}
      >
        {disabled ? (
          <Loader2 className="w-3 h-3 text-white animate-spin" />
        ) : (
          <div
            className={`
              absolute w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out
              ${isActive ? "translate-x-2.5" : "-translate-x-2.5"}
            `}
          />
        )}
      </div>

      <span
        className={`text-sm font-medium select-none ${
          isActive ? "text-green-600" : "text-red-500"
        } ${disabled || editDisable ? "opacity-70" : ""}`}
      >
        {isActive ? "Active" : "Inactive"}
      </span>
    </div>
  );
}
