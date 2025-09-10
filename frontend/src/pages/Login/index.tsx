import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IcnApple from "../../assets/svgs/icons/apple.svg?react";
import IcnFacebook from "../../assets/svgs/icons/Facebook.svg?react";
import IcnGoogle from "../../assets/svgs/icons/google.svg?react";
import Button from "../../components/Button";
import HomeIllustration from "../../components/Illustration/HomeIllustration";
import InputField from "../../components/InputField";
import { useAuth } from "../../services/context";
import icons from "../../utils/icons";
import images from "../../utils/images";
import styles from "./styles.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>(""); // Estado do email
  const [password, setPassword] = useState<string>(""); // Estado da senha
  const [error, setError] = useState<any>(""); // Estado das mensagens erros
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado do carregamento
  const [showPassword, setShowPassword] = useState<boolean>(false); // Estado de mostrar a senha ou não

  const { login } = useAuth();

  // // Navega até a página do usuário caso já esteja autenticado
  // if (user) {
  //   return <Navigate to={"/user"} replace />;
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(email, password);

      if (!success) {
        setError("Email or password are incorrect");
        alert(error);
      }

      navigate("/user");
    } catch (err) {
      setError("Internal error. Try again later.");
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mostra a senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={images.logo} alt="TSAuth logo" aria-label="Logo" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.titleContainer}>
          <h1>Sign in</h1>
          <div className={styles.paragraphs}>
            <p>If you dont have an account register</p>
            <p>
              You can{" "}
              <span>
                <Link to={"/register"}>Register here!</Link>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <InputField
            id="password"
            icon={icons.padlock}
            inputType={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            label="Password"
            showEye={icons.invisible}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onClick={togglePasswordVisibility}
            disabled={isLoading}
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
          type="submit"
          label="Login"
          color="var(--color-primary-main)"
          marginTop={60}
          disabled={isLoading}
        />

        <div className={styles.continueContainer}>
          <p>or continue with</p>
          <div className={styles.iconsContainer}>
            <IcnFacebook />
            <IcnApple />
            <IcnGoogle />
          </div>
        </div>
      </form>

      <HomeIllustration message="Sign in to name" />
    </div>
  );
}
