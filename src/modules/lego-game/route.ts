import { Hono } from "hono";
import { rawData } from "./data";

export const legoGameRoute = new Hono();

legoGameRoute.get("/", (c) => {
  return c.json(rawData);
});
