import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import HomeIllustration from "../../components/Illustration/HomeIllustration";
import InputField from "../../components/InputField";
import { useAuth } from "../../services/context";
import icons from "../../utils/icons";
import images from "../../utils/images";
import styles from "./styles.module.css";

export default function SignUp() {
  const navigate = useNavigate();
  // Estado do form para enviar dados
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado do carregamento
  const [showPassword, setShowPassword] = useState<boolean>(false); // Estado de mostrar a senha ou não

  // Props da autenticação
  const { register } = useAuth();

  // // Se estiver logado, redireciona até a página de usuário
  // if (user) {
  //   return <Navigate to={"/user"} replace />;
  // }

  // Aplica as mudanças do valor input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Confirmar os dados para cadastro
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Valida se as senhas coincidem
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Valida se a senha ter menos que 6 dígitos
    if (formData.password.length < 6) {
      alert("Password can't have less than 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(
        formData.username,
        formData.email,
        formData.password
      );

      if (!success) {
        alert("Create user failed. Try again later.");
      }

      navigate("/user");

      // O AuthProvider já faz verificação de sucesso = true
    } catch (err) {
      alert("Internal error. Try again later.");
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
        <img src={images.logo} alt="TSAuth logo" />
      </div>

      <form onSubmit={handleSubmit}>
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
            value={formData.email}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <InputField
            label="Username"
            id="username"
            inputType="text"
            icon={icons.user}
            placeholder="Enter your User name"
            value={formData.username}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <InputField
            label="Password"
            id="password"
            inputType={showPassword ? "text" : "password"}
            icon={icons.padlock}
            placeholder="Enter your Password"
            showEye={icons.invisible}
            value={formData.password}
            onChange={handleInputChange}
            onClick={togglePasswordVisibility}
            minLength={6}
            disabled={isLoading}
          />
          <InputField
            label="Confrim Password"
            showEye={icons.invisible}
            id="confirmPassword"
            inputType={showPassword ? "text" : "password"}
            icon={icons.padlock}
            placeholder="Confirm your Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onClick={togglePasswordVisibility}
            disabled={isLoading}
          />
        </div>

        <Button
          color="var(--color-primary-main)"
          label={isLoading ? "Creating user..." : "Register"}
          type="submit"
          marginTop={58}
          disabled={isLoading}
        />
      </form>

      <HomeIllustration message="Sign Up to name" />
    </div>
  );
}
