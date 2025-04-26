import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

import { api } from "@/api";
import type { IPost } from "@/api/mocks/crud-posts-mock";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/contexts/user.context";

interface Props {
  sortBy: string;
  sortOrder: string;
}

export function PostForm({ sortBy, sortOrder }: Props) {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = () => {
    const title = titleRef.current?.value.trim();
    const content = contentRef.current?.value.trim();
    setIsDisabled(!(title && content));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      title,
      content,
      username,
    }: Omit<IPost, "id" | "created_datetime">) => {
      await api.post("/api/posts", { title, content, username });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", sortBy, sortOrder] });
      titleRef.current!.value = "";
      contentRef.current!.value = "";
      setIsDisabled(true);
      toast.success("Post created successfully");
    },
    onError: () => {
      toast.error("Error creating post");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const title = titleRef.current?.value || "";
    const content = contentRef.current?.value || "";
    if (!title || !content) return;

    mutate({ title, content, username: user.name });
  };

  return (
    <Card>
      <header>
        <h1 className="text-2xl font-bold">What&apos;s on your mind?</h1>
      </header>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <fieldset className="flex flex-col gap-2">
          <label htmlFor="post-title">Title</label>
          <Input
            maxLength={50}
            id="post-title"
            ref={titleRef}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <label htmlFor="post-content">Content</label>
          <Textarea
            id="post-content"
            ref={contentRef}
            onChange={handleChange}
          />
        </fieldset>

        <Button
          type="submit"
          className="mt-2 self-end"
          disabled={isDisabled || isPending}
        >
          {isPending ? (
            <div className="size-6 animate-spin rounded-full border-4 border-white border-t-transparent" />
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </Card>
  );
}
