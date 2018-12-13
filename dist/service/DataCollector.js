"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventType_1 = require("../model/EventType");
var RecordData_1 = require("./RecordData");
var AWS = require("aws-sdk/global");
var DataCollector = /** @class */ (function () {
    function DataCollector(config) {
        this._disabled = false;
        this._config = config;
        AWS.config.accessKeyId = config.accessKeyId;
        AWS.config.secretAccessKey = config.secretAccessKey;
        AWS.config.region = config.region;
    }
    DataCollector.configure = function (config) {
        if (DataCollector._dataCollector) {
            throw new Error("Data collector is already initialized");
        }
        DataCollector._dataCollector = new DataCollector(config);
    };
    DataCollector.disable = function () {
        DataCollector._dataCollector._disabled = true;
    };
    DataCollector.isDisabled = function () {
        return DataCollector._dataCollector._disabled;
    };
    DataCollector.getConfig = function () {
        return DataCollector._dataCollector._config;
    };
    DataCollector.visitedPage = function (url) {
        if (DataCollector.isDisabled())
            return;
        var streamData = {
            eventType: EventType_1.EventType.PAGEVIEW,
            url: url,
            text: ''
        };
        RecordData_1.RecordData.create(streamData, DataCollector._dataCollector._config.uniqueIdentifier).send();
    };
    DataCollector.clicked = function (text) {
        if (DataCollector.isDisabled())
            return;
        var streamData = {
            eventType: EventType_1.EventType.CLICK,
            url: '',
            text: text
        };
        RecordData_1.RecordData.create(streamData, DataCollector._dataCollector._config.uniqueIdentifier).send();
    };
    return DataCollector;
}());
exports.DataCollector = DataCollector;
