"use client";
import { useRouter } from "next/navigation";

import { Modal } from "@/components/elements/modal";
import { SignOutModal } from "@/features/auth";

export const SignOut = () => {
  const router = useRouter();

  return (
    <Modal
      onClose={() => router.back()}
      disableScroll={true}
      background={`var(--clr-modal-background)`}
      closeOnBackdropClick={true}
    >
      <SignOutModal onClose={() => router.back()} />
    </Modal>
  );
};
