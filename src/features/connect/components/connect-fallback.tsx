import { FC } from "react";

import { Button } from "@/components/elements/button";
import { IErrorFallback } from "@/components/elements/error-fallback/error-fallback";
import { ReloadIcon } from "@/components/elements/try-again/assets/reload-icon";

export const ConnectFallback: FC<IErrorFallback> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="p-4 text-center text-milli text-tertiary-100">
      <p className="mb-4">{error.message}</p>
      <Button
        className="m-auto flex gap-2 bg-primary-100 px-4 text-milli font-semibold text-white-100 outline-offset-2 hover:bg-primary-200 active:bg-primary-300"
        onClick={resetErrorBoundary}
      >
        <ReloadIcon />
        Retry
      </Button>
    </div>
  );
};
