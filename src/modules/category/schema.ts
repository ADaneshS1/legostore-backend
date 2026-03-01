import { z } from "@hono/zod-openapi";

export const CategorySchema = z
  .object({
    id: z.number().int().openapi({ example: 1 }),
    name: z.string().min(1).openapi({ example: "Marvel" }),
    slug: z.string().min(1).openapi({ example: "marvel" }),
    createdAt: z.date().openapi({ format: "date-time" }),
    updatedAt: z.date().openapi({ format: "date-time" }),
  })
  .openapi("LegoCategory");

export const CategoriesSchema = z.array(CategorySchema);

export const CategoryCreateSchema = CategorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).openapi("LegoCategoryCreate");

export const CategoryUpdateSchema =
  CategoryCreateSchema.partial().openapi("CategoryUpdate");

export const SeedCategorySchema = CategoryCreateSchema.extend({
  // Tambahkan field khusus seed jika diperlukan
});

export type LegoCategory = z.infer<typeof CategorySchema>;
export type CategoryCreateInput = z.infer<typeof CategoryCreateSchema>;
export type CategoryUpdateInput = z.infer<typeof CategoryUpdateSchema>;
export type SeedCategory = z.infer<typeof SeedCategorySchema>;
