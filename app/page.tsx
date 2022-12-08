import styles from "./styles/landing-page.module.scss";

export default async function Home() {
  return (
    <div className={styles.container}>
      <a href="/api/auth/signup">Sign up</a>
      <a href="/api/auth/login">Login</a>
    </div>
  );
}
