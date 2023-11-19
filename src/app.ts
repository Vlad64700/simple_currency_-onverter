import express from "express";
//@ts-ignore
import cors from "cors";

import { CurOfficialRouter } from "./Routes/CurOfficalRouter";
import { converRouter } from "./Routes/ConvertRouter";


const app = express();
app.use(cors());
//автопарсинг json'ов
app.use(express.json());

//конфигурация контроллеров и роутов которым они отвечают
app.use("/api/cur", CurOfficialRouter);
app.use("/api/convert", converRouter);

export default app;
