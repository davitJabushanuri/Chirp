import Image from "next/image";

import styles from "./styles/avatar.module.scss";

export const Avatar = ({
  userImage,
  width = 38,
  height = 38,
}: {
  userImage: string | null;
  width: number;
  height: number;
}) => {
  return (
    <Image
      className={styles.avatar}
      src={userImage || `/user_placeholder.png`}
      alt="profile picture"
      width={width}
      height={height}
    />
  );
};
