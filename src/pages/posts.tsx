import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PostForm } from "@/components/posts/post-form";
import { PostsList } from "@/components/posts/post-list";
import { SortControls } from "@/components/posts/sort-controls";
import { useUser } from "@/contexts/user.context";

export default function PostsPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [sortBy, setSortBy] = useState<"created_datetime" | "title">(
    "created_datetime"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    if (!user?.name) navigate("/");
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen w-full max-w-[800px] flex-col gap-6 bg-white pb-6">
      <header className="w-full bg-[#7695EC] px-8 py-7">
        <h1 className="text-2xl font-bold text-white">CodeLeap Network</h1>
      </header>

      <div className="flex flex-col gap-6 px-6">
        <PostForm sortBy={sortBy} sortOrder={sortOrder} />
        <SortControls
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortByChange={(value) => setSortBy(value as never)}
          onSortOrderToggle={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        />
        <PostsList sortBy={sortBy} sortOrder={sortOrder} />
      </div>
    </div>
  );
}
