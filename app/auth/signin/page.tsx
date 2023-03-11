import { SignIn } from "@/features/auth";

const SignInPage = async () => {
  return (
    <div>
      <SignIn />
    </div>
  );
};

export default SignInPage;

export const metadata = {
  title: "Log in to Chirp",
};
