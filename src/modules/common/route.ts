import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { prisma } from "../../lib/prisma";

export const commonRoutes = new OpenAPIHono();

commonRoutes.openapi(
  createRoute({
    method: "get",
    path: "/health-check",
    summary: "Health Check / Root API",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              title: z.string().openapi({ example: "Lego Game API" }),
              message: z.string().openapi({ example: "Health Check" }),
              countProducts: z.number().openapi({ example: 100 }),
            }),
          },
        },
        description: "Health Check information",
      },
    },
  }),
  async (c) => {
    const countProducts = await prisma.game.count();

    return c.json(
      {
        title: "Health Check",
        message: "Health Check",
        countProducts,
      },
      200,
    );
  },
);
