import Color from "./Color";
import styles from "./ColorPicker.module.scss";

export const ColorPicker = () => {
  return (
    <div className={styles.container}>
      <h2>Color</h2>
      <div className={styles.colors}>
        <Color color="blue" />
        <Color color="yellow" />
        <Color color="rose" />
        <Color color="violet" />
        <Color color="orange" />
        <Color color="green" />
      </div>
    </div>
  );
};
