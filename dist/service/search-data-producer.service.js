"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var search_data_collector_service_1 = require("./search-data-collector.service");
var UUID_1 = require("./UUID");
var BrowserStorage_1 = require("./BrowserStorage");
var event_data_model_1 = require("../model/search-stream-helper-model/event-data.model");
var organizer_data_model_1 = require("../model/search-stream-helper-model/organizer-data.model");
var search_suggestion_data_mode_1 = require("../model/search-stream-helper-model/search-suggestion-data.mode");
var SearchDataProducer = /** @class */ (function () {
    function SearchDataProducer(config) {
        this._config = config;
    }
    SearchDataProducer.PERSON_IDENTIFIER_ID = 'personIdentifierId';
    SearchDataProducer.SESSION_ID = "session_id";
    SearchDataProducer.initialize = function (config, disable) {
        search_data_collector_service_1.SearchDataCollector.configure(config);
        if (disable) {
            search_data_collector_service_1.SearchDataCollector.disable();
        }
    };
    SearchDataProducer.callSearchDataCollector = function (typedText, searchIntent, searchSuggestions, eventCount, eventsListed, organizersListed, loggedInUserId, pageNumber) {
        try {
            var relativeUrl = window.location.pathname;
            var absoluteUrl = window.location.href;
            var personIdentifierId = BrowserStorage_1.BrowserStorage.getFieldFromLocalStorage(SearchDataProducer.PERSON_IDENTIFIER_ID);
            if (!personIdentifierId) {
                personIdentifierId = UUID_1.UUID.generateUUID32();
                BrowserStorage_1.BrowserStorage.setFieldToLocalStorage(SearchDataProducer.PERSON_IDENTIFIER_ID, personIdentifierId);
            }
            var sessionId = BrowserStorage_1.BrowserStorage.getCookie(SearchDataProducer.SESSION_ID);
            if (!sessionId) {
                sessionId = UUID_1.UUID.generateUUID16();
                BrowserStorage_1.BrowserStorage.setCookie(SearchDataProducer.SESSION_ID, sessionId, 0);
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
            var eventsList = new Array();
            var organizersList = new Array();
            var suggestionsList = new Array();
            if (eventsListed != null) {
                eventsList = SearchDataProducer.getEventDataFormList(eventsListed);
            }
            if (organizersListed != null) {
                organizersList = SearchDataProducer.getOrganizerDataFormList(organizersListed);
            }
            if (eventsListed != null) {
                suggestionsList = SearchDataProducer.getSuggestionsDataFormList(searchSuggestions);
            }
            search_data_collector_service_1.SearchDataCollector.recordSearchData(absoluteUrl, relativeUrl, loggedInUserId, personIdentifierId, sessionId, city, country, postal, region, ipaddress, typedText, searchIntent, eventCount, eventsList, organizersList, suggestionsList, pageNumber);
        }
        catch (e) {
            console.log("exception while sending the data " + e);
        }
    };
    SearchDataProducer.getOrganizerDataFormList = function (organizersList) {
        var organizersFormedList = new Array();
        for (var organizer in organizersList) {
            var organizerData = new organizer_data_model_1.OrganizerData();
            organizerData.organizer_id = organizersList[organizer]['organizerId'];
            organizerData.organizer_name = organizersList[organizer]['organizerName'];
            organizersFormedList.push(organizerData);
        }
        return organizersFormedList;
    };
    SearchDataProducer.getSuggestionsDataFormList = function (suggestionsList) {
        var suggestionsFormedList = new Array();
        for (var index in suggestionsList) {
            var suggestionData = new search_suggestion_data_mode_1.SearchSuggestionData();
            suggestionData.score = suggestionsList[index]['score'];
            suggestionData.suggestion = suggestionsList[index]['suggestion'];
            suggestionsFormedList.push(suggestionData);
        }
        return suggestionsFormedList;
    };
    SearchDataProducer.getEventDataFormList = function (eventList) {
        var eventFormedList = new Array();
        for (var index in eventList) {
            var eventData = new event_data_model_1.EventData();
            eventData.event_id = eventList[index]['eventId'];
            eventData.event_name = eventList[index]['name'];
            eventData.event_search_score = eventList[index]['eventSearchScore'];
            eventFormedList.push(eventData);
        }
        return eventFormedList;
    };
    return SearchDataProducer;
}());
exports.SearchDataProducer = SearchDataProducer;
