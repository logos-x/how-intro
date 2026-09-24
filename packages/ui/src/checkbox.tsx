import * as React from "react";
import { cn } from "./lib/utils";

function Checkbox({
  checked,
  onCheckedChange,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"input"> & {
  checked?: boolean;
  onCheckedChange?: (v: boolean) => void;
  className?: string;
}) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className={cn(
        "w-4 h-4 rounded border border-input bg-background checked:bg-primary checked:border-primary transition-colors cursor-pointer",
        className
      )}
      {...props}
    />
  );
}

export { Checkbox };