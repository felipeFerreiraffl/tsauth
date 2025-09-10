/* ---------- API ---------- */

import { API_URL, type User } from "../types";

// Atualiza um usuário
export const updateUser = async (
  id: string | undefined,
  user: Partial<User>,
  token: string | null
): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erro ao atualizar usuário: ${error}`);
    throw error;
  }
};
