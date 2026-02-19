import { z } from "zod";

export const legoGameSchema = z.object({
  id: z.string().min(1), // Karena contoh ID Anda "LEGO-001"
  name: z.string().min(1),
  slug: z.string().min(1),
  sku: z.string().min(1),
  price: z.number().positive(),
  stockQuantity: z.number().int().min(0),
  imageUrl: z.string().url(),
  createdAt: z.string().datetime(), // Tambahkan ini
  updatedAt: z.string().datetime(), // Tambahkan ini
});

export const legoGameCreateSchema = legoGameSchema.omit({
  id: true,
});

export const legoGameUpdateSchema = legoGameSchema.partial();

export type LegoGame = z.infer<typeof legoGameSchema>;
export type LegoGameCreateInput = z.infer<typeof legoGameCreateSchema>;
export type LegoGameUpdateInput = z.infer<typeof legoGameUpdateSchema>;
