import { ICur, getSource } from "../sourcesCur/sourse";
import { xml2js, xml2json } from "xml-js";

class api_converter {
  // Table users
  async convert(
    source_cur: string,
    target_cur: string,
    sum: number,
    code_source: string
  ) {
    let curs: ICur[];
    let res: number;

    let cur_sourse: ICur = {
      CharCode: "",
      Nominal: 1,
      Name: "",
      Value: 1,
    };
    let cur_target: ICur = {
      CharCode: "",
      Nominal: 1,
      Name: "",
      Value: 1,
    };
    try {
      curs = await getSource(code_source).getExchangeRate();
    } catch (e) {
      code_source = "RUS";
      curs = await getSource(code_source).getExchangeRate();
    }
    curs.forEach((element) => {
      if (element.CharCode === source_cur) {
        cur_sourse = element;
      }
      if (element.CharCode === target_cur) {
        cur_target = element;
      }
    });

    if (
      cur_sourse.CharCode === source_cur &&
      cur_target.CharCode === target_cur
    ) {
      //перевод валюты
      let res_sum =
        (sum * (cur_sourse.Value / cur_sourse.Nominal)) /
        (cur_target.Value / cur_target.Nominal);
      return {
        cur_sourse: source_cur,
        target_cur: target_cur,
        input_sum: sum,
        output_sum: res_sum,
        source: code_source,
      };
    } else {
      throw new Error(
        "неверный код валюты или этого кода нет в базе источника"
      );
    }
  }
}

const converter = new api_converter();
export { converter };
