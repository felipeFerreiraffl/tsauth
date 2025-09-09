import Button from "../../components/Button";
import DevIllustration from "../../components/Illustration/DevIllustration";
import InfoField from "../../components/InfoField";
import { useAuth } from "../../services/context";
import icons from "../../utils/icons";
import images from "../../utils/images";
import styles from "./styles.module.css";

export default function User() {
  // Informações da API
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={images.logo} alt="TSAuth Logo" />
      </div>

      <div className={styles.userContent}>
        <div className={styles.titleContainer}>
          <h1>Welcome, {user?.username}!</h1>
          <p>This is a project developed with TypeScript, Node.js and JWT.</p>
        </div>
        <div className={styles.informationsContainer}>
          <h2>Your informations</h2>
          <div className={styles.fieldsContainer}>
            <InfoField
              icon={icons.user}
              label="Username"
              id="username"
              type="text"
              value={user?.username}
            />
            <InfoField
              icon={icons.email}
              label="Email"
              id="email"
              type="email"
              value={user?.email}
            />
            <InfoField
              icon={icons.padlock}
              label="Password"
              id="password"
              type="password"
              value={user?.password}
              showEye
            />
          </div>
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
            onClick={handleLogout}
          />
          <Button
            color="var(--color-auxiliary-red)"
            label="Delete account"
            onClick={() => ""}
          />
        </div>
      </div>

      <DevIllustration />
    </div>
  );
}
