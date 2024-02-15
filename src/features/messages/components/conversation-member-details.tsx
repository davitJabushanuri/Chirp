import Link from "next/link";

import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import {
  Avatar,
  IUser,
  UserJoinDate,
  UserName,
  UserScreenName,
} from "@/features/profile";
import { cn } from "@/utils/cn";

export const ConversationMemberDetails = ({
  user,
}: {
  user: IUser | undefined;
}) => {
  return (
    <Link
      href={`/${user?.id}`}
      className={cn(
        "mx-[1em] mt-[2px] grid cursor-pointer place-items-center rounded-sm border-b-[1px] border-neutral-600 p-[1em] text-center",
        "transition-colors duration-200 ease-in-out",
        "hover:bg-neutral-200 focus-visible:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary-100",
      )}
    >
      <Avatar
        userImage={user?.profile_image_url ?? ""}
        className="w-[calc(var(--tw-fs-kilo)*2)]"
      />
      <UserName name={user?.name} isVerified={user?.verified} hover={true} />
      <EllipsisWrapper>
        <UserScreenName screenName={user?.email?.split("@")[0]} />
      </EllipsisWrapper>
      {user?.description && (
        <div className="my-[1em] text-base">
          <p>{user?.description}</p>
        </div>
      )}

      <div className="my-[0.6em] flex items-center gap-1 text-micro text-tertiary-100">
        <UserJoinDate showIcon={false} date={user?.created_at} />
        <span>·</span>
        <span>{user?.followers?.length ?? 0} Followers</span>
      </div>

      <p className="mb-[4rem] text-nano text-tertiary-100">
        Not followed by anyone you&apos;re following
      </p>
    </Link>
  );
};
