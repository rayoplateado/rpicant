import { z } from "zod";
import { client } from "../../shared/client/client";

const MetricsList = z.array(
  z.object({
    name: z.string({
      required_error: 'All metrics must have names'
    }),
  }),
);

export async function getMetrics() {
  const result = await client("/metrics");
  return MetricsList.parse(result.data)
}
