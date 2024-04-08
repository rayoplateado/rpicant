type env = "MODE" | "VITE_SERVER_API_DOMAIN_NAME";

function set(variable: env, value: string): void {
  import.meta.env[variable] = value;
}

function get(variable: env): string {
  return import.meta.env[variable]!;
}

function isProd(): boolean {
  return env.get("MODE") == "production";
}

export const env = {
  set,
  get,
  isProd,
};
