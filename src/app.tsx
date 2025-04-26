import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import { ModalProvider } from "./contexts/modal.context";
import { UserProvider } from "./contexts/user.context";
import { Providers } from "./providers";
import { router } from "./routes";

const queryClient = new QueryClient();

export function App() {
  return (
    <UserProvider>
      <ModalProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Providers />
        </QueryClientProvider>
      </ModalProvider>
    </UserProvider>
  );
}
