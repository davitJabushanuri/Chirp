import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ColorPicker } from "../components/color-picker";

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

describe("ColorPicker", () => {
  it("should render the color picker", () => {
    render(<ColorPicker />);

    expect(screen.getByTestId("color-fieldset")).toBeInTheDocument();
    expect(screen.getByText("Color")).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(6);
  });

  it("should change the color when a color is selected", async () => {
    render(<ColorPicker />);

    await userEvent.click(screen.getByTestId("color-blue"));
    expect(screen.getByTestId("color-blue")).toBeChecked();

    await userEvent.click(screen.getByTestId("color-rose"));
    expect(screen.getByTestId("color-rose")).toBeChecked();

    await userEvent.click(screen.getByTestId("color-violet"));
    expect(screen.getByTestId("color-violet")).toBeChecked();

    await userEvent.click(screen.getByTestId("color-orange"));
    expect(screen.getByTestId("color-orange")).toBeChecked();

    await userEvent.click(screen.getByTestId("color-green"));
    expect(screen.getByTestId("color-green")).toBeChecked();

    await userEvent.click(screen.getByTestId("color-yellow"));
    expect(screen.getByTestId("color-yellow")).toBeChecked();
  });

  it("should change color when the user presses arrow keys", async () => {
    render(<ColorPicker />);

    await userEvent.tab();

    await userEvent.type(screen.getByTestId("color-yellow"), "{arrowdown}");
    expect(screen.getByTestId("color-rose")).toBeChecked();

    await userEvent.type(screen.getByTestId("color-rose"), "{arrowdown}");
    expect(screen.getByTestId("color-violet")).toBeChecked();

    await userEvent.type(screen.getByTestId("color-violet"), "{arrowdown}");
    expect(screen.getByTestId("color-orange")).toBeChecked();

    await userEvent.type(screen.getByTestId("color-orange"), "{arrowdown}");
    expect(screen.getByTestId("color-green")).toBeChecked();

    await userEvent.type(screen.getByTestId("color-green"), "{arrowdown}");
    expect(screen.getByTestId("color-blue")).toBeChecked();
  });
});
