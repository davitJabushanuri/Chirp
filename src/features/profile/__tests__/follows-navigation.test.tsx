import { render, screen } from "@testing-library/react";

import { FollowsNavigation } from "../components/follows-navigation";

describe("FollowsNavigation", () => {
  const url = `https://twitter-v2-sand.vercel.app/clj8wmhx7000eu5d8luqe5cva/following`;
  Object.defineProperty(window, "location", {
    value: new URL(url),
  });

  window.location.href = url;

  it("renders the Followers and Following tabs", () => {
    render(<FollowsNavigation />);

    expect(screen.getByRole("tab", { name: "Followers" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Following" })).toBeInTheDocument();
  });

  it("sets the active tab based on the current path", () => {
    render(<FollowsNavigation />);

    expect(screen.getByRole("tab", { name: "Followers" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
    expect(screen.getByRole("tab", { name: "Following" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });
});
