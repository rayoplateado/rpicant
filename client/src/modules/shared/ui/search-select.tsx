import {
  SearchSelectItem as TremorSearchSelectItem,
  SearchSelect as TremorSearchSelect,
} from "@tremor/react";
import { ReactNode, useState } from "react";

const CREATE_DEFAULT_VALUE = "Just type and select to add a new metric";

export function SearchSelect({
  name,
  label,
  required,
  error,
  children,
}: {
  name: string;
  error?: string
  label: string;
  required?: boolean;
  children?: ReactNode;
}) {
  const [createOption, setCreateOption] = useState(CREATE_DEFAULT_VALUE);

  return (
    <fieldset>
      <label
        htmlFor={name}
        className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
      >
        {label}
      </label>
      <TremorSearchSelect
        error={Boolean(error)}
        errorMessage={error}
        id={name}
        name={name}
        required={required}
        onSearchValueChange={(search) => {
          setCreateOption(search || CREATE_DEFAULT_VALUE);
        }}
      >
        {children}
        <TremorSearchSelectItem value={createOption}>
          {createOption}
        </TremorSearchSelectItem>
      </TremorSearchSelect>
    </fieldset>
  );
}
export function SearchSelectItem({
  value,
  children,
}: {
  value: string;
  children?: ReactNode;
}) {
  return (
    <TremorSearchSelectItem value={value}>{children}</TremorSearchSelectItem>
  );
}
