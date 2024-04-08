import { useQuery } from "react-query";
import { getMetrics } from "./get-metrics-service";

export function useMetrics() {
  return useQuery(['useMetrics'], () => getMetrics());
}

