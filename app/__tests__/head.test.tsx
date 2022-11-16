/* eslint-disable testing-library/no-node-access */
import { render, waitFor } from "@testing-library/react";

import Head from "../head";

describe("Head", () => {
  test("should add page title and meta description if props are present", async () => {
    const title = "Page title";
    const titleSuffix = " | Twitter";
    const description = "Page description";

    render(<Head title={title} description={description} />);
    await waitFor(() => {
      expect(document.title).toBe(title + titleSuffix);
    });

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toHaveAttribute("content", description);
  });

  test("page title should return empty string if props are not present", async () => {
    render(<Head />);
    await waitFor(() => {
      expect(document.title).toBe("");
    });
  });
});
