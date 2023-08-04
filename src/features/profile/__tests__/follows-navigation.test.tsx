import { render, screen } from "@testing-library/react";

import {
  FollowsNavigation,
  FollowsTab,
} from "../components/follows-navigation";

describe("FollowsNavigation", () => {
  it("renders the Followers and Following tabs", () => {
    render(<FollowsNavigation />);

    expect(screen.getByRole("tab", { name: "Followers" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Following" })).toBeInTheDocument();
  });

  it("sets the active tab based on the current path", () => {
    render(<FollowsTab id="123" path="followers" text="Followers" />);

    expect(screen.getByRole("tab", { name: "Followers" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    render(<FollowsTab id="123" path="following" text="Following" />);

    expect(screen.getByRole("tab", { name: "Following" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
});
