/* ---------- Mensagens de status ---------- */

import type { NextFunction, Request, Response } from "express";
import type { CustomError } from "../../utils/customError.js";

// Mensagens de resposta dos status
const getStatusMessage = (status: number): string => {
  //   Record para assinalar os números dos erros e suas mensagens
  const statusMessage: Record<number, string> = {
    200: "OK",
    201: "CREATED",
    400: "BAD REQUEST",
    401: "UNAUTHORIZED",
    404: "NOT FOUND",
    500: "INTERNAL SERVER ERROR",
    503: "BAD GATEWAY",
  };

  return statusMessage[status] || "UNKOWN";
};

// Respostas de sucesso (>=200)
export const successLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const defautSend = res.send;

  res.send = function (body: any) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log(
        `Success: ${res.statusCode} ${getStatusMessage(res.statusCode)}`
      );
    }

    return defautSend.call(this, body);
  };

  next();
};

// Permite definir o número do status do HTTP de sucesso
export const setSuccessStatus = (
  status: number,
  res: Response,
  message?: string
): Response => {
  res.status(status);
  console.log(`Success: ${status} ${getStatusMessage(status)}`);

  if (message) {
    return res.json({ message: message });
  }

  return res;
};

// Erros de servidor ou outros de outros tipos
export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Envia a mensagem padrão caso já tenha sido dada a resposta
  if (res.headersSent) {
    return next(error);
  }

  const status = error.status || error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  console.error(`Error - ${status} ${getStatusMessage(status)}: ${message}`);

  const responseMessage =
    status === 500 && (process.env.NODE_ENV as string) === "production"
      ? "Internal Server Error"
      : message;

  res.json({
    error: true,
    status,
    message: responseMessage,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};

// Erros 404
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error: CustomError = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = 404;
  next(error);
};
