"use client";
import { useRouter } from "next/navigation";

import { Gear } from "@/assets/gear-icon";
import { Button } from "@/components/elements/button";
import { HamburgerButton } from "@/components/elements/hamburger-button";
import { Tooltip } from "@/components/elements/tooltip";

import { Header } from "./header";

export const NotificationsHeader = () => {
  const router = useRouter();

  return (
    <Header>
      <HamburgerButton />
      <h2>Notifications</h2>

      <div className="ml-auto">
        <Tooltip text="Settings">
          <Button
            role="link"
            onClick={() => {
              router.push(`/settings/notifications`);
            }}
            aria-label="Settings"
            className="hover:bg-neutral-500/80 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100  active:bg-neutral-600"
          >
            <Gear />
          </Button>
        </Tooltip>
      </div>
    </Header>
  );
};
