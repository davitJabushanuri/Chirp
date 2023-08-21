import { render, screen } from "@testing-library/react";

import { FollowsNavigation } from "../components/follows-navigation";

describe("FollowsNavigation", () => {
  it("renders the Followers and Following tabs", () => {
    render(<FollowsNavigation />);

    expect(screen.getByRole("tab", { name: "Followers" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Following" })).toBeInTheDocument();
  });
});
