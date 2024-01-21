import { usePathname, useRouter } from "next/navigation";

import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseButton } from "@/components/elements/close-button";
import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import { Avatar, LinkToProfile, UserName } from "@/features/profile";

import { InfoIcon } from "../assets/info-icon";

import styles from "./styles/conversation-header.module.scss";

export const ConversationHeader = ({
  user_id,
  user_name,
  user_image,
  isVerified,
}: {
  user_id?: string | undefined;
  user_name?: string | undefined;
  user_image?: string | null | undefined;
  isVerified?: boolean | undefined;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname?.split("/")[2];

  return (
    <div className={styles.container}>
      <CloseButton
        onClick={() => {
          router.push(`/messages`);
        }}
        ariaLabel="Back"
        title="Back"
      >
        <BackArrowIcon />
      </CloseButton>

      {user_name && (
        <div className={styles.memberDetails}>
          <LinkToProfile userId={user_id}>
            <Avatar userImage={user_image || ""} />
          </LinkToProfile>
          <EllipsisWrapper>
            <UserName name={user_name} isVerified={isVerified} />
          </EllipsisWrapper>
        </div>
      )}

      <button
        onClick={() => router.push(`/messages/${id}/info`)}
        className={styles.details}
        aria-label={`Conversation info`}
        data-title={`Details`}
      >
        <InfoIcon />
      </button>
    </div>
  );
};
