import Person from "./person";
import styles from "./styles/connect.module.scss";

export const Connect = () => {
  return (
    <div className={styles.container}>
      <h1>Who to follow</h1>

      <div className={styles.people}>
        <Person name="Gatsby ft. Valhalla" username="@GatsbyJS" image="" />
        <Person name="Apollo" username="@apollographql" image="" />
        <Person name="Nuxt" username="@Nuxt_js" image="" />
      </div>

      <button>Show more</button>
    </div>
  );
};
