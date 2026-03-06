import { z } from "@hono/zod-openapi";
import { CategorySchema } from "../category/schema"; // Pastikan path ini benar

export const GameSchema = z
  .object({
    id: z.string().openapi({ example: "abc" }),
    name: z.string().min(1).openapi({ example: "LEGO® Marvel Super Heroes 2" }),
    slug: z.string().min(1).openapi({ example: "lego-marvel-super-heroes-2" }),
    sku: z.string().min(1).openapi({ example: "LG-MARVEL-02" }),
    price: z.number().positive().openapi({ example: 150000 }),
    stockQuantity: z.number().int().min(0).openapi({ example: 25 }),
    imageUrl: z
      .url()
      .nullable()
      .openapi({ example: "https://link-your-pic.com/marvel-2.jpg" }),

    categoryId: z.string().nullable().openapi({ example: 1 }),
    category: CategorySchema.nullable(),

    createdAt: z.iso.datetime().openapi({ format: "date-time" }),
    updatedAt: z.iso.datetime().openapi({ format: "date-time" }),
  })
  .openapi("LegoGame");

export const GamesSchema = z.array(GameSchema);

export const GameCreateSchema = GameSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  category: true, // Hilangkan dari input create
  categoryId: true, // Hilangkan dari input create, kita pakai slug
})
  .extend({
    categorySlug: z.string().min(1).openapi({ example: "marvel" }),
  })
  .openapi("LegoGameCreate");

export const GameUpdateSchema =
  GameCreateSchema.partial().openapi("GameUpdate");

export const SeedGameSchema = GameCreateSchema.extend({
  categorySlug: z.string().min(1),
});

export type LegoGame = z.infer<typeof GameSchema>;
export type GameCreateInput = z.infer<typeof GameCreateSchema>;
export type GameUpdateInput = z.infer<typeof GameUpdateSchema>;
export type SeedGame = z.infer<typeof SeedGameSchema>;
