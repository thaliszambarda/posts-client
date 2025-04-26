import { http, HttpResponse } from "msw";

export interface IPost {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}

type SortField = "created_datetime" | "title";
type SortOrder = "asc" | "desc";

const STORAGE_KEY = "posts";

const getInitialData = (): IPost[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

let posts: IPost[] = getInitialData();

const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

export const getPostsMock = http.get<
  never,
  { posts: IPost[]; hasMore: boolean }
>("/api/posts", async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");
  const sortBy =
    (url.searchParams.get("sortBy") as SortField) || "created_datetime";
  const sortOrder = (url.searchParams.get("sortOrder") as SortOrder) || "desc";

  let sortedPosts = [...posts];

  sortedPosts.sort((a, b) => {
    if (sortBy === "created_datetime") {
      const dateA = new Date(a.created_datetime).getTime();
      const dateB = new Date(b.created_datetime).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortBy === "title") {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      return sortOrder === "asc"
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    }
    return 0;
  });

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);
  const hasMore = endIndex < sortedPosts.length;

  return HttpResponse.json({
    posts: paginatedPosts,
    hasMore,
  });
});

export const getPostByIdMock = http.get<{ id: string }, IPost>(
  "/api/posts/:id",
  async ({ params }) => {
    const id = Number(params.id);
    const post = posts.find((p) => p.id === id);

    if (!post) {
      return HttpResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return HttpResponse.json(post);
  }
);

export const createPostMock = http.post<never, IPost>(
  "/api/posts",
  async ({ request }) => {
    const newPost = await request.json();
    const createdPost: IPost = {
      ...newPost,
      id: Date.now(),
      // eslint-disable-next-line camelcase
      created_datetime: new Date().toISOString(),
    };

    posts.unshift(createdPost);
    saveToLocalStorage();

    return HttpResponse.json(createdPost, { status: 201 });
  }
);

export const updatePostMock = http.put<{ id: string }, IPost>(
  "/api/posts/:id",
  async ({ params, request }) => {
    const id = Number(params.id);
    const updated = await request.json();
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) {
      return HttpResponse.json({ message: "Post not found" }, { status: 404 });
    }

    posts[index] = {
      ...posts[index],
      ...updated,
    };

    saveToLocalStorage();

    return HttpResponse.json(posts[index]);
  }
);

export const deletePostMock = http.delete<{ id: string }, never>(
  "/api/posts/:id",
  async ({ params }) => {
    const id = Number(params.id);
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) {
      return HttpResponse.json({ message: "Post not found" }, { status: 404 });
    }

    posts.splice(index, 1);
    saveToLocalStorage();

    return new HttpResponse(null, { status: 204 });
  }
);
