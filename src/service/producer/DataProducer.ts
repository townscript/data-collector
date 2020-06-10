import {DataCollector} from "../collector/DataCollector";
import {Configuration} from "../../model/Configuration";
import {EventType} from "../../model/EventType";
import {BasicStreamMetadataModel} from '../../model/basic-stream-metadata.model';
import { BasicDataProducerService } from "./basic-data-producer.service";

export class DataProducer extends BasicDataProducerService {

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
            let basicStreamMetaData: BasicStreamMetadataModel = BasicDataProducerService.generatePrimaryDataForCollector();
            DataCollector.callRecordData(eventType, basicStreamMetaData.absoluteUrl, basicStreamMetaData.relativeUrl,loggedInUserId, basicStreamMetaData.personIdentifierId,
                basicStreamMetaData.sessionId, basicStreamMetaData.city, basicStreamMetaData.country, basicStreamMetaData.postal, basicStreamMetaData.region, basicStreamMetaData.ipaddress, eventLabel, clickedLocation,  "");
        }
        catch(e){
            console.log("exception while sending the data " + e);
        }
    };
}