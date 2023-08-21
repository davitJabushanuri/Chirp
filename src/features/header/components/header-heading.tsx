import { EllipsisWrapper } from "@/components/elements/ellipsis-wrapper";

import styles from "./styles/header-heading.module.scss";

export const HeaderHeading = ({ title }: { title: string }) => {
  return (
    <EllipsisWrapper>
      <h2 className={styles.container}>{title}</h2>
    </EllipsisWrapper>
  );
};
