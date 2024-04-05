"use client";
import axios from "axios";
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

  const logError = async (error: Error, info: ErrorInfo) => {
    const stackLines = error.stack?.split("\n") ?? [];
    const errorStack = stackLines.slice(0, 5).join("\n");
    const componentStack = info.componentStack?.split("html")[0] + "html";

    // only log the error if NODE_ENV is production

    if (process.env.NODE_ENV !== "production") return;

    try {
      await axios.post("/api/error", {
        name: error.name,
        message: error.message,
        error_stack: errorStack,
        component_stack: componentStack,
      });
    } catch (error) {
      throw new Error("Error submitting error");
    }
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
