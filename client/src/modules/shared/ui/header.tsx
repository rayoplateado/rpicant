import { ReactNode } from "react";

export function Header({ children }: { children: ReactNode}) {
  return <h1 className="text-2xl text-neutral-700 font-bold leading-none">{children}</h1>;
}
