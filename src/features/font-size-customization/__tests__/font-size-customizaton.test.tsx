import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FontSizeCustomization } from "../components/font-size-customization";

const consoleError = console.error;
let mockConsoleError: jest.SpyInstance;
beforeAll(() => {
  mockConsoleError = jest
    .spyOn(console, "error")
    .mockImplementation((...args) => {
      const message = typeof args[0] === "string" ? args[0] : "";
      if (
        message.includes(
          "When testing, code that causes React state updates should be wrapped into act(...)",
        ) ||
        message.includes("antd")
      ) {
        return;
      }

      return consoleError.call(console, args);
    });
});

afterAll(() => {
  mockConsoleError.mockRestore();
});

describe("FontSizeCustomization", () => {
  it("should render a slider", () => {
    render(<FontSizeCustomization />);
    expect(screen.getByTestId(`font-size-customization`)).toBeInTheDocument();
    expect(screen.getByText(`Font size`)).toBeInTheDocument();
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("should update the slider value when the slider is moved", () => {
    render(<FontSizeCustomization />);

    const slider = screen.getByTestId("font-size-slider");
    expect(screen.getByRole("slider")).toHaveValue(`0`);
    slider.focus();

    fireEvent.change(slider, { target: { value: 1 } });
    expect(screen.getByRole("slider")).toHaveValue(`1`);

    fireEvent.change(slider, { target: { value: 2 } });
    expect(screen.getByRole("slider")).toHaveValue(`2`);

    fireEvent.change(slider, { target: { value: 3 } });
    expect(screen.getByRole("slider")).toHaveValue(`3`);

    fireEvent.change(slider, { target: { value: 4 } });
    expect(screen.getByRole("slider")).toHaveValue(`4`);

    fireEvent.change(slider, { target: { value: 0 } });
    expect(screen.getByRole("slider")).toHaveValue(`0`);

    fireEvent.drag(slider, { target: { value: 1 } });
    expect(screen.getByRole("slider")).toHaveValue(`1`);

    fireEvent.drag(slider, { target: { value: 4 } });
    expect(screen.getByRole("slider")).toHaveValue(`4`);

    fireEvent.drag(slider, { target: { value: 0 } });
    expect(screen.getByRole("slider")).toHaveValue(`0`);
  });

  it("should update the slider value when the dots are clicked", async () => {
    render(<FontSizeCustomization />);

    const xs = screen.getByTitle("Extra small");
    const sm = screen.getByTitle("Small");
    const md = screen.getByTitle("Default");
    const lg = screen.getByTitle("Large");
    const xl = screen.getByTitle("Extra large");

    expect(screen.getByRole("slider")).toHaveValue(`0`);

    await userEvent.click(sm);
    expect(screen.getByRole("slider")).toHaveValue(`1`);

    await userEvent.click(md);
    expect(screen.getByRole("slider")).toHaveValue(`2`);

    await userEvent.click(lg);
    expect(screen.getByRole("slider")).toHaveValue(`3`);

    await userEvent.click(xl);
    expect(screen.getByRole("slider")).toHaveValue(`4`);

    await userEvent.click(xs);
    expect(screen.getByRole("slider")).toHaveValue(`0`);
  });
});
