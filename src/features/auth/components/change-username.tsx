import { useSession } from "next-auth/react";
import { z } from "zod";

import styles from "./styles/change-username.module.scss";

export const ChangeUsername = () => {
  const { data: session } = useSession();

  const schema = z.object({
    username: z
      .string()
      .min(4, { message: "Your username must be longer than 4 characters." })
      .max(15, {
        message: "Your username must be shorter than 15 characters.",
      }),
  });

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const username = e.target.value;
    console.log(username);

    try {
      const data = schema.parse({ username });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Change Username</h1>
      <div className={styles.formContainer}>
        <form>
          <div className={styles.inputContainer}>
            <label htmlFor="username">
              <input
                onChange={(e) => handleSubmit(e)}
                type="text"
                id="username"
                placeholder="Username"
              />
              <span>Username</span>
            </label>
          </div>

          <button className={styles.submit}>Save</button>
        </form>
      </div>
    </div>
  );
};
