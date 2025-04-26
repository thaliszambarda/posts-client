import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { api } from "@/api";
import type { IPost } from "@/api/mocks/crud-posts-mock";
import { useModal } from "@/contexts/modal.context";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export const EditModal = () => {
  const { isModalOpen, closeModal, modalData } = useModal();
  const queryClient = useQueryClient();
  const post = modalData?.post as IPost | undefined;
  const [isDisabled, setIsDisabled] = useState(true);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (
      isModalOpen("editPost") &&
      post &&
      titleRef.current &&
      contentRef.current
    ) {
      titleRef.current.value = post.title;
      contentRef.current.value = post.content;

      const title = post.title.trim();
      const content = post.content.trim();
      setIsDisabled(!(title && content));
    }
  }, [isModalOpen, post]);

  const handleChange = () => {
    const title = titleRef.current?.value.trim();
    const content = contentRef.current?.value.trim();
    setIsDisabled(!(title && content));
  };

  const { mutate: updatePost, isPending } = useMutation({
    mutationFn: async (updatedPost: Partial<IPost>) => {
      if (!post?.id) throw new Error("Post ID is required");
      await api.put(`/api/posts/${post.id}`, updatedPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      closeModal();
      toast.success("Post updated successfully");
    },
    onError: () => {
      toast.error("Error updating post");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const title = titleRef.current?.value.trim();
    const content = contentRef.current?.value.trim();
    if (!title || !content || !post) return;
    updatePost({ title, content });
  };

  return (
    <Dialog open={isModalOpen("editPost")} onOpenChange={closeModal}>
      <DialogContent
        className="gap-6"
        aria-describedby="edit-modal-description"
      >
        <DialogTitle className="text-2xl font-bold">Edit Post</DialogTitle>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="edit-title" className="text-base font-normal">
              Title
            </label>
            <Input
              id="edit-title"
              placeholder="Hello world"
              ref={titleRef}
              onChange={handleChange}
              defaultValue={post?.title || ""}
            />
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="edit-content" className="text-base font-normal">
              Content
            </label>
            <Textarea
              id="edit-content"
              placeholder="Content here"
              ref={contentRef}
              onChange={handleChange}
              defaultValue={post?.content || ""}
            />
          </fieldset>
          <DialogFooter className="gap-4">
            <Button type="button" variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              className="bg-[#47B960] hover:bg-[#47B960]/90"
              type="submit"
              disabled={isDisabled || isPending}
            >
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
