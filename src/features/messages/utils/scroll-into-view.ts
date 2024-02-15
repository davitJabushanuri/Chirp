type ScrollIntoView = {
  element: Element | null;
  behavior?: "smooth" | "auto" | "instant";
};

export const scrollIntoView = ({
  element,
  behavior = "instant",
}: ScrollIntoView) => {
  if (element) element.scrollIntoView({ behavior });
};
