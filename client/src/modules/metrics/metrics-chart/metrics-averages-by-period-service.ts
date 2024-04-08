import { z } from "zod";
import { type Period } from "./entities";
import { client } from "../../shared/client/client";

const Schema = z.array(
  z
    .object({
      date: z.string().datetime(),
    })
    .catchall(z.coerce.number()),
);

export async function metricsAveragesByPeriodService(period: Period, metrics?: string[]) {
  const response = await client("/metrics/measurements", {
    params: {
      period,
      metrics
    },
  });
  return Schema.parse(response.data);
}

