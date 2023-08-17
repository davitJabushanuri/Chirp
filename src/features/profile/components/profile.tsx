"use client";
import { usePathname } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import {
  IUser,
  ProfileInfo,
  ProfileNavigation,
  useUser,
} from "@/features/profile";

export const Profile = ({ initialUser }: { initialUser: IUser }) => {
  const pathname = usePathname();
  const id = pathname?.split("/")[1];

  const {
    data: user,
    isLoading,
    isError,
  } = useUser({
    id,
    initialData: initialUser,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <TryAgain />;
  }

  return (
    <>
      <ProfileInfo user={user} id={id} />
      <ProfileNavigation id={id} pathname={pathname} />
    </>
  );
};
