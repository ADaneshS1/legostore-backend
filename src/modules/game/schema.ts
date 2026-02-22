import { z } from "@hono/zod-openapi";

export const GameSchema = z
  .object({
    id: z.string().min(1).openapi({ example: "LEGO-001" }),
    name: z.string().min(1).openapi({ example: "LEGO® Marvel Super Heroes 2" }),
    slug: z.string().min(1).openapi({ example: "lego-marvel-super-heroes-2" }),
    sku: z.string().min(1).openapi({ example: "LG-MARVEL-02" }),
    price: z.number().positive().openapi({ example: 150000 }),
    stockQuantity: z.number().int().min(0).openapi({ example: 25 }),
    imageUrl: z
      .string()
      .url()
      .openapi({ example: "https://link-your-pic.com/marvel-2.jpg" }),
    createdAt: z.iso.datetime().openapi({ format: "date-time" }),
    updatedAt: z.iso.datetime().openapi({ format: "date-time" }),
  })
  .openapi("LegoGame");

export const GamesSchema = z.array(GameSchema);

export const GameCreateSchema = GameSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).openapi("LegoGameCreate");

export const GameUpdateSchema =
  GameCreateSchema.partial().openapi("GameUpdate");

export const SeedGameSchema = GameCreateSchema.extend({
  // Anda bisa menambahkan field khusus seed di sini jika diperlukan
});

export type LegoGame = z.infer<typeof GameSchema>;
export type GameCreateInput = z.infer<typeof GameCreateSchema>;
export type GameUpdateInput = z.infer<typeof GameUpdateSchema>;
export type SeedGame = z.infer<typeof SeedGameSchema>;
