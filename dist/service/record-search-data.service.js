"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Kinesis = require("aws-sdk/clients/kinesis");
var search_data_collector_service_1 = require("./search-data-collector.service");
var RecordSearchData = /** @class */ (function () {
    function RecordSearchData(data, config) {
        var _this = this;
        this.send = function () {
            new Kinesis({
                accessKeyId: _this._config.accessKeyId,
                secretAccessKey: _this._config.secretAccessKey,
                region: _this._config.region
            }).putRecord(Object.assign({}, _this._putRecord), function (err, data) {
                if (err)
                    console.log(err, err.stack);
                console.info(data.ShardId);
            });
        };
        //Here adding new line in the end of the record so that AWS Athena process
        //S3 records properly.
        var kinesisData = JSON.stringify(data, RecordSearchData.analyze) + "\n";
        this._putRecord = {
            Data: kinesisData,
            PartitionKey: config.uniqueIdentifier,
            StreamName: search_data_collector_service_1.SearchDataCollector.getConfig().streamName
        };
        this._config = config;
    }
    RecordSearchData.analyze = function (key, value) {
        return value;
    };
    RecordSearchData.create = function (data, config) {
        return new RecordSearchData(data, config);
    };
    return RecordSearchData;
}());
exports.RecordSearchData = RecordSearchData;
