import {SearchDataCollectorService} from "../collector/search-data-collector.service";
import {Configuration} from "../../model/Configuration";
import {UUID} from "../shared/UUID";
import {BrowserStorage} from "../shared/BrowserStorage";
import { EventDataModel } from "../../model/search-stream-helper-model/event-data.model";
import { OrganizerDataModel } from "../../model/search-stream-helper-model/organizer-data.model";
import { SearchSuggestionDataModel } from "../../model/search-stream-helper-model/search-suggestion-data.mode";

declare var window: any;

export class SearchDataProducerService {

    private static PERSON_IDENTIFIER_ID: string = 'personIdentifierId';
    private static SESSION_ID: string = "session_id";
    private _config: Configuration;

    private constructor(config: Configuration) {
        this._config = config;
    }

    static initialize = (config: Configuration, disable: boolean) =>{
        SearchDataCollectorService.configure(config);
        if(disable){
            SearchDataCollectorService.disable();
        }
    };

    static callSearchDataCollector = (typedText:string, searchIntent:string, searchSuggestions:[], eventCount:number,
                                eventsListed:[], organizersListed:[], loggedInUserId: string, pageNumber: number)=>{
        try{
            let relativeUrl = window.location.pathname;
            let absoluteUrl = window.location.href;
            let personIdentifierId = BrowserStorage.updateFieldToLocalStorage(SearchDataProducerService.PERSON_IDENTIFIER_ID);
            let sessionId = BrowserStorage.updateCookieToLocalStorage(SearchDataProducerService.SESSION_ID);
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
            let eventsList = new Array<EventDataModel>();
            let organizersList = new Array<OrganizerDataModel>();
            let suggestionsList = new Array<SearchSuggestionDataModel>();
            if(eventsListed != null){
                eventsList = SearchDataProducerService.getEventDataFormList(eventsListed);
            }
            if(organizersListed != null){
                organizersList = SearchDataProducerService.getOrganizerDataFormList(organizersListed);
            }
            if(eventsListed != null){
                suggestionsList = SearchDataProducerService.getSuggestionsDataFormList(searchSuggestions);
            }

            SearchDataCollectorService.recordSearchData(absoluteUrl, relativeUrl,loggedInUserId, personIdentifierId,
                sessionId, city, country, postal,region, ipaddress, typedText, searchIntent, eventCount, eventsList, organizersList, suggestionsList, pageNumber);
        }
        catch(e){
            console.log("exception while sending the data " + e);
        }
    };

    static getOrganizerDataFormList = (organizersList : []):Array<OrganizerDataModel> => {
        let organizersFormedList = new Array<OrganizerDataModel>();
        for (const organizer in organizersList) {
            let organizerData: OrganizerDataModel = {
                organizer_id : organizersList[organizer]['organizerId'],
                organizer_name : organizersList[organizer]['organizerName']
            }
            organizerData.organizer_id = organizersList[organizer]['organizerId'];
            organizerData.organizer_name = organizersList[organizer]['organizerName'];
            organizersFormedList.push(organizerData);
        }
        return organizersFormedList;
    }

    static getSuggestionsDataFormList = (suggestionsList: []):Array<SearchSuggestionDataModel> => {
        let suggestionsFormedList = new Array<SearchSuggestionDataModel>();
        for(const index in suggestionsList) {
            let suggestionData: SearchSuggestionDataModel = {
                score : suggestionsList[index]['score'],
                suggestion : suggestionsList[index]['suggestion']    
            }
            suggestionsFormedList.push(suggestionData);
        }
        return suggestionsFormedList;
    }

    static getEventDataFormList = (eventList: []):Array<EventDataModel> => {
        let eventFormedList = new Array<EventDataModel>();
        for (const index in eventList) {
            let eventData: EventDataModel = {
                event_id: eventList[index]['eventId'],
                event_name: eventList[index]['name'],
                event_search_score: eventList[index]['eventSearchScore']        
            }
            eventFormedList.push(eventData);
        }
        return eventFormedList;
    }
}