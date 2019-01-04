"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventType_1 = require("../model/EventType");
var RecordData_1 = require("./RecordData");
var AWS = require("aws-sdk/global");
var UUID_1 = require("./UUID");
var DataCollector = /** @class */ (function () {
    function DataCollector(config) {
        this._disabled = false;
        this._config = config;
        AWS.config.accessKeyId = config.accessKeyId;
        AWS.config.secretAccessKey = config.secretAccessKey;
        AWS.config.region = config.region;
    }
    DataCollector.configure = function (config) {
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
    DataCollector.visitedPage = function (absoluteUrl, relativeUrl, loggedInUserId, personIdentifierId, sessionId, city, country, postalCode, region, ipaddress, customText1) {
        DataCollector.callRecordData(EventType_1.EventType.PAGEVIEW, absoluteUrl, relativeUrl, loggedInUserId, personIdentifierId, sessionId, city, country, postalCode, region, ipaddress, "", "", customText1);
    };
    DataCollector.clicked = function (absoluteUrl, relativeUrl, loggedInUserId, personIdentifierId, sessionId, city, country, postalCode, region, ipaddress, eventLabel, clickedLocation, customText1) {
        DataCollector.callRecordData(EventType_1.EventType.CLICK, absoluteUrl, relativeUrl, loggedInUserId, personIdentifierId, sessionId, city, country, postalCode, region, ipaddress, eventLabel, clickedLocation, customText1);
    };
    DataCollector.callRecordData = function (eventType, absoluteUrl, relativeUrl, loggedInUserId, personIdentifierId, sessionId, city, country, postalCode, region, ipaddress, eventLabel, clickedLocation, customText1) {
        if (DataCollector.isDisabled())
            return;
        var streamData = DataCollector.getStreamData(eventType, absoluteUrl, relativeUrl, loggedInUserId, personIdentifierId, sessionId, city, country, postalCode, region, ipaddress, eventLabel, clickedLocation, customText1);
        RecordData_1.RecordData.create(streamData, DataCollector._dataCollector._config.uniqueIdentifier).send();
    };
    DataCollector.getStreamData = function (eventType, absoluteUrl, relativeUrl, loggedInUserId, personIdentifierId, sessionId, city, country, postalCode, region, ipaddress, eventLabel, clickedLocation, customText1) {
        var currentDate = new Date();
        var detailClientTimeStamp = currentDate.toString();
        var longClientTimeStamp = currentDate.getTime();
        var userAgentBrowser = DataCollector.getWebBrowserInfo();
        var recordId = UUID_1.UUID.generateUUID32();
        var streamData = {
            eventType: eventType,
            userAgentBrowser: userAgentBrowser,
            absoluteUrl: absoluteUrl,
            relativeUrl: relativeUrl,
            longClientTimeStamp: longClientTimeStamp,
            detailClientTimeStamp: detailClientTimeStamp,
            personIdentifierId: personIdentifierId,
            recordId: recordId,
            sessionId: sessionId
        };
        if (loggedInUserId) {
            streamData.loggedInUserId = loggedInUserId;
        }
        if (city) {
            streamData.city = city;
        }
        if (country) {
            streamData.country = country;
        }
        if (postalCode) {
            streamData.postalCode = postalCode;
        }
        if (region) {
            streamData.region = region;
        }
        if (customText1) {
            streamData.customText1 = customText1;
        }
        if (ipaddress) {
            streamData.ipaddress = ipaddress;
        }
        if (eventLabel) {
            streamData.eventLabel = eventLabel;
        }
        if (clickedLocation) {
            streamData.clickedLocation = clickedLocation;
        }
        return streamData;
    };
    DataCollector.getWebBrowserInfo = function () {
        try {
            var ua = window.navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return 'IE ' + (tem[1] || '');
            }
            if (M[1] === 'Chrome') {
                tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
                if (tem != null)
                    return tem.slice(1).join(' ').replace('OPR', 'Opera');
            }
            M = M[2] ? [M[1], M[2]] : [window.navigator.appName, window.navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/(\d+)/i)) != null)
                M.splice(1, 1, tem[1]);
            return M.join(' ');
        }
        catch (e) {
            return "Browser Detection Error";
        }
    };
    return DataCollector;
}());
exports.DataCollector = DataCollector;
