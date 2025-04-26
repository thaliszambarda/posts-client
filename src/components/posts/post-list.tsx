import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { api } from "@/api";
import type { IPost } from "@/api/mocks/crud-posts-mock";
import { Skeleton } from "@/components/ui/skeleton";

import { PostCard } from "./post-card";

interface PostsResponse {
  posts: IPost[];
  hasMore: boolean;
}

interface Props {
  sortBy: string;
  sortOrder: string;
}

export function PostsList({ sortBy, sortOrder }: Props) {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["posts", sortBy, sortOrder],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get<PostsResponse>(
        `/api/posts?page=${pageParam}&limit=2&sortBy=${sortBy}&sortOrder=${sortOrder}`
      );
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.hasMore ? lastPageParam + 1 : undefined,
  });

  useEffect(() => {
    if (loadMoreRef.current && !observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 0.5 }
      );

      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    refetch();
  }, [sortBy, sortOrder, refetch]);

  const allPosts = data?.pages.flatMap((p) => p.posts) || [];

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, i) => (
          <div className="p-6" key={i}>
            <Skeleton className="mb-4 h-6 w-1/2" />
            <Skeleton className="mb-2 h-4 w-1/3" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </>
    );
  }

  if (allPosts.length === 0) {
    return (
      <div className="py-12 text-center text-lg text-gray-500">
        No posts found
      </div>
    );
  }

  return (
    <>
      {allPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <div ref={loadMoreRef} className="my-4 flex justify-center">
        {isFetchingNextPage && (
          <div className="flex flex-col items-center gap-2">
            <div className="size-8 animate-spin rounded-full border-4 border-[#7695EC] border-t-transparent" />
            <p className="text-sm text-gray-500">Loading more posts...</p>
          </div>
        )}
      </div>
    </>
  );
}
