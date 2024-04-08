import { NumberInput as TremorNumberInput } from "@tremor/react";

export function NumberInput({
  name,
  error,
  required,
  label,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <fieldset>
      <label
        htmlFor={name}
        className="text-tremor-default text-tremor-content dark:text-dark-tremor-content"
      >
        {label}
      </label>
      <TremorNumberInput
        name={name}
        id={name}
        required={required}
        error={Boolean(error)}
        errorMessage={error}
      />
    </fieldset>
  );
}
