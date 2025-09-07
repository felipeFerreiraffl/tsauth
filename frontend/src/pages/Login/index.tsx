import Button from "../../components/Button";
import InputField from "../../components/InputField";
import icons from "../../utils/icons";
import images from "../../utils/images";
import styles from "./styles.module.css";

export default function Login() {
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

        <div className={styles.inputFieldsContainer}>
          <InputField
            id="email"
            icon={icons.email}
            inputType="email"
            placeholder="Enter your email address"
            label="Email"
          />
          <InputField
            id="password"
            icon={icons.padlock}
            inputType="password"
            placeholder="Enter your password"
            label="Password"
            showEye={icons.invisible}
          />
        </div>

        <div className={styles.inputUtilsContainer}>
          <div className={styles.checkbox}>
            <input id="remember" type="checkbox" />
            <label id="remember">Remember me</label>
          </div>
          <p>Forgot password ?</p>
        </div>

        <Button
          label="Botao"
          color="var(--color-primary-main)"
          onClick={() => ""}
        />
      </form>
    </div>
  );
}
