import { setCookie } from "cookies-next";

export const handleNavigationInteraction = ({
  e,
  path,
}: {
  e: React.KeyboardEvent<HTMLAnchorElement>;
  path: string;
}) => {
  if (e.key === "ArrowRight") {
    if (!e.currentTarget.nextElementSibling) {
      (
        e.currentTarget?.parentElement?.firstElementChild as HTMLElement
      )?.focus();
    } else (e.currentTarget.nextElementSibling as HTMLElement)?.focus();
  }
  if (e.key === "ArrowLeft") {
    if (!e.currentTarget.previousElementSibling) {
      (
        e.currentTarget?.parentElement?.lastElementChild as HTMLElement
      )?.focus();
    } else (e.currentTarget.previousElementSibling as HTMLElement)?.focus();
  }

  if (e.key === "Enter") {
    if (e.currentTarget.ariaSelected === "true") {
      return;
    }

    e.currentTarget.click();
    setCookie("tab", path);
  }
};
