/* ---------- 💾 Conexão com o MongoDB ---------- */

import mongoose from "mongoose";

const dbConnection = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI as string);

    console.log("✅ MongoDB connected successfully");
    console.log(`🛜  Database: ${connection.connection.name}`);
  } catch (error) {
    console.error(`❌ Connection failed. Exiting process: ${error}`);
    process.exit(1); // Saída da aplicação
  }
};

export default dbConnection;
