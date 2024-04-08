import { expect, test } from "vitest";
import { env } from "./env";

test("env", () => {
  env.set("MODE", "IS_NICE");
  expect(env.get("MODE")).toBe("IS_NICE");
  env.set("MODE", "production");
  expect(env.isProd()).toBeTruthy();
});
