import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import DevIllustration from "../../components/Illustration/DevIllustration";

import InfoField from "../../components/InfoField";
import { updateUser } from "../../services/api";
import { useAuth } from "../../services/context";
import icons from "../../utils/icons";
import images from "../../utils/images";
import styles from "./styles.module.css";

export default function User() {
  // Informações da API
  const { user, logout, token, updateUserData } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de mostrar senha ou não
  const [showPassword, setShowPassword] = useState<boolean>(false); // Estado de mostrar a senha ou não

  // Sempre atualiza os dados que precisar
  useEffect(() => {
    if (user) {
      setFormData({
        username: user?.username || "",
        email: user?.email || "",
        password: "",
      });
    }
  }, [user]);

  console.log(`User: ${JSON.stringify(user)}`);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Ativa o modo de edição
  const handleEditMode = () => {
    setEditMode(true);
  };

  // Detecta mudanças do input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Prepara os dados para o envio
    const updatedData: any = {};

    // Insere os dados atualizados
    if (formData.username !== user?.username && formData.username.trim()) {
      updatedData.username = formData.username;
    }

    if (formData.email !== user?.email && formData.email.trim()) {
      updatedData.email = formData.email;
    }

    if (formData.password.trim()) {
      updatedData.password = formData.password;
    }

    console.log(
      `Objeto de dados para atualizar: ${JSON.stringify(updatedData)}`
    );

    // Verifica se os dados foram atualizados
    if (Object.keys(updatedData).length === 0) {
      alert("Nenhum dado foi modificado");
      setIsLoading(false);
      setEditMode(false);
      return;
    }

    try {
      if (!token) {
        alert("Token não identificado");
        return;
      }

      const success = await updateUser(user?._id, updatedData, token);

      if (!success) {
        alert("Erro ao atualizar os dados");
        return;
      }

      console.log(`Usuário atualizado: ${updatedData}`);

      // Atualiza o estado do context de usuário atualizado
      if (success.user) {
        updateUserData(success.user);
      }

      alert("Dados atualizados com sucesso");
      setFormData((prev) => ({
        ...prev,
        password: "",
      }));

      setEditMode(false);
    } catch (error) {
      console.error(`Erro ao atualizar dados: ${error}`);
      alert("Erro interno. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Cancela a operação e restaura os dados originais
  const handleCancel = () => {
    setFormData({
      username: user?.username || "",
      email: user?.email || "",
      password: "",
    });

    setEditMode(false);
  };

  // Mostra senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              value={formData.username}
              onChange={handleInputChange}
              readonly={!editMode}
              disabled={!editMode}
            />
            <InfoField
              icon={icons.email}
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              readonly={!editMode}
              disabled={!editMode}
            />
            <InfoField
              icon={icons.padlock}
              label="Password"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              readonly={!editMode}
              disabled={!editMode}
              onClick={togglePasswordVisibility}
              showEye
            />
          </div>
        </div>

        <div className={styles.btnContainer}>
          <Button
            color="var(--color-primary-main)"
            label={editMode ? "Confirm" : "Change informations"}
            onClick={editMode ? handleSubmit : handleEditMode}
            disabled={isLoading}
            type="submit"
          />
          <Button
            color="none"
            border="2px solid var(--color-primary-main)"
            label={editMode ? "Cancel" : "Sign out"}
            onClick={editMode ? handleCancel : handleLogout}
          />
          {!editMode && (
            <Button
              color="var(--color-auxiliary-red)"
              label="Delete account"
              // onClick={() => ""}
            />
          )}
        </div>
      </div>

      <DevIllustration />
    </div>
  );
}
