import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";
import {
  Avatar,
  LinkToProfile,
  UserModalWrapper,
  UserName,
  UserScreenName,
} from "@/features/profile";
import { TweetOptions } from "@/features/tweets";
import { ITweet } from "@/features/tweets";

import styles from "./styles/tweet-author.module.scss";

export const TweetAuthor = ({ tweet }: { tweet: ITweet }) => {
  return (
    <div className={styles.container}>
      <UserModalWrapper userId={tweet?.author?.id}>
        <LinkToProfile tabIndex={-1} userId={tweet?.author?.id}>
          <Avatar userImage={tweet?.author?.profile_image_url} />
        </LinkToProfile>
      </UserModalWrapper>

      <div className={styles.userInfo}>
        <UserModalWrapper userId={tweet?.author?.id}>
          <LinkToProfile userId={tweet?.author?.id}>
            <EllipsisWrapper>
              <UserName
                name={tweet?.author?.name}
                isVerified={tweet?.author?.verified}
                hover={true}
              />
            </EllipsisWrapper>
          </LinkToProfile>
        </UserModalWrapper>

        <UserModalWrapper userId={tweet?.author?.id}>
          <LinkToProfile tabIndex={-1} userId={tweet?.author?.id}>
            <EllipsisWrapper>
              <UserScreenName
                screenName={tweet?.author?.email?.split("@")[0]}
              />
            </EllipsisWrapper>
          </LinkToProfile>
        </UserModalWrapper>
      </div>

      <div className={styles.options}>
        <TweetOptions tweet={tweet} />
      </div>
    </div>
  );
};
