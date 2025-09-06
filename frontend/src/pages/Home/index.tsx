import images from "../../utils/images";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={images.logo} alt="TSAuth logo" aria-label="Logo" />
      </div>

      <form>
        <div className={styles.titleContainer}>
          <h1>Sign in</h1>
          <div className={styles.paragraphs}>
            <p>If you dont have an account register</p>
            <p>
              You can{" "}
              <span>
                <a href="">Register here!</a>
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
