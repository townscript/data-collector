import {StreamData} from "../model/StreamData";
import * as Kinesis from "aws-sdk/clients/kinesis";
import {DataCollector} from "./DataCollector";

export class RecordData {
    private readonly _putRecord: Kinesis.PutRecordInput;

    private constructor(data:StreamData, uniqueIdentifier: string){
        this._putRecord = {
            Data: JSON.stringify(data),
            PartitionKey: uniqueIdentifier,
            StreamName: DataCollector.getConfig().streamName
        };
    }

    static create = (data:StreamData, uniqueIdentifier: string):RecordData => {
        return new RecordData(data, uniqueIdentifier);
    };

    send = () => {
        new Kinesis().putRecord(this._putRecord, (err, data) => {
           if(err)
               console.log(err.message);
           console.info(data.ShardId);
        });
    };

}