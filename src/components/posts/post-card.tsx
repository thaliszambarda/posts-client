import { formatDistanceToNow } from "date-fns";
import { Edit, Trash } from "lucide-react";

import { IPost } from "@/api/mocks/crud-posts-mock";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useModal } from "@/contexts/modal.context";
import { useUser } from "@/contexts/user.context";

interface Props {
  post: IPost;
}

export function PostCard({ post }: Props) {
  const { openModal } = useModal();
  const { user } = useUser();
  const isAuthor = user?.name === post.username;

  return (
    <Card className="p-0">
      <CardHeader className="flex flex-row items-center gap-2 bg-[#7695EC] p-4 sm:justify-between">
        <h2 className="max-w-sm text-xl font-bold break-all text-white">
          {post.title}
        </h2>
        {isAuthor && (
          <div className="flex gap-4">
            <Trash
              className="cursor-pointer text-white transition-all duration-300 hover:scale-110 hover:text-red-500"
              onClick={() => openModal("deletePost", { postId: post.id })}
            />
            <Edit
              className="mt-[0.05rem] cursor-pointer text-white transition-all duration-300 hover:scale-110 hover:text-emerald-500"
              onClick={() => openModal("editPost", { post })}
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2 flex justify-between gap-x-4 text-sm text-gray-500">
          <span className="max-w-xs font-bold break-all">@{post.username}</span>
          <span>
            {formatDistanceToNow(new Date(post.created_datetime), {
              addSuffix: true,
            })}
          </span>
        </div>
        <p className="text-base break-words whitespace-pre-wrap">
          {post.content}
        </p>
      </CardContent>
    </Card>
  );
}
