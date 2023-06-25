export const resizeTextarea = (textarea?: HTMLTextAreaElement) => {
  if (!textarea) return;

  textarea.style.height = "0";
  textarea.style.height = `${textarea.scrollHeight}px`;
};
