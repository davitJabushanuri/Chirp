import { FC } from "react";

import { SocketProvider } from "@/contexts/socket";

import { NextAuthProvider } from "./next-auth-provider";
import { ReactQueryProvider } from "./react-query-provider";

type AppProvidersProps = {
  children: React.ReactNode;
};

export const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    <NextAuthProvider>
      <ReactQueryProvider>
        <SocketProvider>{children}</SocketProvider>;
      </ReactQueryProvider>
    </NextAuthProvider>
  );
};
