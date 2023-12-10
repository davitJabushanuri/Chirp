"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import styles from "./styles/change-username.module.scss";

const usernameSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Your username must be longer than 4 characters." })
    .max(15, {
      message: "Your username must be shorter than 15 characters.",
    }),
});

export const ChangeUsername = () => {
  const { data: session } = useSession();

  type UsernameSchema = z.infer<typeof usernameSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernameSchema>({
    resolver: zodResolver(usernameSchema),
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Change Username</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <div className={styles.inputContainer}>
            <label
              className={errors.username ? styles.error : ""}
              htmlFor="username"
            >
              <input
                defaultValue={session?.user?.username}
                {...register("username")}
                placeholder="Username"
              />
              <span>Username</span>
            </label>
          </div>
          <span className={styles.errorMessage}>
            {errors?.username && errors?.username?.message}
          </span>

          <button type="submit" className={styles.submit}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
