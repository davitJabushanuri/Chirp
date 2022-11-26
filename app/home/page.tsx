import { CreateTweet } from "@/features/create-tweet";

import styles from "./home.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.createTweet}>
        <CreateTweet />
      </div>
    </div>
  );
};

export default Home;
