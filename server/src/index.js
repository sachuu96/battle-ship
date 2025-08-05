const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require('./db');
dotenv.config();

const PORT = process.env.PORT | 4000;
async function startServer() {
  const app = express();
  app.use(cors());

  db.getDbInstance();
  app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:4000`)
  );
}

startServer();