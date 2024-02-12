"use client";
import { LoadingSpinner } from "@/components/elements/loading-spinner";
import { TryAgain } from "@/components/elements/try-again";
import { ConnectHeader, PersonDetails } from "@/features/connect";
import { useUsers } from "@/features/profile";

export const ConnectClientPage = () => {
  const {
    data: people = [],
    isLoading,
    isError,
  } = useUsers({
    queryKey: ["people"],
    limit: 20,
  });

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
      <h2 className="px-4 py-3 text-h2 font-bold text-secondary-100">
        Suggested for you
      </h2>
      {people.length > 0 &&
        people?.map((person) => {
          return (
            <div key={person.id}>
              <PersonDetails author={person} />
            </div>
          );
        })}
    </div>
  );
};
