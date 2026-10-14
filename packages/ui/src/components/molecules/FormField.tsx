import { useId, type InputHTMLAttributes } from "react";
import { Input, Label } from "../atoms/Field.js";
export interface FormFieldProps {
  id?: string;
  label: string;
  description?: string;
  error?: string;
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "id">;
}
export function FormField({
  id,
  label,
  description,
  error,
  inputProps = {},
}: FormFieldProps) {
  const generated = useId();
  const fieldId = id ?? generated;
  const descriptions =
    [
      inputProps["aria-describedby"],
      description ? `${fieldId}-description` : null,
      error ? `${fieldId}-error` : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <div className="csp-ui-field">
      <Label htmlFor={fieldId}>{label}</Label>
      <Input
        {...inputProps}
        id={fieldId}
        aria-describedby={descriptions}
        aria-invalid={error ? true : inputProps["aria-invalid"]}
      />
      {description && (
        <p id={`${fieldId}-description`} className="csp-ui-field-description">
          {description}
        </p>
      )}
      {error && (
        <p id={`${fieldId}-error`} className="csp-ui-field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
