"use client";

import { useQuery } from "@tanstack/react-query";

import supabase from "@/utils/supabaseClient";

import styles from "./landingPage.module.scss";

export default function Home() {
  const { data: tweets, isLoading } = useQuery(["tweets"], () => {
    return supabase.from("Tweet").select("*");
  });

  console.log(tweets);

  return <div className={styles.container}>this is a landing page</div>;
}
