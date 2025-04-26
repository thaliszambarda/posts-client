import {
  createPostMock,
  deletePostMock,
  getPostByIdMock,
  getPostsMock,
  updatePostMock,
} from "./crud-posts-mock";

export const handlers = [
  getPostsMock,
  getPostByIdMock,
  createPostMock,
  updatePostMock,
  deletePostMock,
];
