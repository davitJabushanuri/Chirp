import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ThemePicker } from "../components/theme-picker";

describe("ThemePicker", () => {
  it("renders", () => {
    render(<ThemePicker theme="theme-light" />);

    const themePicker = screen.getByTestId("fieldset");
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

  it("should render with the light theme selected by default if no theme is provided", () => {
    render(<ThemePicker />);

    const lightTheme = screen.getByLabelText("Default");
    expect(lightTheme).toBeChecked();
  });

  it("should set the theme to theme-light if an invalid theme is provided", () => {
    render(<ThemePicker theme="invalid-theme" />);

    const lightTheme = screen.getByLabelText("Default");
    expect(lightTheme).toBeChecked();
  });

  it("should change the theme when the user clicks on a radio input", () => {
    render(<ThemePicker theme="theme-dark" />);

    const lightTheme = screen.getByLabelText("Default");
    const dimTheme = screen.getByLabelText("Dim");
    const darkTheme = screen.getByLabelText("Lights out");

    fireEvent.click(lightTheme);
    expect(document.documentElement).toHaveClass("theme-light");
    expect(lightTheme).toBeChecked();
    expect(dimTheme).not.toBeChecked();
    expect(darkTheme).not.toBeChecked();

    fireEvent.click(dimTheme);
    expect(document.documentElement).toHaveClass("theme-dim");
    expect(lightTheme).not.toBeChecked();
    expect(dimTheme).toBeChecked();
    expect(darkTheme).not.toBeChecked();

    fireEvent.click(darkTheme);
    expect(document.documentElement).toHaveClass("theme-dark");
    expect(lightTheme).not.toBeChecked();
    expect(dimTheme).not.toBeChecked();
    expect(darkTheme).toBeChecked();
  });

  it("should change the theme when the user presses arrow keys", async () => {
    render(<ThemePicker theme="theme-light" />);

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
