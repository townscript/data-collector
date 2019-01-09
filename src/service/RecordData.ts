import {StreamData} from "../model/StreamData";
import * as Kinesis from "aws-sdk/clients/kinesis";
import {DataCollector} from "./DataCollector";
import {Configuration} from "../model/Configuration";

export class RecordData {
    private readonly _putRecord: Kinesis.PutRecordInput;
    private _config: Configuration;

    private constructor(data:StreamData,  config: Configuration){
        //Here adding new line in the end of the record so that AWS Athena process
        //S3 records properly.
        let kinesisData = JSON.stringify(data) + "\n";
        this._putRecord = {
            Data: kinesisData,
            PartitionKey: config.uniqueIdentifier,
            StreamName: DataCollector.getConfig().streamName
        };
        this._config = config;
    }

    static create = (data:StreamData, config: Configuration):RecordData => {
        return new RecordData(data, config);
    };

    send = () => {
        new Kinesis({
            accessKeyId: this._config.accessKeyId,
            secretAccessKey: this._config.secretAccessKey,
            region: this._config.region
        }).putRecord(this._putRecord, (err, data) => {
           if(err)
               console.log(err.message);
           console.info(data.ShardId);
        });
    };

}