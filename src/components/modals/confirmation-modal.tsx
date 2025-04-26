import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { api } from "@/api";
import { useModal } from "@/contexts/modal.context";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const ConfirmationModal = () => {
  const { isModalOpen, closeModal, modalData } = useModal();
  const queryClient = useQueryClient();
  const postId = modalData?.postId;

  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: async () => {
      if (!postId) throw new Error("Post ID is required");
      await api.delete(`/api/posts/${postId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      closeModal();
      toast.success("Post deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting post");
    },
  });

  const handleDelete = () => {
    deletePost();
  };

  return (
    <Dialog open={isModalOpen("deletePost")} onOpenChange={closeModal}>
      <DialogContent className="gap-10" aria-describedby="delete-post">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Are you sure want to delete this item?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="gap-4">
          <Button variant="ghost" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
