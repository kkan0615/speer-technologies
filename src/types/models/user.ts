import { users } from "../../db/schema";

export type RegisterUser = Pick<typeof users.$inferSelect, 'email' | 'password'>
export type LoginUser = Pick<typeof users.$inferSelect, 'email' | 'password'>