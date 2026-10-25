import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { CircleAlert, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  /** Short note beside the label, such as "Optional" or a character count. */
  tag?: string;
  className?: string;
};

const controlClasses =
  "w-full rounded-lg border border-white/10 bg-ink-950/60 text-titanium-50 transition-colors duration-200 placeholder:text-titanium-500/70 hover:border-white/20 focus:border-copper-500 aria-[invalid=true]:border-danger-500";

/** The ids a control should point to with aria-describedby. */
function describedBy({ id, hint, error }: Pick<FieldProps, "id" | "hint" | "error">) {
  return [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
}

function controlProps(field: FieldProps) {
  return {
    id: field.id,
    "aria-invalid": field.error ? true : undefined,
    "aria-describedby": describedBy(field),
  };
}

export function FieldError({ id, message, className }: { id: string; message?: string; className?: string }) {
  if (!message) return null;
  return (
    <p id={id} className={cn("flex items-start gap-2 text-sm text-danger-400", className)}>
      <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
      {message}
    </p>
  );
}

function FieldShell({ id, label, hint, error, tag, className, children }: FieldProps & { children: ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-titanium-300">
          {label}
        </label>
        {tag && <span className="text-xs text-titanium-500">{tag}</span>}
      </div>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-titanium-500">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

type TextFieldProps = FieldProps & Omit<ComponentPropsWithoutRef<"input">, "id" | "className">;

export function TextField({ id, label, hint, error, tag, className, ...props }: TextFieldProps) {
  const field = { id, label, hint, error, tag, className };
  return (
    <FieldShell {...field}>
      <input {...controlProps(field)} className={cn(controlClasses, "h-12 px-4")} {...props} />
    </FieldShell>
  );
}

type TextAreaFieldProps = FieldProps & Omit<ComponentPropsWithoutRef<"textarea">, "id" | "className">;

export function TextAreaField({ id, label, hint, error, tag, className, ...props }: TextAreaFieldProps) {
  const field = { id, label, hint, error, tag, className };
  return (
    <FieldShell {...field}>
      <textarea {...controlProps(field)} className={cn(controlClasses, "min-h-36 resize-y px-4 py-3 leading-relaxed")} {...props} />
    </FieldShell>
  );
}

type SelectFieldProps = FieldProps & Omit<ComponentPropsWithoutRef<"select">, "id" | "className">;

export function SelectField({ id, label, hint, error, tag, className, children, ...props }: SelectFieldProps) {
  const field = { id, label, hint, error, tag, className };
  return (
    <FieldShell {...field}>
      <div className="relative">
        <select {...controlProps(field)} className={cn(controlClasses, "h-12 appearance-none pr-11 pl-4")} {...props}>
          {children}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-copper-400"
        />
      </div>
    </FieldShell>
  );
}
