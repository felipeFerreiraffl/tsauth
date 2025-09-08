import images from "../../../utils/images";
import styles from "./styles.module.css";

export default function DevIllustration() {
  return (
    <div className={styles.container}>
      <img src={images.dev} alt="Programmer illustration" />
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <p>Made by</p>
          <h2>Felipe Ferreira Lima</h2>
        </div>
        <div className={styles.iconsContainer}>
          <a href="https://github.com/felipeFerreiraffl" target="_blank">
            <img src={images.github} alt="Github logo" />
          </a>
          <a href="https://www.instagram.com/felipe_ffl7" target="_blank">
            <img src={images.instagram} alt="Instagram logo" />
          </a>
          <a
            href="https://www.linkedin.com/in/felipe-ferreira-959bb8271/"
            target="_blank"
          >
            <img src={images.linkedin} alt="Linkedin logo" />
          </a>
        </div>
      </div>
    </div>
  );
}
