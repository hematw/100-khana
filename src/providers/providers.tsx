import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../components/ui/sonner";

const queryClient = new QueryClient();

function Providers({ children }: React.PropsWithChildren) {
  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}

export default Providers;
