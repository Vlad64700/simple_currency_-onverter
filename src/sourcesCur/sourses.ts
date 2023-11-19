import {ISourse, ICur} from "./sourse"
import { xml2js, xml2json } from "xml-js";

export class SourceRus implements ISourse {
    async getExchangeRate() : Promise<ICur[]> {
    let res : ICur[] = new Array<ICur>

    let response = await fetch("http://www.cbr.ru/scripts/XML_daily.asp", { headers : {
        'Content-Type': 'charset=utf-8'
    }});

    if (response.ok) { 
        let xml = await response.arrayBuffer();
        let xml_ru = new TextDecoder('windows-1251').decode(xml);
        let courses : any = await xml2js(xml_ru, {compact : true});
        for (let i=0; i<courses.ValCurs.Valute.length; i++) {
            res.push({
                CharCode : courses.ValCurs.Valute[i].CharCode._text,
                Nominal : +courses.ValCurs.Valute[i].Nominal._text,
                Name : courses.ValCurs.Valute[i].Name._text,
                Value : +courses.ValCurs.Valute[i].Value._text.replace(',', '.'),
            })
        }

        res.push({
            CharCode : "RUB",
            Nominal : 1,
            Name : "Рубль",
            Value : 1,
        })
        return res
    }
    else {
        return res;
    }
}
}


export class SourceTjk implements ISourse {
    async getExchangeRate() : Promise<ICur[]> {
    let res : ICur[] = new Array<ICur>

    let current_date: Date = new Date();
    let yesterday_date: Date = new Date();
    yesterday_date.setDate(current_date.getDate() - 1);

    let current_date_str = `${current_date.getFullYear()}-${current_date.getMonth()}-${current_date.getDate()}`;
    let yesterday_date_str = `${yesterday_date.getFullYear()}-${yesterday_date.getMonth()}-${yesterday_date.getDate()}`;

    let response = await fetch(`https://apigw1.bot.or.th/bot/public/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/?start_period=${yesterday_date_str}&end_period=${current_date_str}`, 
    { 
        headers : {'X-IBM-Client-Id': 'c2bbe063-d0ff-456c-bc08-fbd5115fb340'}
    });

    if (response.ok) { 
        let res_json = await response.json();

        for (let i=0; i<res_json.result.data.data_detail.length; i++) {
            res.push({
                CharCode : res_json.result.data.data_detail[i].currency_id,
                Nominal : 1,
                Value : res_json.result.data.data_detail[i].buying_transfer,
                Name: res_json.result.data.data_detail[i].currency_name_eng
            })
        }
        res.push({
            CharCode : "THB",
            Nominal : 1,
            Name : "THB",
            Value : 1,
        })
        return res
    }
    else {
        return res;
    }
}
}