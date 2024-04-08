import type { ReactNode } from "react";

type Layout = "narrow" | "wide";

export function PageLayout({
  children,
  layout,
}: {
  layout: Layout;
  children: ReactNode;
}) {
  switch (layout) {
    case "wide": {
      return <Wide>{children}</Wide>
    }
    case "narrow":
    default: {
      return <Narrow>{children}</Narrow>;
    }
  }
}

function Wide({ children }: { children: ReactNode }) {
  return <div className="max-w-5xl mx-auto flex gap-4 flex-col" data-testid="page-layout-wide">{children}</div>;
}

function Narrow({ children }: { children: ReactNode }) {
  return <div className="max-w-xl mx-auto flex gap-4 flex-col" data-testid="page-layout-narrow">{children}</div>;
}
