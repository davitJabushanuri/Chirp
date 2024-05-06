"use client";
import { useState } from "react";
import type { ErrorLog } from "@prisma/client";

import { Button } from "@/components/elements/button";

export const Log = ({ log }: { log: ErrorLog }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isComponentStackOpen, setIsComponentStackOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full gap-2 rounded-md bg-neutral-400 hover:bg-neutral-500 active:bg-neutral-600"
        key={log.id}
      >
        <span>{log.createdAt.toISOString()}</span>
        <span>{log.name}</span>
      </Button>

      {isOpen && (
        <div className="mt-2 flex flex-col gap-2 break-words rounded-md bg-neutral-200">
          <span className="border-b-[1px] p-2"> Message: {log.message}</span>
          <span className="border-b-[1px] p-2">
            Error stack: {log.error_stack}
          </span>

          <Button
            onClick={() => setIsComponentStackOpen(!isComponentStackOpen)}
            className="m-2 bg-neutral-400"
          >
            Show Component stack
          </Button>
          {isComponentStackOpen && (
            <span className="p-2">{log.component_stack}</span>
          )}
        </div>
      )}
    </div>
  );
};
