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
    console.error(`Updating user failed: ${error}`);
    throw error;
  }
};

// Excluir um usuário
export const deleteUser = async (
  id: string | undefined,
  token: string | null
): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error(`Deleting user failed: ${error}`);
    throw error;
  }
};
