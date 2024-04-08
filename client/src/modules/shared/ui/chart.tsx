import { AreaChart, LineChart } from "@tremor/react";

export type ChartKind = "line" | "area";

export function Chart({
  categories,
  data,
  kind,
}: {
  kind: ChartKind;
  categories: string[];
  data: Record<string, unknown>[];
}) {
  switch (kind) {
    case "area": {
      return (
        <AreaChart
          categories={categories}
          className="h-80"
          connectNulls
          data={data}
          index="date"
          intervalType="preserveStartEnd"
          showAnimation
          showXAxis={false}
          valueFormatter={truncateFloat}
        />
      );
    }
    case "line": {
      return (
        <LineChart
          categories={categories}
          className="h-80"
          connectNulls
          data={data}
          index="date"
          intervalType="preserveStartEnd"
          showAnimation
          showXAxis={false}
          valueFormatter={truncateFloat}
        />
      );
    }
  }
}

function truncateFloat(value: number) {
  return value.toFixed(2);
}
