import { FontSizeSlider } from "./font-size-slider";
import styles from "./styles/font-size-customization.module.scss";

export const FontSizeCustomization = () => {
  return (
    <div className={styles.container}>
      <legend>Font size</legend>
      <div className={styles.slider}>
        <span className={styles.small}>Aa</span>
        <FontSizeSlider />
        <span className={styles.large}>Aa</span>
      </div>
    </div>
  );
};
