import * as z from "zod";

export const ThreadValidation = z.object({
  thread: z
    .string()
    .min(1, { message: "Minimum 1 character" })
    .max(500, { message: "Maximum 500 characters" }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  thread: z
    .string()
    .min(1, { message: "Minimum 1 character" })
    .max(500, { message: "Maximum 500 characters" }),
});
