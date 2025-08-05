import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "./db";
// import { getDbInstance } from "./db";
dotenv.config();

const PORT = process.env.PORT | 4000;
async function startServer() {
  const app = express();
  app.use(cors());

  // getDbInstance();
  app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:4000`)
  );
}

startServer();
