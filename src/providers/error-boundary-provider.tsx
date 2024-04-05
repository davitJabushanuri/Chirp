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

  const logError = (error: Error, info: ErrorInfo) => {
    const stackLines = error.stack?.split("\n") ?? [];
    const errorStack = stackLines.slice(0, 5).join("\n");
    const componentStack = info.componentStack?.split("html")[0] + "html";

    submitError({
      name: error.name,
      message: error.message,
      error_stack: errorStack,
      component_stack: componentStack,
    });
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

const submitError = async ({
  name,
  message,
  error_stack,
  component_stack,
}: {
  name: string;
  message: string;
  error_stack: string;
  component_stack: string;
}) => {
  try {
    await axios.post("/api/error", {
      name,
      message,
      error_stack,
      component_stack,
    });
  } catch (error) {
    throw new Error("Error submitting error");
  }
};
