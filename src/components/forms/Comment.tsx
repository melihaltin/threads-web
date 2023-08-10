"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useUploadThing } from "@/lib/uploadThing";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentValidation } from "@/lib/validations/thread";
import { z } from "zod";
import Image from "next/image";
import { addComment } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  currentUserImage: string;
  currentUserId: string;
}

const Comment = ({ threadId, currentUserImage, currentUserId }: Props) => {
  const pathname = usePathname();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addComment(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    );

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                <Image
                  src={currentUserImage}
                  alt="profile photo"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </FormLabel>
              <FormControl
                placeholder="Comment..."
                className="no-focus border border-dark-4 bg-dark-3 text-light-1"
              >
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Comment
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
