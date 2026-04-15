import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

export const commonRoute = new OpenAPIHono();

commonRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    summary: "Health Check / Root API",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              title: z.string().openapi({ example: "Lego Game API" }),
              message: z.string().openapi({ example: "Test" }),
            }),
          },
        },
        description: "Root endpoint information",
      },
    },
  }),
  (c) => {
    return c.json(
      {
        title: "Lego Game API",
        message: "Test",
      },
      200,
    );
  },
);
