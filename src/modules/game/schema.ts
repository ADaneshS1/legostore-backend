import { z } from "@hono/zod-openapi";
import { CategorySchema } from "../category/schema"; // Pastikan path ini benar

export const GameSchema = z
  .object({
    id: z.number().int().min(1).openapi({ example: 1 }),
    name: z.string().min(1).openapi({ example: "LEGO® Marvel Super Heroes 2" }),
    slug: z.string().min(1).openapi({ example: "lego-marvel-super-heroes-2" }),
    sku: z.string().min(1).openapi({ example: "LG-MARVEL-02" }),
    price: z.number().positive().openapi({ example: 150000 }),
    stockQuantity: z.number().int().min(0).openapi({ example: 25 }),
    imageUrl: z
      .string()
      .url()
      .nullable() // Database PostgreSQL biasanya mengizinkan null untuk imageUrl
      .openapi({ example: "https://link-your-pic.com/marvel-2.jpg" }),

    // --- TAMBAHKAN DUA BARIS INI ---
    categoryId: z.number().int().nullable().openapi({ example: 1 }),
    category: CategorySchema.nullable().optional(),
    // ------------------------------

    // Perbaikan z.iso.datetime menjadi z.string().datetime()
    createdAt: z.string().datetime().openapi({ format: "date-time" }),
    updatedAt: z.string().datetime().openapi({ format: "date-time" }),
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
