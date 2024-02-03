export const isScrolledToEnd = (element: HTMLElement) => {
  return element.scrollHeight - element.scrollTop === element.clientHeight;
};
