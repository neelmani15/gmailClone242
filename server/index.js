import express, { urlencoded } from "express";
import Connection from "./database/gmailDB.js";
import routes from "./routes/api_routes.js";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/',routes);

const PORT=8000;

Connection();

app.listen(PORT,()=>console.log(`Server is started on Port ${PORT}`));