export const scrollToBottom = (element: HTMLElement | null) => {
  if (element)
    element.scrollIntoView({
      behavior: "instant",
      block: "end",
      inline: "nearest",
    });
};
