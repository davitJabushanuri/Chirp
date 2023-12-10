import { render, screen } from "@testing-library/react";

import { TextProgressBar } from "../components/text-progress-bar";

describe("TextProgressBar", () => {
  it("progress is 1", () => {
    const progress = 1;

    render(<TextProgressBar progress={progress} />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();

    const trackCircle = screen.getByTestId("track-circle");
    expect(trackCircle).toBeInTheDocument();
    expect(trackCircle).toHaveAttribute(
      "stroke",
      "var(--clr-trends-background)",
    );

    const progressCircle = screen.getByTestId("progress-circle");
    expect(progressCircle).toBeInTheDocument();
    expect(progressCircle).toHaveAttribute("stroke", "var(--clr-primary)");

    const remainingChars = screen.queryByTestId("remaining-chars");
    expect(remainingChars).not.toBeInTheDocument();
  });

  it("progress is 140", () => {
    const progress = 140;

    render(<TextProgressBar progress={progress} />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();

    const trackCircle = screen.getByTestId("track-circle");
    expect(trackCircle).toBeInTheDocument();
    expect(trackCircle).toHaveAttribute(
      "stroke",
      "var(--clr-trends-background)",
    );

    const progressCircle = screen.getByTestId("progress-circle");
    expect(progressCircle).toBeInTheDocument();
    expect(progressCircle).toHaveAttribute("stroke", "var(--clr-primary)");

    const remainingChars = screen.queryByTestId("remaining-chars");
    expect(remainingChars).not.toBeInTheDocument();
  });

  it("progress is 260", () => {
    const progress = 260;

    render(<TextProgressBar progress={progress} />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();

    const trackCircle = screen.getByTestId("track-circle");
    expect(trackCircle).toBeInTheDocument();
    expect(trackCircle).toHaveAttribute(
      "stroke",
      "var(--clr-trends-background)",
    );

    const progressCircle = screen.getByTestId("progress-circle");
    expect(progressCircle).toBeInTheDocument();
    expect(progressCircle).toHaveAttribute("stroke", "#ffd400");

    const remainingChars = screen.queryByTestId("remaining-chars");
    expect(remainingChars).toBeInTheDocument();
    expect(remainingChars).toHaveTextContent("20");
  });

  it("progress is 280", () => {
    const progress = 280;

    render(<TextProgressBar progress={progress} />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();

    const trackCircle = screen.getByTestId("track-circle");
    expect(trackCircle).toBeInTheDocument();
    expect(trackCircle).toHaveAttribute(
      "stroke",
      "var(--clr-trends-background)",
    );

    const progressCircle = screen.getByTestId("progress-circle");
    expect(progressCircle).toBeInTheDocument();
    expect(progressCircle).toHaveAttribute("stroke", "#F4212E");

    const remainingChars = screen.queryByTestId("remaining-chars");
    expect(remainingChars).toBeInTheDocument();
    expect(remainingChars).toHaveTextContent("0");
    expect(remainingChars).toHaveClass("danger");
  });

  it("progress is 290", () => {
    const progress = 290;

    render(<TextProgressBar progress={progress} />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();

    const trackCircle = screen.getByTestId("track-circle");
    expect(trackCircle).toBeInTheDocument();
    expect(trackCircle).toHaveAttribute("stroke", "transparent");

    const progressCircle = screen.getByTestId("progress-circle");
    expect(progressCircle).toBeInTheDocument();
    expect(progressCircle).toHaveAttribute("stroke", "transparent");

    const remainingChars = screen.getByTestId("remaining-chars");
    expect(remainingChars).toBeInTheDocument();
    expect(remainingChars).toHaveTextContent("-10");
    expect(remainingChars).toHaveClass("danger");
  });
});
