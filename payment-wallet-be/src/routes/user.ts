import { Router} from "express";
import { Request, Response } from "express";
import { Account, User } from "../db";
import { safeParse, z } from 'zod';
import { required } from "zod/mini";
import { JWT_SECRET } from "../config";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { authMiddleware } from "../middleware";


const userRouter = Router();

userRouter.post('/signup', async (req: Request, res: Response) => {

    const userSchema = z.object({
        email : z.email().max(20),
        password: z.string(),
        firstName: z.string(),
        lastName: z.string()
    })

    const parsedData = userSchema.safeParse(req.body);
    
    try{
        if(!parsedData){
        return res.status(403).json({
            message: "Invalid format",
        })
    }

    const { email, password, firstName, lastName } = req.body;

    if(!parsedData){
        res.status(411).json({
            message: "Email already taken"
        })
    }

    const hashedPassword = bcrypt.hash(password, 10)

    const user = await User.create({
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName
    })

    const userId = user._id;
    
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);


    res.json({
        message: "Sign up success",
        token:token
    })
    } catch(e){
        res.status(500).json({
            message: "Internal server error"
        })
    }
    
})

userRouter.post('/signin', async (req: Request, res: Response) => {

    const signInData = z.object({
        email: z.email(),
        password: z.string()
    })

    const successData = signInData.safeParse(req.body);

    try{
        if(!successData){
        res.status(403).json({
            message : "Validation error"
        })
        }

        const { email,  password } = req.body;

        const user = await User.findOne({
            email
        })

        if(!user){
            res.json({
                message: "user does not exist"
            })
        }

        const decodedPassword = await bcrypt.compare(password, user?.password)

        if(!user){
            res.json({
                message: "invalid password"
            })
        }

        if(user){
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET)

            res.json({
                message: "Login success",
                token
            })
        }
        else{
            res.status(403).json({
                message: "Invalid creds"
            })
        }
    }catch(e){
            res.status(411).json({
            message: "Error while logging in"
        })
    }
})

userRouter.put('/update', authMiddleware, async (res: Response, req: Request) => {

    const updateBody = z.object({
        password: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional()
    })

    const parsedData = updateBody.safeParse(req.body);

    if(!parsedData){
        res.status(411).json({
            message: "Error while updating"
        })
    }

    const updateData: any = {}
    
    const { password, firstName, lastName } = req.body;

    if(password){
        const hash = await bcrypt.hash(password, 10);
        updateData.password = hash;
    }

    if(firstName) updateData.firstName = firstName;
    
    if(lastName) updateData.lastName = lastName;
    
    res.json({
        message: "Data updated successfully"
    })
})

userRouter.get('/bulk', authMiddleware, async (req: Request, res: Response) => {
    const filter = req.query.filter as string;

    const users = await User.find({
        $or : [{
            firstName : {
                "$regex": filter
            }
        },
        {
            lastName : {
                "$regex": filter 
            }
        }
    ]
    })

    res.json({
        user: users.map(user => ({
            firstName : user.firstName,
            lastName : user.lastName
        }))
    })

})  
export default userRouter;