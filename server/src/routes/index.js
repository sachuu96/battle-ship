import express from "express";
const router = express.Router();

import userRouter from "./user.js";

router.use('/users', userRouter);

export default router;
