import { Reducer, useEffect, useReducer, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Card, Dialog, DialogPanel, Button } from "@tremor/react";
import { addMeasurementService } from "./add-measurement-service";
import { useMetrics } from "../shared/use-metrics";
import { DatetimeInput } from "../../shared/ui/datetime-input";
import { Form } from "../../shared/ui/form";
import { Header } from "../../shared/ui/header";
import { NumberInput } from "../../shared/ui/number-input";
import { SearchSelect, SearchSelectItem } from "../../shared/ui/search-select";
import { ZodError } from "zod";

type Action = {
  type:
  | "SUBMIT_SUCCESS"
  | "SUBMIT_ERROR"
  | "METRICS_LOAD_ERROR"
  | "METRICS_LOADED"
  | "ADD_ANOTHER";
  // eslint-disable-next-line
  payload?: any;
};

type Status = "idle" | "loading" | "success" | "error";
type State = {
  status: Status;
};

export function AddMeasurement() {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, {
    status: "loading",
  });

  const {
    data: metrics = [],
    isError: isErrorMetrics,
    isSuccess: isSuccessMetrics,
    refetch: refetchMetrics,
  } = useMetrics();

  useEffect(() => {
    if (isErrorMetrics) dispatch({ type: "METRICS_LOAD_ERROR" });
    if (isSuccessMetrics) dispatch({ type: "METRICS_LOADED" });
  }, [isErrorMetrics, isSuccessMetrics]);

  return (
    <Card className="flex flex-col gap-3">
      <AddMeasurementForm
        metrics={metrics}
        isLoading={state.status === "loading"}
        onSuccess={() => dispatch({ type: "SUBMIT_SUCCESS" })}
      />
      <SuccessDialog
        isOpen={state.status === "success"}
        onClose={() => dispatch({ type: "ADD_ANOTHER" })}
      />
      <ErrorDialog
        isOpen={state.status === "error"}
        retry={refetchMetrics}
        onClose={() => dispatch({ type: "ADD_ANOTHER" })}
      />
    </Card>
  );
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SUBMIT_SUCCESS": {
      return {
        ...state,
        status: "success" as Status,
      };
    }

    case "METRICS_LOADED":
    case "ADD_ANOTHER": {
      return {
        ...state,
        status: "idle" as Status,
      };
    }

    case "METRICS_LOAD_ERROR":
    case "SUBMIT_ERROR": {
      return {
        ...state,
        status: "error" as Status,
      };
    }
  }
}

function AddMeasurementForm({
  isLoading,
  metrics,
  onSuccess,
}: {
  isLoading: boolean;
  metrics: { name: string }[];
  onSuccess: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <Form
      title="Add a measurement for a metric in a given time"
      subtitle="If you're adding a new metric, just type in the name and select it"
      onSubmit={async (values) => {
        try {
          setIsSubmitting(true);
          const metric = values.metric;
          const value = Number.parseInt(values.value);
          const timestamp = new Date(values.timestamp).toISOString();
          await addMeasurementService({
            metric,
            value,
            timestamp,
          });
          onSuccess();
          /* v8 ignore start */
        } catch (error: unknown) {
          if (error instanceof ZodError) {
            const errorMessages = error.issues.reduce(
              (acc, issue) => {
                acc[issue.path.join(".")] = issue.message;
                return acc;
              },
              {} as Record<string, string>,
            );
            setErrors(errorMessages);
          }
          /* v8 ignore end */
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <SearchSelect name="metric" label="Metric" required error={errors.metric}>
        {metrics.map((metric) => (
          <SearchSelectItem key={metric.name} value={metric.name}>
            {metric.name}
          </SearchSelectItem>
        ))}
      </SearchSelect>
      <NumberInput label="Value" name="value" required  error={errors.value}/>
      <DatetimeInput label="Time" name="timestamp" required error={errors.timestamp} />
      <div className="flex justify-end">
        <Button disabled={isLoading || isSubmitting} type="submit">
          Add
        </Button>
      </div>
    </Form>
  );
}

function SuccessDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate({ from: "/create" });
  return (
    <Dialog open={isOpen} onClose={onClose} static={true}>
      <DialogPanel className="min-h-48 flex flex-col justify-between">
        <div>
          <Header>Measurement added successfully</Header>
          <p>
            You can now see your metrics in the dashboard or add another one to
            your logs.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={onClose}>
            Add another one
          </Button>

          <Button onClick={() => navigate({ to: "/" })}>
            Go back to Dashboard
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}

function ErrorDialog({
  isOpen,
  onClose,
  retry,
}: {
  isOpen: boolean;
  onClose: () => void;
  retry: () => void;
}) {
  const navigate = useNavigate({ from: "/create" });
  return (
    <Dialog open={isOpen} onClose={onClose} static={true}>
      <DialogPanel className="min-h-48 flex flex-col justify-between">
        <div>
          <Header>Could not load your metrics</Header>
          <p>
            Something went wrong and we cannot load yout metrics. You can try
            again or go back to your dashboard
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              onClose();
              retry();
            }}
          >
            Try again
          </Button>

          <Button onClick={() => navigate({ to: "/" })}>
            Go back to Dashboard
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
