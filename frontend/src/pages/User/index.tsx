import Button from "../../components/Button";
import images from "../../utils/images";
import styles from "./styles.module.css";

export default function User() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={images.logo} alt="TSAuth Logo" />
      </div>

      <div className={styles.userContent}>
        <div className={styles.titleContainer}>
          <h1>Welcome, user!</h1>
          <p>This is a project developed with TypeScript, Node.js and JWT.</p>
        </div>
        <div className={styles.informationsContainer}>
          <h2>Your informations</h2>
          <div className={styles}></div>
        </div>

        <div className={styles.btnContainer}>
          <Button
            color="var(--color-primary-main)"
            label="Change informations"
            onClick={() => ""}
          />
          <Button
            color="none"
            border="2px solid var(--color-primary-main)"
            label="Sign out"
            onClick={() => ""}
          />
          <Button
            color="var(--color-auxiliary-red)"
            label="Delete account"
            onClick={() => ""}
          />
        </div>
      </div>
    </div>
  );
}
