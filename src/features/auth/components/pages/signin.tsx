import { AuthModal } from "../auth-modal";
import { LoginForm } from "../login-form";

export const SignIn = () => {
  return (
    <AuthModal>
      <LoginForm />
    </AuthModal>
  );
};
