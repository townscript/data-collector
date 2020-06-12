import { Configuration } from "../../model/Configuration";
import { BasicStreamDataModel } from "../../model/basic-stream-data.model";
import { UserMetaDataService } from "../shared/user-metadata.service";
import { UUID } from "../shared/UUID";

export class BasicDataCollectorService {
    public _config: Configuration;
    public static _dataCollector: BasicDataCollectorService;
    public _disabled: boolean = false;

    public constructor(config: Configuration) {
        this._config = config;
    }

    static configure = (config: Configuration):void => {
        BasicDataCollectorService._dataCollector = new BasicDataCollectorService(config);
    };

    static disable = ():void => {
        BasicDataCollectorService._dataCollector._disabled = true;
    };

    static isDisabled = ():boolean => {
        return BasicDataCollectorService._dataCollector._disabled;
    };

    static getConfig = ():Configuration => {
        return BasicDataCollectorService._dataCollector._config;
    };

    static setBasicStreamData = (absoluteUrl:string, relativeUrl:string,
        loggedInUserId:string, personIdentifierId:string,
        sessionId:string, city:string, country:string, postalCode:string,
        region:string, ipaddress:string):BasicStreamDataModel => {
            let userAgentBrowser: string = UserMetaDataService.getWebBrowserInfo();
            let currentDate: Date = new Date();
            let longClientTimeStamp: number = currentDate.getTime();
            let recordId: string = UUID.generateUUID32();
            let userDevice: string = UserMetaDataService.isDevicePhone() ? "Phone" : "Desktop"; 
            
            let basicStreamData: BasicStreamDataModel = {
                userAgentBrowser: userAgentBrowser,
                absoluteUrl: absoluteUrl,
                relativeUrl: relativeUrl,
                longClientTimeStamp: longClientTimeStamp,
                personIdentifierId: personIdentifierId,
                recordId: recordId,
                sessionId: sessionId,
                clientTimeStamp:currentDate,
                userDevice: userDevice
            };
            if(loggedInUserId){
                basicStreamData.loggedInUserId = loggedInUserId;
            }
            if(city){
                basicStreamData.city = city;
            }
            if(country){
                basicStreamData.country = country;
            }
            if(postalCode){
                basicStreamData.postalCode = postalCode;
            }
            if(ipaddress){
                basicStreamData.ipAddress = ipaddress;
            }
            if(region){
                basicStreamData.region = region;
            }
            return basicStreamData;
    }

}