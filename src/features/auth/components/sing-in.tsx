"use client";
import { useRouter } from "next/navigation";

import { Modal } from "@/components/elements/modal";

import { LoginForm } from "..";

export const SignIn = () => {
  const router = useRouter();

  return (
    <Modal
      onClose={() => router.back()}
      disableScroll={true}
      closeOnBackdropClick={false}
      background="var(--clr-modal-background)"
    >
      <LoginForm onClose={() => router.back()} />
    </Modal>
  );
};
