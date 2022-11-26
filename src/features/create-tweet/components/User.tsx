import Image from "next/image";

import Avatar from "@/assets/user_placeholder.png";

import styles from "./styles/User.module.scss";

const User = () => {
  return (
    <div className={styles.container}>
      <button className={styles.user}>
        <Image src={Avatar} alt="user avatar" className={styles.avatar} />
      </button>
    </div>
  );
};

export default User;
