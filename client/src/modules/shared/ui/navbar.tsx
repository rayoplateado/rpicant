import type { ReactNode } from "react";

export function Navbar({ children }: { children: ReactNode }) {
  return (
    <div className="min-w-full p-4 bg-blue-900 text-white border-b-4 border-emerald-200">
      {children}
    </div>
  );
}
