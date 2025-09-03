/* ---------- ❌ Erro customizável baseado no status HTTP ---------- */

export interface CustomError extends Error {
  status?: number;
  statusCode?: number;
}
