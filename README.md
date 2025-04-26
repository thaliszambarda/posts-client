# Front-end Challenge – Post CRUD

## Table of Contents

- [Overview](#overview)
  - [Features](#features)
  - [Demo](#demo)
  - [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Build](#build)
  - [Preview Production](#preview-production)
- [Author](#author)

---

## Overview

This challenge consists of building a complete front-end for managing posts with user identification, full CRUD functionality, infinite scrolling, and local storage persistence. The UI is user-friendly and reactive, supporting optimistic updates and intelligent cache invalidation using `react-query`.

---

### Features

1. **Authentication**
   - [x] User can set a username to identify themselves.
   - [x] Username is stored in state global and persisted across sessions.
   - [x] If the username is not set, navigation to protected routes like `/posts` redirects back to `/` using `useEffect`.

2. **Create Post**
   - [x] Users can create a new post by submitting a form.
   - [x] The post includes the title, content, author, and timestamp.
   - [x] Form inputs are cleared after submission and the button is disabled when the form is invalid or loading.
   - [x] Uses `useMutation` from `react-query` to send POST requests via Axios.
   - [x] After a successful mutation, the post list is automatically updated via `invalidateQueries`.

3. **Read / List Posts**
   - [x] Posts are fetched using `react-query`'s `useInfiniteQuery`.
   - [x] Implements **infinite scrolling** – more posts are loaded as the user scrolls down.
   - [x] Posts show title, content, author, and relative date (e.g., “2 minutes ago”) using `date-fns`.
   - [x] Only posts authored by the current user will show **Edit** and **Delete** actions.

4. **Update Post**
   - [x] Users can edit their own posts.
   - [x] The editing interface is simple and reuses the post structure.
   - [x] Upon save, posts are updated in `localStorage` and UI is refreshed.
   - [x] Optimistic UI updates handled via `react-query`.

5. **Delete Post**
   - [x] Users can delete their own posts.
   - [x] A confirmation step ensures posts aren't removed accidentally.
   - [x] The deleted post is removed from both `localStorage` and the cache.

6. **State Management & API Handling**
   - [x] `axios` is used to make API requests with a base URL from `.env`.
   - [x] Includes an optional delay interceptor for simulating slow networks (via `setTimeout`).
   - [x] All interactions are tracked and cached via `react-query` (TanStack Query).

7. **Routing & Error Handling**
   - [x] Uses `react-router-dom` for managing routes.
   - [x] Shared layout handled via `AppLayout`.
   - [x] Includes custom error boundary (`/error`) and 404 Not Found page.

---

### Demo
- 🧪 Project: [Live preview](https://thaliszambarda-posts.vercel.app)

---

### Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **React Query (TanStack Query)**
- **React Router DOM**
- **Axios**
- **date-fns**
- **localStorage**
- **ESLint + Prettier**
- **Shadcn UI**

---

## Getting Started

### Prerequisites

- Node.js v20+
- npm
- ESLint extension for your code editor
- Create a `.env` file based on `.env.example`

### Installation

Clone the project repository to your machine:

Using HTTPS:

```bash
git clone https://github.com/thaliszambarda/posts-client.git
```

Using GitHub CLI:

```bash
gh repo clone thaliszambarda/posts-client
```

Navigate to the project directory:

```bash
cd posts-client
```

Install dependencies:

```bash
npm install
```

---

### Development

To run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

### Build

To build the project for production:

```bash
npm run build
```

A minified and optimized version of the app will be created inside the `dist` folder.

---

### Preview Production

To preview the production build:

```bash
npm run preview
```

The preview server will be available at `http://localhost:4173`.

---

## Author

- GitHub — [Thalis Zambarda](https://github.com/thaliszambarda)
- LinkedIn — [Thalis Zambarda](https://www.linkedin.com/in/thalis-zambarda/)



