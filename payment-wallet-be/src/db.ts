import mongoose, { model, Schema } from 'mongoose';
import * as dotenv from 'dotenv';
import { enableCompileCache } from 'module';
import { required } from 'zod/mini';


dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        console.log('MongoDB Connected via Mongoose');
    } catch (err: any) {
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};

interface UserI{
    email: string,
    password: any,
    age?: number,
    firstName: string,
    lastName: string,
}


const userSchema = new Schema<UserI>({
    email: {type: String, required: true, unique: true},
    password: { type: String, unique: true},
    firstName: String,
    lastName: String
})

const accountSchema = new Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance : {
        type: Number,
        required: true
    }
})

export const User = model("User", userSchema);
export const Account = model("Account", accountSchema)

export default connectDB;