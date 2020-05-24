import {SearchDataCollector} from "./search-data-collector.service";
import {Configuration} from "../model/Configuration";
import {UUID} from "./UUID";
import {BrowserStorage} from "./BrowserStorage";
import { EventData } from "../model/search-stream-helper-model/event-data.model";
import { OrganizerData } from "../model/search-stream-helper-model/organizer-data.model";
import { SearchSuggestionData } from "../model/search-stream-helper-model/search-suggestion-data.mode";

declare var window: any;

export class SearchDataProducer {

    private static PERSON_IDENTIFIER_ID: string = 'personIdentifierId';
    private static SESSION_ID: string = "session_id";
    private _config: Configuration;

    private constructor(config: Configuration) {
        this._config = config;
    }

    static initialize = (config: Configuration, disable: boolean) =>{
        SearchDataCollector.configure(config);
        if(disable){
            SearchDataCollector.disable();
        }
    };

    static callSearchDataCollector = (typedText:string, searchIntent:string, searchSuggestions:[], eventCount:number,
                                eventsListed:[], organizersListed:[], loggedInUserId: string, pageNumber: number)=>{
        try{
            let relativeUrl = window.location.pathname;
            let absoluteUrl = window.location.href;

            let personIdentifierId = BrowserStorage.getFieldFromLocalStorage(SearchDataProducer.PERSON_IDENTIFIER_ID);
            if(!personIdentifierId){
                personIdentifierId = UUID.generateUUID32();
                BrowserStorage.setFieldToLocalStorage(SearchDataProducer.PERSON_IDENTIFIER_ID, personIdentifierId);
            }   

            let sessionId = BrowserStorage.getCookie(SearchDataProducer.SESSION_ID);
            if(!sessionId){
                sessionId = UUID.generateUUID16();
                BrowserStorage.setCookie(SearchDataProducer.SESSION_ID, sessionId, 0);
            }

            let ipInfoData = BrowserStorage.getFieldFromLocalStorage("ipinfo_data");
            let city: string = "", country: string = "", postal: string = "",
                region: string = "", ipaddress: string = "";
            if(ipInfoData){
                let ipInfoJson = JSON.parse(ipInfoData);
                city = ipInfoJson.city;
                country = ipInfoJson.country;
                postal = ipInfoJson.postal;
                region = ipInfoJson.region;
                ipaddress = ipInfoJson.ip;
            }
            let eventsList = new Array<EventData>();
            let organizersList = new Array<OrganizerData>();
            let suggestionsList = new Array<SearchSuggestionData>();
            if(eventsListed != null){
                eventsList = SearchDataProducer.getEventDataFormList(eventsListed);
            }
            if(organizersListed != null){
                organizersList = SearchDataProducer.getOrganizerDataFormList(organizersListed);
            }
            if(eventsListed != null){
                suggestionsList = SearchDataProducer.getSuggestionsDataFormList(searchSuggestions);
            }

            SearchDataCollector.recordSearchData(absoluteUrl, relativeUrl,loggedInUserId, personIdentifierId,
                sessionId, city, country, postal,region, ipaddress, typedText, searchIntent, eventCount, eventsList, organizersList, suggestionsList, pageNumber);
        }
        catch(e){
            console.log("exception while sending the data " + e);
        }
    };

    static getOrganizerDataFormList = (organizersList : []):Array<OrganizerData> => {
        let organizersFormedList = new Array<OrganizerData>();
        for (const organizer in organizersList) {
            let organizerData: OrganizerData = new OrganizerData();
            organizerData.organizer_id = organizersList[organizer]['organizerId'];
            organizerData.organizer_name = organizersList[organizer]['organizerName'];
            organizersFormedList.push(organizerData);
        }
        return organizersFormedList;
    }

    static getSuggestionsDataFormList = (suggestionsList: []):Array<SearchSuggestionData> => {
        let suggestionsFormedList = new Array<SearchSuggestionData>();
        for(const index in suggestionsList) {
            let suggestionData = new SearchSuggestionData();
            suggestionData.score = suggestionsList[index]['score'];
            suggestionData.suggestion = suggestionsList[index]['suggestion'];
            suggestionsFormedList.push(suggestionData);
        }
        return suggestionsFormedList;
    }

    static getEventDataFormList = (eventList: []):Array<EventData> => {
        let eventFormedList = new Array<EventData>();
        for (const index in eventList) {
            let eventData: EventData = new EventData();
            eventData.event_id = eventList[index]['eventId'];
            eventData.event_name = eventList[index]['name'];
            eventData.event_search_score = eventList[index]['eventSearchScore'];
            eventFormedList.push(eventData);
        }
        return eventFormedList;
    }
}