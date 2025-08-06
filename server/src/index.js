import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const PORT = process.env.PORT | 4000;
async function startServer() {

  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use('/api',router);

  app.use(errorHandler);
  
  app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:4000`)
  );
}

startServer();
