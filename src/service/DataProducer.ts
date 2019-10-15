import {DataCollector} from "./DataCollector";
import {Configuration} from "../model/Configuration";
import {UUID} from "./UUID";
import {BrowserStorage} from "./BrowserStorage";
import {EventType} from "../model/EventType";

declare var window: any;

export class DataProducer {

    private static PERSON_IDENTIFIER_ID: string = 'personIdentifierId';
    private static SESSION_ID: string = "session_id";
    private _config: Configuration;

    private constructor(config: Configuration) {
        this._config = config;
    }

    static initialize = (config: Configuration, disable: boolean) =>{
        DataCollector.configure(config);
        if(disable){
            DataCollector.disable();
        }
    };

    static callPageView = (loggedInUserId: string) =>{
        DataProducer.callDataCollector(EventType.PAGEVIEW, "", "", loggedInUserId);
    };

    static callClickEvent = (eventLabel: string, clickedLocation: string, loggedInUserId: string) =>{
        DataProducer.callDataCollector(EventType.CLICK, eventLabel, clickedLocation, loggedInUserId);
    };

    static callDataCollector = (eventType:string, eventLabel: string, clickedLocation: string, loggedInUserId: string)=>{
        try{
            let relativeUrl = window.location.pathname;
            let absoluteUrl = window.location.href;

            let personIdentifierId = BrowserStorage.getFieldFromLocalStorage(DataProducer.PERSON_IDENTIFIER_ID);
            if(!personIdentifierId){
                personIdentifierId = UUID.generateUUID32();
                BrowserStorage.setFieldToLocalStorage(DataProducer.PERSON_IDENTIFIER_ID, personIdentifierId);
            }

            let sessionId = BrowserStorage.getCookie(DataProducer.SESSION_ID);
            if(!sessionId){
                sessionId = UUID.generateUUID16();
                BrowserStorage.setSessionId(DataProducer.SESSION_ID, sessionId);
            }

            let ipInfoData = BrowserStorage.getFieldFromLocalStorage("ipinfo_data");
            let city: string = "", country: string = "", postal: string = "",
                region: string = "", ipaddress: string = "";
            if(ipInfoData){
                let ipInfoJson = JSON.parse(ipInfoData);
                city = ipInfoJson.city;
                country = ipInfoJson.country;
                postal = ipInfoJson.postal;
                region = ipInfoJson.region;
                ipaddress = ipInfoJson.ip;
            }
            DataCollector.callRecordData(eventType, absoluteUrl, relativeUrl,loggedInUserId, personIdentifierId,
                sessionId, city, country, postal,region, ipaddress, eventLabel, clickedLocation,  "");
        }
        catch(e){
            console.log("exception while sending the data " + e);
        }
    };
}