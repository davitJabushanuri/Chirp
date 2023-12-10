"use client";
import { signOut } from "next-auth/react";

import { TwitterLogo } from "@/assets/twitter-logo";
import { ConfirmationModal } from "@/components/elements/modal";

export const SignOutModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <ConfirmationModal
      heading="Log out of Twitter?"
      paragraph="You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account."
      confirmButtonText="Log out"
      confirmButtonClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
      confirmButtonStyle="delete"
      cancelButtonText="Cancel"
      cancelButtonClick={onClose}
      logo={<TwitterLogo />}
    />
  );
};
