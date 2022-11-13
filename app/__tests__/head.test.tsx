import { render, screen } from "@testing-library/react";

import Head from "../head";

test("should add proper page title and meta description", async () => {
  const title = "Page title";
  const titleSuffix = " | Twitter";
  const description = "Page description";

  const { rerender } = render(<Head title={title} description={description} />);
  expect(document.title).toBe(title + titleSuffix);

  const metaDescription = document.querySelector('meta[name="description"]');
  expect(metaDescription).toHaveAttribute("content", description);

  rerender(<Head />);
  expect(document.title).toBe("");
});
