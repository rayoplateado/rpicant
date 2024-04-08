import { useQuery } from "react-query";
import type { Period } from "./entities";
import { metricsAveragesByPeriodService } from "./metrics-averages-by-period-service";

export function useMetricsAverages({
  enabled,
  metrics,
  period,
}: {
  enabled?: boolean;
  metrics?: string[];
  period: Period;
}) {
  return useQuery(
    ["useMetricsAverages", period, { metrics }],
    () => metricsAveragesByPeriodService(period, metrics),
    {
      retry: false,
      enabled,
      select: (data) => {
        return {
          categories: data
            .flatMap((x) => Object.keys(x).filter((y) => y !== "date"))
            .filter((value, index, array) => array.indexOf(value) === index),
          dataset: data.map((x) => {
            return {
              ...x,
              date: new Intl.DateTimeFormat("en", {
                dateStyle: "short",
                timeStyle: "medium",
              }).format(new Date(x.date)),
            };
          }),
        };
      },
    },
  );
}
