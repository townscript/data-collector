import {SearchStreamDataModel} from "../../model/search-stream.model";
import * as Kinesis from "aws-sdk/clients/kinesis";
import {SearchDataCollector} from "../collector/search-data-collector.service";
import {Configuration} from "../../model/Configuration";

export class RecordSearchData {
    private readonly _putRecord: Kinesis.PutRecordInput;
    private _config: Configuration;

    private constructor(data:SearchStreamDataModel,  config: Configuration){
        //Here adding new line in the end of the record so that AWS Athena process
        //S3 records properly.
        let kinesisData = JSON.stringify(data,  RecordSearchData.analyze) + "\n";
        this._putRecord = {
            Data: kinesisData,
            PartitionKey: config.uniqueIdentifier,
            StreamName: SearchDataCollector.getConfig().streamName
        };
        this._config = config;
    }
    static analyze = (key: any, value: any) => {
        return value;
    };
    static create = (data:SearchStreamDataModel, config: Configuration):RecordSearchData => {
        return new RecordSearchData(data, config);
    };

    send = () => {
        new Kinesis({
            accessKeyId: this._config.accessKeyId,
            secretAccessKey: this._config.secretAccessKey,
            region: this._config.region
        }).putRecord(Object.assign({},this._putRecord), (err, data) => {
           if(err)
               console.log(err, err.stack);
           console.info(data.ShardId);
        });
    };

}