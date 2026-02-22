import { z } from "@hono/zod-openapi";

export const legoGameSchema = z
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
    createdAt: z.string().datetime().openapi({ format: "date-time" }),
    updatedAt: z.string().datetime().openapi({ format: "date-time" }),
  })
  .openapi("LegoGame");

export const legoGameCreateSchema = legoGameSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .openapi("LegoGameCreate");

export const legoGameUpdateSchema = legoGameCreateSchema
  .partial()
  .openapi("LegoGameUpdate");

export const SeedLegoGameSchema = legoGameCreateSchema.extend({
  // Anda bisa menambahkan field khusus seed di sini jika diperlukan
});

export type LegoGame = z.infer<typeof legoGameSchema>;
export type LegoGameCreateInput = z.infer<typeof legoGameCreateSchema>;
export type LegoGameUpdateInput = z.infer<typeof legoGameUpdateSchema>;
export type SeedLegoGame = z.infer<typeof SeedLegoGameSchema>;
