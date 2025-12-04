import { Router } from "express";
import { Express } from "express";
import userRouter from './user';
import accountRouter from "./account";

const router = Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

export default router;