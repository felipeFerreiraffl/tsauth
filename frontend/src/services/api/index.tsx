/* ---------- API ---------- */

import { useAuth } from "../context";
import { API_URL, type User } from "../types";

// Atualiza um usuário
export const updateUser = async (
  id: string | undefined,
  user: Partial<User>
): Promise<any> => {
  const { token } = useAuth();
  
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    const data = response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao atualizar usuário: ${error}`);
  }
};
