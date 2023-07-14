import { FontSizeSlider } from "./font-size-slider";
import styles from "./styles/font-size-customization.module.scss";

export const FontSizeCustomization = ({
  fontSize,
}: {
  fontSize?: string | undefined;
}) => {
  return (
    <div data-testid={`font-size-customization`} className={styles.container}>
      <legend>Font size</legend>
      <div className={styles.slider}>
        <span className={styles.small}>Aa</span>
        <FontSizeSlider fontSize={fontSize} />
        <span className={styles.large}>Aa</span>
      </div>
    </div>
  );
};
