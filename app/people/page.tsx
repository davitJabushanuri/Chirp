"use client";

import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { ConnectHeader, PersonDetails } from "@/features/connect";
import { useUsers } from "@/features/profile";

const PeoplePage = () => {
  const { data: people, isLoading, isError } = useUsers();

  if (isLoading) {
    return (
      <>
        <ConnectHeader />
        <LoadingSpinner />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <ConnectHeader />
        <TryAgain />
      </>
    );
  }

  return (
    <div
      style={{
        paddingBottom: "calc(100vh - 8rem)",
      }}
    >
      <ConnectHeader />
      <h1
        style={{
          fontSize: "19px",
          fontWeight: 700,
          padding: "11px 15px",
        }}
      >
        Suggested for you
      </h1>
      {people?.map((person) => {
        return (
          <div key={person.id}>
            <PersonDetails author={person} />
          </div>
        );
      })}
    </div>
  );
};

export default PeoplePage;
