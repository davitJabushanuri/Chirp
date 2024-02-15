import { usePathname, useRouter } from "next/navigation";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { Button } from "@/components/elements/button";
import { Tooltip } from "@/components/elements/tooltip";
import { Avatar, LinkToProfile, UserName } from "@/features/profile";

import { InfoIcon } from "../assets/info-icon";

export const ConversationHeader = ({
  user_id,
  user_name,
  user_image,
  isVerified,
  inView,
}: {
  user_id?: string | undefined;
  user_name?: string | undefined;
  user_image?: string | null | undefined;
  isVerified?: boolean | undefined;
  inView?: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split("/")[2];

  return (
    <div className="flex items-center gap-4 p-[0.5em]">
      <div className="flex flex-1 items-center gap-3">
        <Tooltip text="Back">
          <Button
            onClick={() => {
              router.back();
            }}
            aria-label="Back"
            className="hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600"
          >
            <BackArrowIcon />
          </Button>
        </Tooltip>

        {user_name && (
          <>
            {!inView && (
              <div className="rounded-full has-[:focus]:outline has-[:focus]:outline-2 has-[:focus]:outline-primary-100">
                <LinkToProfile userId={user_id}>
                  <Avatar
                    userImage={user_image || ""}
                    className="w-[var(--tw-fs-kilo)]"
                  />
                </LinkToProfile>
              </div>
            )}
            <UserName name={user_name} isVerified={isVerified} />
          </>
        )}
      </div>

      <Tooltip text="Details">
        <Button
          onClick={() => router.push(`/messages/${id}/info`)}
          className="hover:bg-neutral-500 focus-visible:bg-neutral-500 focus-visible:outline-secondary-100 active:bg-neutral-600"
          aria-label="Conversation info"
        >
          <InfoIcon />
        </Button>
      </Tooltip>
    </div>
  );
};
