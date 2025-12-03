import { Router } from "express";
import { Express } from "express";
import userRouter from './user';

const router = Router();

router.use("/user", userRouter);

export default router;