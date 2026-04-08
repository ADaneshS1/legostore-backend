import z, { email } from "zod";
import { UserModelSchema } from "../../generated/zod/schemas";
export { UserModelSchema };

export const UserSchema = UserModelSchema.omit({
  password: true,
}).extend({
  username: z.string().openapi({ example: "albert134" }),
  email: z.string().openapi({ example: "albert@example.com" }),
  name: z.string().openapi({ example: "Albert Einstein" }),
});

export const UsersSchema = UserSchema.array();

export type User = z.infer<typeof UserSchema>;
export type Users = z.infer<typeof UsersSchema>;

export const SeedUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const SeedUsersSchema = SeedUserSchema.array();

export type SeedUser = z.infer<typeof SeedUserSchema>;
export type SeedUsers = z.infer<typeof SeedUsersSchema>;
