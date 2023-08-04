import { deleteCookie, getCookie } from "cookies-next";
import { useEffect } from "react";

export const UseFocusOnActiveTab = ({
  cookieName,
  path,
}: {
  cookieName: string;
  path: string;
}) => {
  useEffect(() => {
    const tab = getCookie(cookieName);

    if (tab) {
      const element = document.querySelector(
        `div[role="tablist"] a[href="${tab}"]`,
      ) as HTMLElement | null;

      if (element) {
        element.focus();
        deleteCookie(cookieName);
      }
    }

    return () => {};
  }, [cookieName, path]);
};
