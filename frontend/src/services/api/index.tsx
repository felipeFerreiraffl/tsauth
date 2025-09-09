/* ---------- API ---------- */

import { useAuth } from "../context";
import { API_URL, type User } from "../types";

const { token } = useAuth();

// Atualiza um usuário
export const updateUser = async (
  id: string | undefined,
  user: Partial<User>
): Promise<any> => {
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
