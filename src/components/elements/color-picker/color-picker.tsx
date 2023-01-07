import Color from "./color";
import styles from "./styles/color-picker.module.scss";

export const ColorPicker = ({ color }: { color: string | undefined }) => {
  return (
    <div className={styles.container}>
      <h2>Color</h2>
      <div className={styles.colors}>
        <Color activeColor={color} color="blue" />
        <Color activeColor={color} color="yellow" />
        <Color activeColor={color} color="rose" />
        <Color activeColor={color} color="violet" />
        <Color activeColor={color} color="orange" />
        <Color activeColor={color} color="green" />
      </div>
    </div>
  );
};
