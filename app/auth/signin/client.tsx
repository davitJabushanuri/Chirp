"use client";

import { AuthModal, LoginForm } from "@/features/auth";

export const SignInClientPage = () => {
  return (
    <AuthModal>
      <LoginForm />
    </AuthModal>
  );
};
