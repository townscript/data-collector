import {PrimaryStreamDataModel} from "../../model/StreamData";
import {EventType} from "../../model/EventType";
import {RecordData} from "../publisher/RecordData";
import { BasicDataCollectorService } from "./basic-data-collector.service";
import { BasicStreamDataModel } from "../../model/basic-stream-data.model";

export class DataCollector extends BasicDataCollectorService {

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
        RecordData.create(DataCollector._dataCollector._config, DataCollector.getConfig().streamName).publishDataToKinesis(streamData);
    }

    static getStreamData = (eventType: string, absoluteUrl:string, relativeUrl:string,
                            loggedInUserId:string, personIdentifierId:string,
                            sessionId:string, city:string, country:string, postalCode:string,
                            region:string, ipaddress:string, eventLabel: string,
                            clickedLocation: string, customText1:string):PrimaryStreamDataModel =>{
                                let currentDate: Date = new Date();
                                let detailClientTimeStamp:string = currentDate.toString();
                                let basicStreamData: BasicStreamDataModel = BasicDataCollectorService.setBasicStreamData(absoluteUrl,relativeUrl,loggedInUserId,personIdentifierId,sessionId,city,country,postalCode,region,ipaddress);
                                let streamData:PrimaryStreamDataModel = basicStreamData;
                                streamData.eventType = eventType;
                                streamData.eventLabel = eventLabel;
                                streamData.detailClientTimeStamp = detailClientTimeStamp;
                                if(customText1){
                                    streamData.customText1 = customText1;
                                }
                                if(clickedLocation){
                                    streamData.clickedLocation = clickedLocation;
                                }
                                return streamData;
    };
}