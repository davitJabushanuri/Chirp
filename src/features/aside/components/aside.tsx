"use client";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { RegisterForm } from "@/features/auth";
import { Connect } from "@/features/connect";
import { Footer } from "@/features/footer";
import { Search } from "@/features/search";
import { Trends } from "@/features/trends";

import styles from "./styles/aside.module.scss";

export const Aside = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <aside id="trending" aria-label="Trending" className={styles.container}>
      {session && (
        <>
          {pathname !== "/" &&
            pathname !== "/explore" &&
            pathname?.split("/")[1] !== "search" && (
              <div className={styles.search}>
                <Search />
              </div>
            )}
          {pathname !== "/" &&
            pathname !== "/explore" &&
            pathname !== "/trends" && (
              <div className={styles.trends}>
                <Trends />
              </div>
            )}
          {pathname !== `/people` && (
            <div className={styles.connect}>
              <Connect />
            </div>
          )}
        </>
      )}
      {!session && (
        <div className={styles.registerForm}>
          <RegisterForm />
        </div>
      )}

      <div className={styles.footer}>
        <Footer />
      </div>
    </aside>
  );
};
