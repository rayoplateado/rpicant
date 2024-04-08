import { withHttps, withHttp, joinURL, withQuery } from "ufo";
import { env } from "../env/env";

export const GET = "GET" as const;
export const POST = "POST" as const;

type Method = typeof GET | typeof POST;

type Params = Record<string, string | string[] | undefined>;

export async function client(
  path: string,
  config: {
    params?: Params;
    method?: Method;
    body?: Record<string, unknown>;
  } = {},
) {
  const protocol = env.isProd() ? withHttps : withHttp;
  const { body } = config;
  let { params, method } = config;
  method ??= GET;
  params ??= {};

  const baseURL = protocol(
    joinURL("https://", env.get("VITE_SERVER_API_DOMAIN_NAME"), "api", "v1"),
  );

  const url = withQuery(joinURL(baseURL, path), coerceArrayParamsKey(params));

  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    const message = await response.json();
    throw new FetchError(message);
  }
}

type ResponseError = {
  message: string
  errors: {field: string, message: string}[]
}

export class FetchError extends Error {
  isFetchError = true;
  response: ResponseError;
  constructor(response: ResponseError) {
    super("FETCH_ERROR");
    this.response = response;
  }
}

function coerceArrayParamsKey(params: Params) {
  const result = params;

  for (const key in result) {
    if (Array.isArray(result[key])) {
      result[`${key}[]`] = result[key];
      delete result[key];
    }
  }

  return result
}
