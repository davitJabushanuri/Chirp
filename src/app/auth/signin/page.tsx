import { getProviders } from "next-auth/react";

import { AuthModal } from "@/features/auth";

const SignIn = async () => {
  const providers = await fetchProviders();

  return (
    <div>
      <AuthModal providers={providers} />
    </div>
  );
};

export default SignIn;

const fetchProviders = async () => {
  const providers = await getProviders();
  return providers;
};
