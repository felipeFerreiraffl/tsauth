import { Navigate, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import DevIllustration from "../../components/Illustration/DevIllustration";
import InfoField from "../../components/InfoField";
import { useAuth } from "../../services/context";
import icons from "../../utils/icons";
import images from "../../utils/images";
import styles from "./styles.module.css";
import React, { useState } from "react";
import { updateUser } from "../../services/api";

export default function User() {
  // Informações da API
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: user?.password || "",
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      updatedData.username = formData.username.trim();
    }

    if (formData.email !== user?.email && formData.email.trim()) {
      updatedData.email = formData.email.trim();
    }

    if (formData.password !== user?.password && formData.password.trim()) {
      updatedData.password = formData.password.trim();
    }

    try {
      const success = await updateUser(user?._id, updatedData);

      if (!success) {
        alert("Erro ao atualizar os dados");
        return;
      }

      alert("Dados atualizados com sucesso");
      setFormData(success);
      setEditMode(false);
    } catch (error) {
      alert("Erro interno. Tente novamente.");
    } finally {
      setIsLoading(true);
    }
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
              onChange={handleInputChange}
              editable={editMode}
            />
            <InfoField
              icon={icons.email}
              label="Email"
              id="email"
              type="email"
              value={user?.email}
              onChange={handleInputChange}
              editable={editMode}
            />
            <InfoField
              icon={icons.padlock}
              label="Password"
              id="password"
              type="password"
              value={user?.password}
              onChange={handleInputChange}
              editable={editMode}
              showEye
            />
          </div>
        </div>

        <div className={styles.btnContainer}>
          <Button
            color="var(--color-primary-main)"
            label={editMode ? "Confirm" : "Change informations"}
            onClick={handleEditMode}
            disabled={isLoading}
            type="submit"
          />
          <Button
            color="none"
            border="2px solid var(--color-primary-main)"
            label={editMode ? "Cancel" : "Sign out"}
            onClick={editMode ? () => setEditMode(false) : handleLogout}
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
