"use client";
import { useRouter } from "next/navigation";

import { Modal } from "@/components/elements/modal";

import { SignInModal } from "./sign-in-modal";

export const SignIn = () => {
  const router = useRouter();

  return (
    <Modal
      onClose={() => router.back()}
      disableScroll={true}
      closeOnBackdropClick={false}
      background="var(--clr-modal-background)"
    >
      <SignInModal onClose={() => router.back()} />
    </Modal>
  );
};
