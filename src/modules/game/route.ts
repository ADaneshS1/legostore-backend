import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { GamesSchema } from "./schema";

export const gameRoutes = new OpenAPIHono();

gameRoutes.openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: {
        content: { "application/json": { schema: GamesSchema } },
        description: "Get all games",
      },
    },
  }),
  (c) => {
    // TODO: Get games from database
    // const games = await db.game.findMany();

    return c.json([], 200);
  },
);
