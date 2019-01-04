"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataCollector_1 = require("./DataCollector");
var UUID_1 = require("./UUID");
var BrowserStorage_1 = require("./BrowserStorage");
var EventType_1 = require("../model/EventType");
var DataProducer = /** @class */ (function () {
    function DataProducer(config) {
        this._config = config;
    }
    DataProducer.PERSON_IDENTIFIER_ID = 'personIdentifierId';
    DataProducer.SESSION_ID = "session_id";
    DataProducer.initialize = function (config, disable) {
        DataCollector_1.DataCollector.configure(config);
        if (disable) {
            DataCollector_1.DataCollector.disable();
        }
    };
    DataProducer.callPageView = function (loggedInUserId) {
        DataProducer.callDataCollector(EventType_1.EventType.PAGEVIEW, "", "", loggedInUserId);
    };
    DataProducer.callClickEvent = function (eventLabel, clickedLocation, loggedInUserId) {
        DataProducer.callDataCollector(EventType_1.EventType.CLICK, eventLabel, clickedLocation, loggedInUserId);
    };
    DataProducer.callDataCollector = function (eventType, eventLabel, clickedLocation, loggedInUserId) {
        try {
            var relativeUrl = window.location.pathname;
            var absoluteUrl = window.location.href;
            var personIdentifierId = BrowserStorage_1.BrowserStorage.getFieldFromLocalStorage(DataProducer.PERSON_IDENTIFIER_ID);
            if (!personIdentifierId) {
                personIdentifierId = UUID_1.UUID.generateUUID32();
                BrowserStorage_1.BrowserStorage.setFieldToLocalStorage(DataProducer.PERSON_IDENTIFIER_ID, personIdentifierId);
            }
            var sessionId = BrowserStorage_1.BrowserStorage.getCookie(DataProducer.SESSION_ID);
            if (!sessionId) {
                sessionId = UUID_1.UUID.generateUUID16();
                BrowserStorage_1.BrowserStorage.setCookie(DataProducer.SESSION_ID, sessionId, 0);
            }
            var ipInfoData = BrowserStorage_1.BrowserStorage.getFieldFromLocalStorage("ipinfo_data");
            var city = "", country = "", postal = "", region = "", ipaddress = "";
            if (ipInfoData) {
                var ipInfoJson = JSON.parse(ipInfoData);
                city = ipInfoJson.city;
                country = ipInfoJson.country;
                postal = ipInfoJson.postal;
                region = ipInfoJson.region;
                ipaddress = ipInfoJson.ip;
            }
            DataCollector_1.DataCollector.callRecordData(eventType, absoluteUrl, relativeUrl, loggedInUserId, personIdentifierId, sessionId, city, country, postal, region, ipaddress, eventLabel, clickedLocation, "");
        }
        catch (e) {
            console.log("exception while sending the data " + e);
        }
    };
    return DataProducer;
}());
exports.DataProducer = DataProducer;
