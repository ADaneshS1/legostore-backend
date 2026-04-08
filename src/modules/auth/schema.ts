import z from "zod";
import { UserSchema } from "../user/schema";

export const RegisterNewUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  password: z.string().openapi({ example: "******" }),
});

export type RegisterNewUser = z.infer<typeof RegisterNewUserSchema>;
