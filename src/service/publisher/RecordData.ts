import * as Kinesis from "aws-sdk/clients/kinesis";
import {Configuration} from "../../model/Configuration";
import { SearchDataCollectorService } from "../collector/search-data-collector.service";

export class RecordData {
    private _putRecord!: Kinesis.PutRecordInput;
    private _config: Configuration;

    private constructor(config: Configuration){
        //Here adding new line in the end of the record so that AWS Athena process
        //S3 records properly.
        this._config = config;
    }

    analyze = (key: any, value: any) => {
        return value;
    };

    static create = (config: Configuration, streamName: string):RecordData => {
        config.streamName = streamName;
        return new RecordData(config);
    };

    publishDataToKinesis(data: any) {
        let kinesisData = JSON.stringify(data, this.analyze) + "\n";
        this._putRecord = {
            Data: kinesisData,
            PartitionKey: this._config.uniqueIdentifier,
            StreamName: this._config.streamName
        };
        new Kinesis({
            accessKeyId: this._config.accessKeyId,
            secretAccessKey: this._config.secretAccessKey,
            region: this._config.region
        }).putRecord(this._putRecord, (err, data) => {
           if(err)
               console.log(err.message);
           console.info(data.ShardId);
        });
    }

}