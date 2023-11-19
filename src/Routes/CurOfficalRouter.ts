import express from "express";
import { CurOfficialController } from "../Controllers/curOfficialController";


const CurOfficialRouter = express.Router();
const CurOfficial = new CurOfficialController();

CurOfficialRouter.get("/", CurOfficial.get);

export { CurOfficialRouter };
