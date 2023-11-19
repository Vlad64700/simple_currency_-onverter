import { SourceRus, SourceTjk} from "./sourses"

export interface ICur {
    CharCode : string
    Nominal : number,
    Name : string,
    Value : number,
}

export interface ISourse {
    getExchangeRate() : Promise<ICur[]>
}

export function getSource (counrty_code: string) : ISourse {
        switch (counrty_code) {
            case "RUS": 
                return new SourceRus();
            case "TJK": 
                return new SourceTjk();
            default:
                throw new Error("ошибка в коде страны");
        }

    }

