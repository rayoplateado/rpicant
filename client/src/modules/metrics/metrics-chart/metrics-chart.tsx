import { Dispatch, SetStateAction, useState } from "react";
import { Button, Card, Dialog, DialogPanel } from "@tremor/react";
import { Period } from "./entities";
import { useMetricsAverages } from "./use-metrics-averages";

import { Select, SelectItem } from "../../shared/ui/select";
import { Chart } from "../../shared/ui/chart";
import type { ChartKind } from "../../shared/ui/chart";
import { useMetrics } from "../shared/use-metrics";
import { MultiSelect, MultiSelectItem } from "../../shared/ui/multi-select";

type Filters = {
  chart: ChartKind;
  metrics: string[];
  period: Period;
};

export function MetricsChart() {
  const { chart, metrics, filters, isSuccess, isError, isLoading, refetch } =
    useChart();
  return (
    <Card className="min-h-96">
      <FiltersForm
        metrics={metrics}
        filters={filters}
        onChange={filters.update}
        isLoading={isLoading}
      />
      {isSuccess && (
        <Chart
          data={chart?.dataset || []}
          categories={chart?.categories || []}
          kind={filters.chart}
        />
      )}
      {isError && <LoadingErrorDialog isOpen={!isLoading} onClose={refetch} />}
    </Card>
  );
}

function useChart() {
  const { data: metrics, isError: isMetricsError } = useMetrics();
  const filters = useFilters();
  const {
    data: chart,
    isError: isAveragesError,
    isLoading,
    isSuccess,
    refetch,
  } = useMetricsAverages({
    enabled: Boolean(metrics),
    metrics: filters.metrics,
    period: filters.period,
  });

  return {
    metrics,
    filters,
    chart,
    isError: isMetricsError || isAveragesError,
    isLoading,
    isSuccess,
    refetch,
  };
}

function useFilters(): Filters & { update: Dispatch<SetStateAction<Filters>> } {
  const [filters, setFilters] = useState<Filters>({
    chart: "line" as ChartKind,
    metrics: [] as string[],
    period: "minute" as Period,
  });

  return { ...filters, update: setFilters };
}

function LoadingErrorDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} static={true} onClose={onClose}>
      <DialogPanel className="min-h-36 flex flex-col gap-4">
        <h3 className="text-lg">There was an error loading your metrics</h3>
        <div>
          <Button onClick={onClose}>Try again</Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}

function FiltersForm({
  filters,
  metrics,
  isLoading,
  onChange,
}: {
  metrics?: { name: string }[];
  filters: Filters;
  isLoading: boolean;
  onChange: Dispatch<SetStateAction<Filters>>;
}) {
  return (
    <form className="flex gap-4">
      <div className="max-w-52">
        <Select
          label="Period"
          disabled={isLoading}
          name="period"
          value={filters.period}
          onChange={(value) =>
            onChange((filters) => ({ ...filters, period: value as Period }))
          }
        >
          <SelectItem value="minute">Minutes</SelectItem>
          <SelectItem value="hour">Hours</SelectItem>
          <SelectItem value="day">Days</SelectItem>
        </Select>
      </div>

      <div className="max-w-52">
        <Select
          disabled={isLoading}
          label="Chart"
          name="kind"
          value={filters.chart}
          onChange={(value) =>
            onChange((filters) => ({ ...filters, chart: value as ChartKind }))
          }
        >
          <SelectItem value="line">Line</SelectItem>
          <SelectItem value="area">Area</SelectItem>
        </Select>
      </div>

      <MultiSelect
        label="Metrics"
        disabled={isLoading}
        name="metrics"
        value={filters.metrics}
        onChange={(value) =>
          onChange((filters) => ({ ...filters, metrics: value as string[] }))
        }
      >
        {metrics?.map((x) => (
          <MultiSelectItem key={x.name} value={x.name}>
            {x.name}
          </MultiSelectItem>
        ))}
      </MultiSelect>
    </form>
  );
}
