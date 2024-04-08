import { ReactNode } from "react";

export function Form({
  title,
  subtitle,
  children,
  onSubmit,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onSubmit: (values: Record<string, string>) => void;
}) {
  return (
    <form
      className="flex flex-col gap-3"
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const valuesObject = formDataToObject(formData);
        onSubmit(valuesObject);
      }}
    >
      <h2 className="text-lg font-bold text-slate-700">{title}</h2>
      {subtitle && <h2 className="text-sm text-slate-400">{subtitle}</h2>}
      {children}
    </form>
  );
}

function formDataToObject(formData: FormData) {
  const object: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    object[key] = value.toString();
  }
  return object;
}
