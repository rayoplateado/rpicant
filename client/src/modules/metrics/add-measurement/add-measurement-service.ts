import { z } from "zod";
import { client } from "../../shared/client/client";

const Schema = z.object({
  metric: z.string({
    required_error: "Metric is required",
    invalid_type_error: "Metric must be a string",
  }).min(3, "Metric name must be at least 3 characters long"),
  value: z.coerce.number({
    required_error: "Value is required",
    invalid_type_error: "Value must be a number",
  }),
  timestamp: z
    .string({
      required_error: "Timestamp is required",
      invalid_type_error: "Timestamp must be a valid date",
    })
    .datetime({}),
});

export function addMeasurementService(formValues: z.infer<typeof Schema>) {
  return client("/metrics/measurements/", {
    method: "POST",
    body: Schema.parse(formValues),
  });
}
