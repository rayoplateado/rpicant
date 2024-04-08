import {
  MultiSelectItem as TremorMultiSelectItem,
  MultiSelect as TremorMultiSelect,
} from "@tremor/react";
import { ReactNode } from "react";

export function MultiSelect({
  children,
  label,
  disabled,
  name,
  value,
  onChange,
  required,
}: {
  children?: ReactNode;
  disabled?: boolean;
  label: string;
  name: string;
  onChange?: (value: string[]) => void;
  value?: string[];
  required?: boolean;
}) {
  return (
    <fieldset>
      <label
        htmlFor={name}
        className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
      >
        {label}
      </label>
      <TremorMultiSelect
        disabled={disabled}
        id={name}
        name={name}
        value={value}
        required={required}
        onValueChange={onChange}
      >
        {children}
      </TremorMultiSelect>
    </fieldset>
  );
}
export function MultiSelectItem({
  value,
  children,
}: {
  value: string;
  children?: ReactNode;
}) {
  return (
    <TremorMultiSelectItem value={value}>{children}</TremorMultiSelectItem>
  );
}
