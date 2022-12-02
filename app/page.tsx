"use client";

import { useQuery } from "@tanstack/react-query";

import supabase from "@/utils/supabaseClient";

import styles from "./landingPage.module.scss";

export default function Home() {
  const { data: tweets, isLoading } = useQuery(["tweets"], async () => {
    const data = supabase.from("Tweet").select("*");
    return data;
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      {tweets?.data?.map((tweet) => {
        return <p key={tweet.id}>{tweet.text}</p>;
      })}
    </div>
  );
}

const getData = async () => {
  const { data, error } = await supabase.from("Tweet").select("*");
  if (error) {
    console.log(error);
  }
  return data;
};
