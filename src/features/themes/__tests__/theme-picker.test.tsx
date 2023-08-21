import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ThemePicker } from "../components/theme-picker";

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

describe("ThemePicker", () => {
  it("renders", () => {
    render(<ThemePicker />);

    const themePicker = screen.getByTestId("theme-fieldset");
    expect(themePicker).toBeInTheDocument();

    const legend = screen.getByText("Background");
    expect(legend).toBeInTheDocument();

    const lightTheme = screen.getByLabelText("Default");
    expect(lightTheme).toBeInTheDocument();

    const dimTheme = screen.getByLabelText("Dim");
    expect(dimTheme).toBeInTheDocument();

    const darkTheme = screen.getByLabelText("Lights out");
    expect(darkTheme).toBeInTheDocument();
  });

  it("it should render with the light theme selected by default if no theme is provided", () => {
    render(<ThemePicker />);

    const lightTheme = screen.getByLabelText("Default");
    expect(lightTheme).toBeChecked();
  });

  it("it should change the theme when the user clicks on a radio input", async () => {
    render(<ThemePicker />);

    const lightTheme = await screen.findByLabelText("Default");
    const dimTheme = await screen.findByLabelText("Dim");
    const darkTheme = await screen.findByLabelText("Lights out");

    await userEvent.click(lightTheme);

    expect(document.documentElement).toHaveClass("theme-light");
    expect(lightTheme).toBeChecked();
    expect(dimTheme).not.toBeChecked();
    expect(darkTheme).not.toBeChecked();

    await userEvent.click(dimTheme);
    expect(document.documentElement).toHaveClass("theme-dim");
    expect(lightTheme).not.toBeChecked();
    expect(dimTheme).toBeChecked();
    expect(darkTheme).not.toBeChecked();

    await userEvent.click(darkTheme);
    expect(document.documentElement).toHaveClass("theme-dark");
    expect(lightTheme).not.toBeChecked();
    expect(dimTheme).not.toBeChecked();
    expect(darkTheme).toBeChecked();
  });

  it("it should change the theme when the user presses arrow keys", async () => {
    render(<ThemePicker />);

    const lightTheme = screen.getByLabelText("Default");
    const dimTheme = screen.getByLabelText("Dim");
    const darkTheme = screen.getByLabelText("Lights out");

    await userEvent.tab();
    expect(lightTheme).toHaveFocus();
    expect(lightTheme).toBeChecked();

    await userEvent.type(lightTheme, "{arrowdown}");
    expect(dimTheme).toHaveFocus();
    expect(dimTheme).toBeChecked();

    await userEvent.type(dimTheme, "{arrowdown}");
    expect(darkTheme).toHaveFocus();
    expect(darkTheme).toBeChecked();

    await userEvent.type(darkTheme, "{arrowup}");
    expect(dimTheme).toHaveFocus();
    expect(dimTheme).toBeChecked();
  });
});
