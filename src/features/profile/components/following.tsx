"use client";

import { FollowersHeader } from "./followers-header";
import { NoFollowers } from "./no-followers";

export const Following = () => {
  return (
    <div>
      <FollowersHeader />
      <NoFollowers
        title="isn’t following anyone"
        subtitle="Once they follow accounts, they’ll show up here."
      />
    </div>
  );
};
