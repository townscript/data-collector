"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Kinesis = require("aws-sdk/clients/kinesis");
var DataCollector_1 = require("./DataCollector");
var RecordData = /** @class */ (function () {
    function RecordData(data, config) {
        var _this = this;
        this.send = function () {
            new Kinesis({
                accessKeyId: _this._config.accessKeyId,
                secretAccessKey: _this._config.secretAccessKey,
                region: _this._config.region
            }).putRecord(_this._putRecord, function (err, data) {
                if (err)
                    console.log(err.message);
                console.info(data.ShardId);
            });
        };
        //Here adding new line in the end of the record so that AWS Athena process
        //S3 records properly.
        var kinesisData = JSON.stringify(data) + "\n";
        this._putRecord = {
            Data: kinesisData,
            PartitionKey: config.uniqueIdentifier,
            StreamName: DataCollector_1.DataCollector.getConfig().streamName
        };
        this._config = config;
    }
    RecordData.create = function (data, config) {
        return new RecordData(data, config);
    };
    return RecordData;
}());
exports.RecordData = RecordData;
