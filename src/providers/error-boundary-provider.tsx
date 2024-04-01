"use client";
import { useRouter } from "next/navigation";
import { ComponentType, ErrorInfo, FC } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import { ErrorFallback } from "@/components/elements/error-fallback";

interface IErrorProvider {
  children: React.ReactNode;
  fallback?: ComponentType<FallbackProps> | undefined;
  onReset?: () => void;
}

export const ErrorBoundaryProvider: FC<IErrorProvider> = ({
  children,
  fallback,
  onReset,
}) => {
  const router = useRouter();

  const logError = (error: Error, info: ErrorInfo) => {
    console.log(error, info);
  };

  return (
    <ErrorBoundary
      FallbackComponent={fallback ?? ErrorFallback}
      onError={logError}
      onReset={() => {
        if (onReset) {
          onReset();
        } else {
          router.refresh();
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
