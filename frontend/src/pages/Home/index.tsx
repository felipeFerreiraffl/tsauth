import images from "../../utils/images";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <img src={images.logo} alt="TSAuth logo" />
    </div>
  );
}
