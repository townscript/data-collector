"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Kinesis = require("aws-sdk/clients/kinesis");
var index_1 = require("./index");
var RecordData = /** @class */ (function () {
    function RecordData(data, uniqueIdentifier) {
        var _this = this;
        this.send = function () {
            new Kinesis().putRecord(_this._putRecord, function (err, data) {
                if (err)
                    console.log(err.message);
                console.info(data.ShardId);
            });
        };
        this._putRecord = {
            Data: JSON.stringify(data),
            PartitionKey: uniqueIdentifier,
            StreamName: index_1.DataCollector.getCofig().streamName
        };
    }
    RecordData.create = function (data, uniqueIdentifier) {
        return new RecordData(data, uniqueIdentifier);
    };
    return RecordData;
}());
exports.RecordData = RecordData;
