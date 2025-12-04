import { Request, Response } from "express";
import { Router } from "express";
import { Account } from "../db";
import { authMiddleware } from "../middleware";
import mongoose from "mongoose";

const accountRouter = Router();

accountRouter.get('/balance', authMiddleware, async (req: any, res: Response) => {
    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: account?.balance
    })
})

accountRouter.post('/transfer', authMiddleware, async (req: any, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try{

    const { amount , to } = req.body;

    const account = await Account.findOne({
        userId: req.userId   // fetch userid of sender 
    }).session(session)     // this makes the about db operation part of transaction

    if(!account || account.balance < amount){
        await session.abortTransaction();   //this function rollsback everything if insufficient balance so amount is not deducted
        return res.status(400).json({
            message : "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session)

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message : "Invalid account"
        })
    }

    await Account.updateOne({
        userId: req.userId
    },
    {
        $inc: { balance: -amount } //amount reduced from sender account  //$inc : atomic increament, ensure safe updates inside transactions 
    }).session(session);

    await Account.updateOne({ 
        userId: to 
    },  
        { 
            $inc: { balance: amount } //amount added to reciver account 
        }
    ).session(session);

    await session.commitTransaction();

    res.json({
        message: "Transaction successful"
    })
    } catch(e){
        
        await session.abortTransaction();
        console.error("Transfer Error:", e);

        return res.status(500).json({
            message: "Transfer failed, something went wrong"
        });
    } finally {
        session.endSession();
    }

})

export default accountRouter;