import { beforeEach, describe, expect, it, vi } from "vitest";
import { FetchError, client } from "./client";
import { server } from "../../../../vitest.setup";
import { HttpResponse, http } from "msw";
import { env } from "../env/env";

vi.mock("../env/env", () => {
  return {
    env: {
      get(variable: string) {
        return {
          VITE_SERVER_API_DOMAIN_NAME: "mytest.com",
        }[variable];
      },
      isProd: vi.fn(() => false),
    },
  };
});

describe("client", () => {
  beforeEach(() => {
    server.use(
      http.get("http://mytest.com/api/v1/:result", ({ params, request }) => {
        const { result } = params;
        const url = new URL(request.url);
        const query =
          url.searchParams.get("query") || url.searchParams.getAll("query[]");
        switch (result) {
          case "error": {
            return HttpResponse.json({ message: "error" }, { status: 500 });
          }
          default: {
            if (query.length) return HttpResponse.json({ query });
            return HttpResponse.json({ hello: "world" });
          }
        }
      }),
      http.get("https://mytest.com/api/v1/:result", ({ params }) => {
        const { result } = params;
        switch (result) {
          default: {
            return HttpResponse.json({ hello: "space" });
          }
        }
      }),
    );
  });

  it("should choose protocol depending on environment", async () => {
    await expect(client("/success")).resolves.toEqual(
      expect.objectContaining({
        hello: "world",
      }),
    );

    vi.mocked(env.isProd).mockReturnValueOnce(true);

    await expect(client("/success")).resolves.toEqual(
      expect.objectContaining({
        hello: "space",
      }),
    );
  });

  it("should have a baseURL", async () => {
    await expect(client("/success")).resolves.toEqual(
      expect.objectContaining({
        hello: "world",
      }),
    );
  });

  it("should receive query parameters and encode them correctly", async () => {
    const result = await client("/success", {
      params: {
        query: "works",
      },
    });
    expect(result).toEqual(
      expect.objectContaining({
        query: "works",
      }),
    );
  });

  it("should receive array query parameters and encode them correctly", async () => {
    const result = await client("/success", {
      params: {
        query: ["works", "as", "expected"],
      },
    });
    expect(result).toEqual(
      expect.objectContaining({
        query: ["works", "as", "expected"],
      }),
    );
  });

  it("should return it's own type of error if the call receives an error status", async () => {
    await expect(client("/error")).rejects.toEqual(
      new FetchError({ message: "error", errors: [] }),
    );
  });
});
