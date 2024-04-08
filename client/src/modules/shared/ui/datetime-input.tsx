import { TextInput } from "@tremor/react";

export function DatetimeInput({
  name,
  label,
  required,
  error,
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
      <TextInput
        id={name}
        error={Boolean(error)}
        errorMessage={error}
        name={name}
        // @disclaimer: @tremor/react does not accept the native
        // datetime-local type, but it works on current version as they
        // just pass along the prop to the native input
        // eslint-disable-next-line
        type={"datetime-local" as any}
        required={required}
        defaultValue={new Date().toISOString().substring(0, 16)}
      />
    </fieldset>
  );
}
