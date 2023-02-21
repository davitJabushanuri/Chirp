import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { FollowButton } from "@/components/elements/follow-button";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import {
  UserAvatar,
  UserModalWrapper,
  UserName,
  UserScreenName,
} from "@/features/profile";

import { useGetConversation } from "../../hooks/use-get-conversation";

import { ConversationInfoHeader } from "./conversation-info-header";
import styles from "./styles/conversation-info.module.scss";

export const ConversationInfo = () => {
  const pathname = usePathname();
  const id = pathname?.split("/")[2];
  const { data: session } = useSession();

  const { data: conversation, isLoading, isError } = useGetConversation(id);

  return (
    <div className={styles.container}>
      <ConversationInfoHeader />
      {isLoading ? (
        <LoadingSpinner />
      ) : isError ? (
        <TryAgain />
      ) : (
        <div className={styles.members}>
          {conversation?.users
            ?.filter((member) => member.id !== session?.user.id)
            ?.map((member) => {
              return (
                <div className={styles.member} key={member.id}>
                  <UserModalWrapper userId={member?.id}>
                    <UserAvatar
                      userId={member?.id}
                      userImage={member?.profile_image_url}
                    />
                  </UserModalWrapper>

                  <div className={styles.name}>
                    <UserModalWrapper userId={member?.id}>
                      <UserName
                        userId={member?.id}
                        name={member?.name}
                        isVerified={member?.verified}
                      />
                    </UserModalWrapper>

                    <UserModalWrapper userId={member?.id}>
                      <UserScreenName
                        userId={member?.id}
                        screenName={member?.screen_name}
                      />
                    </UserModalWrapper>
                  </div>
                  <FollowButton
                    followerId={session?.user?.id}
                    userId={member?.id}
                    username={member?.screen_name}
                    isFollowing={member?.followers?.some(
                      (follower) => follower.follower_id === session?.user?.id,
                    )}
                  />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
