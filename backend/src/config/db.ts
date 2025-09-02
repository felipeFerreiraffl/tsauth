/* ---------- Conexão com o MongoDB ---------- */

import mongoose from "mongoose";

const dbConnection = async (): Promise<any> => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB connected: ${connection}`);
  } catch (error) {
    console.error(`Connection failed. Exiting process: ${error}`);
    process.exit(1); // Saída da aplicação
  }
};

export default dbConnection;
