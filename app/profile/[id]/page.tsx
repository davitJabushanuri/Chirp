import { ProfileTweets } from "@/features/profile";

import styles from "./styles/profile.module.scss";

const Profile = () => {
  return (
    <div className={styles.container}>
      <ProfileTweets />
    </div>
  );
};

export default Profile;
