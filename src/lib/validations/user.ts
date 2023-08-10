import * as z from "zod";

export const UserValidation = z.object({
  image: z.string().nonempty(),
  name: z.string().min(3).max(50),
  username: z.string().max(25),
  bio: z.string().max(300),
});
