import z from "zod";
import { UserSchema } from "../user/schema";

export const RegisterNewUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  password: z.string().openapi({ example: "asjjsa22" }),
});

export const LoginUserSchema = RegisterNewUserSchema.omit({
  username: true,
  name: true,
});

export const LoginResponseSchema = z.object({
  token: z.string(),
  user: UserSchema,
});

export type RegisterNewUser = z.infer<typeof RegisterNewUserSchema>;
export type LoginUser = z.infer<typeof LoginUserSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
