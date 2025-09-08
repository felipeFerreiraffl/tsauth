import { Link } from "react-router-dom";
import Button from "../../components/Button";
import HomeIllustration from "../../components/Illustration/HomeIllustration";
import InputField from "../../components/InputField";
import icons from "../../utils/icons";
import images from "../../utils/images";
import styles from "./styles.module.css";

export default function SignUp() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={images.logo} alt="TSAuth logo" />
      </div>

      <form>
        <div className={styles.titleContainer}>
          <h1>Sign in</h1>
          <div className={styles.paragraphs}>
            <p>If you already have an account register</p>
            <p>
              You can{" "}
              <span>
                <Link to={"/"}>Login here!</Link>
              </span>
            </p>
          </div>
        </div>

        <div className={styles.inputFieldsContainer}>
          <InputField
            label="Email"
            id="email"
            inputType="email"
            icon={icons.email}
            placeholder="Enter your email address"
          />
          <InputField
            label="Username"
            id="username"
            inputType="text"
            icon={icons.user}
            placeholder="Enter your User name"
          />
          <InputField
            label="Password"
            id="password"
            inputType="password"
            icon={icons.padlock}
            placeholder="Enter your Password"
            showEye={icons.invisible}
          />
          <InputField
            label="Confrim Password"
            showEye={icons.invisible}
            id="password"
            inputType="password"
            icon={icons.padlock}
            placeholder="Confirm your Password"
          />
        </div>

        <Button
          color="var(--color-primary-main)"
          label="Register"
          onClick={() => ""}
          type="submit"
          marginTop={58}
        />
      </form>

      <HomeIllustration message="Sign Up to name" />
    </div>
  );
}
