import {Configuration} from "./Configuration";
import {StreamData} from "./StreamData";
import {EventType} from "./EventType";
import {RecordData} from "./RecordData";
import * as AWS from "aws-sdk/global";

export class DataCollector {
    private _config: Configuration;
    private static _dataCollector: DataCollector;
    private _disabled: boolean = false;

    private constructor(config: Configuration) {
        this._config = config;
        AWS.config.accessKeyId = config.accessKeyId;
        AWS.config.secretAccessKey = config.secretAccessKey;
        AWS.config.region = config.region;
    }

    static configure = (config: Configuration):void => {
        if(DataCollector._dataCollector){
            throw new Error("Data collector is already initialized");
        }
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

    static visitedPage = (url: string):void => {
        if (DataCollector.isDisabled())
            return;
        let streamData:StreamData = {
           eventType: EventType.PAGEVIEW,
           url: url,
           text: ''
        };

        RecordData.create(streamData, DataCollector._dataCollector._config.uniqueIdentifier).send();
    };

    static clicked = (text: string):void => {
        if (DataCollector.isDisabled())
            return;
        let streamData:StreamData = {
            eventType: EventType.CLICK,
            url: '',
            text: text
        };

        RecordData.create(streamData, DataCollector._dataCollector._config.uniqueIdentifier).send();
    };
}