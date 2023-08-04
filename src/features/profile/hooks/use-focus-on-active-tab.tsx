import { deleteCookie, getCookie } from "cookies-next";
import { useEffect } from "react";

export const UseFocusOnActiveTab = ({ path }: { path: string }) => {
  useEffect(() => {
    const tab = getCookie("tab");

    if (tab) {
      const element = document.querySelector(
        `div[role="tablist"] a[href="${tab}"]`,
      ) as HTMLElement | null;

      if (element) {
        element.focus();
        deleteCookie("tab");
      }
    }

    return () => {};
  }, [path]);
};
