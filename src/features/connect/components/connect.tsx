"use client";

import { useRouter } from "next/navigation";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { useUsers } from "@/features/profile";

import { Person } from "./person";
import styles from "./styles/connect.module.scss";

export const Connect = () => {
  const router = useRouter();
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
            {people.length > 0 &&
              people?.slice(0, 3)?.map((person) => {
                return <Person key={person.id} person={person} />;
              })}
          </div>

          <button
            onClick={() => router.push(`/people`)}
            className={styles.showMore}
          >
            Show more
          </button>
        </>
      )}
    </div>
  );
};
