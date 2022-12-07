import supabase from "@/utils/supabaseClient";

import styles from "./styles/landing-page.module.scss";

export default async function Home() {
  // const { data, error } = await supabase.auth.signUp({
  //   email: "davitiuss@gmail.com",
  //   password: "password",
  // });

  // console.log(data, error);

  return <div className={styles.container}></div>;
}
