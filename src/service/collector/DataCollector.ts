import {Configuration} from "../../model/Configuration";
import {StreamData} from "../../model/StreamData";
import {EventType} from "../../model/EventType";
import {RecordData} from "../publisher/RecordData";
import {UUID} from "../shared/UUID";
import { UserMetaDataService } from "../shared/user-metadata.service";
declare var window: any;

export class DataCollector {
    private _config: Configuration;
    private static _dataCollector: DataCollector;
    private _disabled: boolean = false;

    private constructor(config: Configuration) {
        this._config = config;
    }

    static configure = (config: Configuration):void => {
        DataCollector._dataCollector = new DataCollector(config);
    };

    static disable = ():void => {
        DataCollector._dataCollector._disabled = true;
    };

    static isDisabled = ():boolean => {
        return DataCollector._dataCollector._disabled;
    };

    static getConfig = ():Configuration => {
        return DataCollector._dataCollector._config;
    };

    static visitedPage = (absoluteUrl:string, relativeUrl:string,
                          loggedInUserId:string, personIdentifierId:string,
                          sessionId:string, city:string, country:string, postalCode:string,
                          region:string, ipaddress:string, customText1:string):void => {

        DataCollector.callRecordData(EventType.PAGEVIEW,absoluteUrl, relativeUrl,
            loggedInUserId, personIdentifierId, sessionId, city,
            country, postalCode, region, ipaddress, "", "", customText1);
    };

    static clicked = (absoluteUrl:string, relativeUrl:string,
                      loggedInUserId:string, personIdentifierId:string,
                      sessionId:string, city:string, country:string, postalCode:string,
                      region:string, ipaddress:string, eventLabel: string,
                      clickedLocation: string, customText1:string):void => {

        DataCollector.callRecordData(EventType.CLICK,absoluteUrl, relativeUrl,
            loggedInUserId, personIdentifierId, sessionId, city,
            country, postalCode, region, ipaddress, eventLabel, clickedLocation, customText1);
    };

    static callRecordData = (eventType: string, absoluteUrl:string, relativeUrl:string,
                             loggedInUserId:string, personIdentifierId:string,
                             sessionId:string, city:string, country:string, postalCode:string,
                             region:string, ipaddress:string, eventLabel: string,
                             clickedLocation: string, customText1:string):void => {
        if (DataCollector.isDisabled())
            return;

        let streamData = DataCollector.getStreamData(eventType,absoluteUrl, relativeUrl,
            loggedInUserId, personIdentifierId, sessionId, city,
            country, postalCode, region, ipaddress, eventLabel, clickedLocation, customText1);
        RecordData.create(streamData, DataCollector._dataCollector._config).send();
    }

    static getStreamData = (eventType: string, absoluteUrl:string, relativeUrl:string,
                            loggedInUserId:string, personIdentifierId:string,
                            sessionId:string, city:string, country:string, postalCode:string,
                            region:string, ipaddress:string, eventLabel: string,
                            clickedLocation: string, customText1:string):StreamData =>{
        let currentDate: Date = new Date();
        let detailClientTimeStamp:string = currentDate.toString();
        let longClientTimeStamp: number = currentDate.getTime();
        let userAgentBrowser: string = UserMetaDataService.getWebBrowserInfo();
        let recordId: string = UUID.generateUUID32();
        let userDevice: string = UserMetaDataService.isDevicePhone() ? "Phone" : "Desktop";
        let streamData:StreamData = {
            eventType: eventType,
            userAgentBrowser: userAgentBrowser,
            absoluteUrl: absoluteUrl,
            relativeUrl: relativeUrl,
            longClientTimeStamp: longClientTimeStamp,
            detailClientTimeStamp: detailClientTimeStamp,
            personIdentifierId: personIdentifierId,
            recordId: recordId,
            sessionId: sessionId,
            clienttimestamp:currentDate,
            userDevice: userDevice
        };
        if(loggedInUserId){
            streamData.loggedInUserId = loggedInUserId;
        }
        if(city){
            streamData.city = city;
        }
        if(country){
            streamData.country = country;
        }
        if(postalCode){
            streamData.postalCode = postalCode;
        }
        if(region){
            streamData.region = region;
        }
        if(customText1){
            streamData.customText1 = customText1;
        }
        if(ipaddress){
            streamData.ipaddress = ipaddress;
        }
        if(eventLabel){
            streamData.eventLabel = eventLabel;
        }
        if(clickedLocation){
            streamData.clickedLocation = clickedLocation;
        }
        return streamData;
    };
}