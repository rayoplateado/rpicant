import { ReactNode } from "react";
import {
  SelectItem as TremorSelectItem,
  Select as TremorSelect,
} from "@tremor/react";

export function Select({
  children,
  disabled,
  label,
  name,
  onChange,
  required,
  value,
}: {
  children?: ReactNode;
  disabled?: boolean;
  label: string;
  name: string;
  onChange?: (value: string) => void;
  required?: boolean;
  value?: string;
}) {
  return (
    <fieldset>
      <label
        htmlFor={name}
        className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
      >
        {label}
      </label>
      <TremorSelect
        disabled={disabled}
        id={name}
        name={name}
        required={required}
        onValueChange={onChange}
        value={value}
      >
        {children}
      </TremorSelect>
    </fieldset>
  );
}
export function SelectItem({
  children,
  value,
}: {
  children?: ReactNode;
  value: string;
}) {
  return <TremorSelectItem value={value}>{children}</TremorSelectItem>;
}
