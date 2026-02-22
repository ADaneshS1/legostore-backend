import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { SeedLegoGameSchema } from "./schema";
import { dataLegoGames } from "./data";
export const legoGameRoutes = new OpenAPIHono();

// 1. Definisikan Route dengan Metadata OpenAPI
const listLegoGamesRoute = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: SeedLegoGameSchema.array(), // Menandakan output adalah array dari LegoGame
        },
      },
      description: "Berhasil mengambil semua data game LEGO",
    },
  },
});

// 2. Implementasikan Handler-nya
legoGameRoutes.openapi(listLegoGamesRoute, (c) => {
  return c.json(dataLegoGames, 200);
});
