import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { GameSchema } from "./schema";
import { prisma } from "../../lib/prisma";

export const gameRoute = new OpenAPIHono();

gameRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    summary: "Get all games",
    responses: {
      200: {
        content: { "application/json": { schema: z.array(GameSchema) } },
        description: "List of games",
      },
    },
  }),
  async (c) => {
    const games = await prisma.game.findMany({
      include: { category: true },
    });

    return c.json(games);
  },
);

gameRoute.openapi(
  createRoute({
    method: "get",
    path: "/{slug}",
    summary: "Get game by slug",
    request: {
      params: z.object({
        slug: z.string().openapi({ example: "lego-marvel-super-heroes-2" }),
      }),
    },
    responses: {
      200: {
        content: { "application/json": { schema: GameSchema } },
        description: "Game detail",
      },
      404: { description: "Game not found" },
    },
  }),
  async (c) => {
    const { slug } = c.req.valid("param");

    const game = await prisma.game.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (!game) {
      return c.json({ message: "Game not found" }, 404);
    }

    return c.json(game, 200);
  },
);
