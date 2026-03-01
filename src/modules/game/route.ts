import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { GameSchema, GameCreateSchema, GameUpdateSchema } from "./schema";
import { prisma } from "../../lib/prisma";

export const gameRoutes = new OpenAPIHono();

// --- ROUTE DEFINITIONS ---

const getGamesRoute = createRoute({
  method: "get",
  path: "/",
  summary: "Get all LEGO games",
  responses: {
    200: {
      content: { "application/json": { schema: z.array(GameSchema) } },
      description: "List of games",
    },
  },
});

const postGameRoute = createRoute({
  method: "post",
  path: "/",
  summary: "Create a new LEGO game",
  request: {
    body: {
      content: { "application/json": { schema: GameCreateSchema } },
    },
  },
  responses: {
    201: {
      content: { "application/json": { schema: GameSchema } },
      description: "Game created",
    },
    400: { description: "Validation Error" },
    409: { description: "Slug already exists" },
  },
});

const getGameByIdRoute = createRoute({
  method: "get",
  path: "/{id}",
  summary: "Get game by id",
  request: {
    params: z.object({
      id: z.coerce.number().openapi({ example: 1 }),
    }),
  },
  responses: {
    200: {
      content: { "application/json": { schema: GameSchema } },
      description: "Game detail",
    },
    404: { description: "Game not found" },
  },
});

const deleteGameByIdRoute = createRoute({
  method: "delete",
  path: "/{id}",
  summary: "Delete a game",
  request: {
    params: z.object({
      id: z.coerce.number().openapi({ example: 1 }),
    }),
  },
  responses: {
    200: {
      description: "Success message",
      content: {
        "application/json": { schema: z.object({ message: z.string() }) },
      },
    },
    404: { description: "Game not found" },
  },
});

const patchGameRoute = createRoute({
  method: "patch",
  path: "/{id}",
  summary: "Update game data",
  request: {
    params: z.object({
      id: z.coerce.number().openapi({ example: 1 }),
    }),
    body: {
      content: { "application/json": { schema: GameUpdateSchema } },
    },
  },
  responses: {
    200: {
      description: "Updated game object",
      content: { "application/json": { schema: GameSchema } },
    },
    404: { description: "Game not found" },
  },
});

// --- CONTROLLERS / IMPLEMENTATION ---

gameRoutes.openapi(getGamesRoute, async (c) => {
  const games = await prisma.game.findMany({
    include: { category: true },
  });
  return c.json(games);
});

gameRoutes.openapi(getGameByIdRoute, async (c) => {
  const { id } = c.req.valid("param");
  const game = await prisma.game.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!game) {
    return c.json({ message: "Game not found" }, 404);
  }
  return c.json(game, 200);
});

gameRoutes.openapi(postGameRoute, async (c) => {
  const data = c.req.valid("json");

  try {
    const newGame = await prisma.game.create({
      data: {
        name: data.name,
        slug: data.slug,
        sku: data.sku,
        price: data.price,
        stockQuantity: data.stockQuantity,
        imageUrl: data.imageUrl,
        // Jika di schema ada categorySlug untuk koneksi
        category: (data as any).categorySlug
          ? { connect: { slug: (data as any).categorySlug } }
          : undefined,
      },
    });
    return c.json(newGame, 201);
  } catch (error: any) {
    if (error.code === "P2002") {
      return c.json({ message: "Slug or SKU already exists" }, 409);
    }
    return c.json({ message: "Error", error: error.message }, 500);
  }
});

gameRoutes.openapi(deleteGameByIdRoute, async (c) => {
  const { id } = c.req.valid("param");
  try {
    await prisma.game.delete({ where: { id } });
    return c.json({ message: "Game deleted successfully" }, 200);
  } catch (error) {
    return c.json({ message: "Game not found" }, 404);
  }
});

gameRoutes.openapi(patchGameRoute, async (c) => {
  const { id } = c.req.valid("param");
  const body = c.req.valid("json");

  try {
    const updatedGame = await prisma.game.update({
      where: { id },
      data: body,
    });
    return c.json(updatedGame, 200);
  } catch (error: any) {
    if (error.code === "P2025") {
      return c.json({ message: "Game update failed, not found" }, 404);
    }
    return c.json({ message: "Game update failed", error: error.message }, 500);
  }
});
