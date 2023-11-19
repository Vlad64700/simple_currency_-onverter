import express from "express";
import { ConverterController } from "../Controllers/converterController";


const converRouter = express.Router();
const converter = new ConverterController();

converRouter.post("/", converter.convert);

export { converRouter };
