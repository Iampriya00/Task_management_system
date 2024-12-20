import * as React from "react";

import { cn } from "@/lib/utils";
import { useToggle } from "usehooks-ts";
import { Eye, EyeClosed } from "lucide-react";

const PasswordField = React.forwardRef(({ className, type, ...props }, ref) => {
  const [passwordVisible, togglePasswordVisible] = useToggle(false);
  return (
    <div className="relative w-full">
      <input
        type={passwordVisible ? "text" : "password"}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
      <button
        className="focus:outline-none absolute right-3 top-1/2 -translate-y-1/2"
        type="button"
        disabled={props.disabled}
        onClick={togglePasswordVisible}
      >
        {passwordVisible ? (
          <Eye className="text-primary/60 text-lg " />
        ) : (
          <EyeClosed className="text-primary/60 text-lg" />
        )}
      </button>
    </div>
  );
});
PasswordField.displayName = "PasswordField";

export { PasswordField };
