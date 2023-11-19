
import { ICur, getSource } from "../sourcesCur/sourse"
import { xml2js, xml2json } from "xml-js";



class api_cur_official {
  // Table users
  async getCurOfficialByCountry(code_counrty : string) {

    let res : ICur[];
    try {
        res = await getSource(code_counrty).getExchangeRate();
        return res;
    }
    catch (e: any){
        return e.message;
    }
  }

}

const cur_official = new api_cur_official();
export { cur_official };
