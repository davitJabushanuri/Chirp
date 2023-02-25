import { useSession } from "next-auth/react";
import Link from "next/link";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { useUsers } from "@/features/profile";

import { Person } from "./person";
import styles from "./styles/connect.module.scss";

export const Connect = () => {
  const { data: session } = useSession();
  const { data: people, isLoading, isError } = useUsers();

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loading}>
          <LoadingSpinner />
        </div>
      ) : isError ? (
        <div className={styles.error}>
          <TryAgain />
        </div>
      ) : (
        <>
          <h1>Who to follow</h1>
          <div className={styles.people}>
            {people
              ?.filter((person) => {
                return (
                  person.id !== session?.user?.id ||
                  person.followers.some(
                    (follower) => follower.id !== session?.user?.id,
                  )
                );
              })
              ?.map((person) => {
                return <Person key={person.id} person={person} />;
              })}
          </div>

          <button className={styles.showMore}>
            <Link href={`/people`}>Show more</Link>
          </button>
        </>
      )}
    </div>
  );
};
