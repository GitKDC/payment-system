import express from "express";
import rootRouter from './routes';
import cors from 'cors';
import jsonwebtoken from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(cors());   //middleware

app.use("/api/v1", rootRouter);


const PORT = 3000;
app.listen(PORT, ()=> {
    console.log("Server running on port 3000");
})


