import type { ReactNode } from "react";

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="container p-4 min-h-screen min-w-full bg-slate-100">
      {children}
    </div>
  );
}
