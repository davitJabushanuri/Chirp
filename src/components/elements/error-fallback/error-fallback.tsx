"use client";
import { FC } from "react";
import { createPortal } from "react-dom";

import { Button } from "../button";
import { ReloadIcon } from "../try-again/assets/reload-icon";

interface IErrorFallback {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: FC<IErrorFallback> = ({
  error,
  resetErrorBoundary,
}) => {
  return createPortal(
    <div className="fixed inset-0 z-fixed flex flex-col items-center justify-center bg-background">
      <p className="mb-5 text-milli text-tertiary-100">{error.message}</p>
      <Button
        className="flex gap-2 bg-primary-100 px-4 text-milli font-semibold outline-offset-2 hover:bg-primary-200 active:bg-primary-300"
        onClick={resetErrorBoundary}
      >
        <ReloadIcon />
        Retry
      </Button>
    </div>,
    document.body,
  );
};
