import Link from "next/link";

import { Avatar } from "@/components/designs/avatar";

export const UserAvatar = ({
  userId,
  userImage,
  width = 38,
  height = 38,
}: {
  userId?: string | undefined;
  userImage: string | null;
  width?: number;
  height?: number;
}) => {
  return (
    <Link href={`/${userId}`}>
      <Avatar userImage={userImage} height={width} width={height} />
    </Link>
  );
};
