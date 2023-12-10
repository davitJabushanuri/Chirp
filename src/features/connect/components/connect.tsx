"use client";

import Link from "next/link";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { useUsers } from "@/features/profile";

import { Person } from "./person";
import styles from "./styles/connect.module.scss";

export const Connect = () => {
  const { data: people, isLoading, isError, isSuccess } = useUsers();

  return (
    <section aria-label="Who to follow" className={styles.container}>
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
          <h2>Who to follow</h2>
          <div className={styles.people}>
            {isSuccess &&
              people.length > 0 &&
              people?.slice(0, 3)?.map((person) => {
                return <Person key={person.id} person={person} />;
              })}
          </div>

          <Link className={styles.showMore} href={`/people`}>
            Show more
          </Link>
        </>
      )}
    </section>
  );
};
