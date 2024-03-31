"use client";
import { useRouter } from "next/navigation";
import { ErrorInfo, FC } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { ErrorFallback } from "@/components/elements/error-fallback";

interface IErrorProvider {
  children: React.ReactNode;
}

export const ErrorBoundaryProvider: FC<IErrorProvider> = ({ children }) => {
  const router = useRouter();

  const logError = (error: Error, info: ErrorInfo) => {
    console.log(error, info);
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logError}
      onReset={() => {
        router.refresh();
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
