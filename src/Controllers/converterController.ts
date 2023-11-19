import { Request, Response } from "express";

import {converter} from "../api/converter"


interface IInput {
    source_cur : string,
    target_cur : string,
    sum : number,
    code_source : string,
}

export class ConverterController {
  async convert(req: Request<{}, {}, IInput, {}>, res: Response) {
    try {
      const { source_cur, target_cur , sum, code_source }  = req.body;

      const res_ = await converter.convert(source_cur, target_cur , sum, code_source);
      return res.json(res_);
    } catch (e) {
      return res
        .status(400)
        .json({ message: `${e}` });
    }
  }

}
