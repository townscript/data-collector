import {SearchDataCollectorService} from "../collector/search-data-collector.service";
import {Configuration} from "../../model/Configuration";
import { EventDataModel } from "../../model/search-stream-helper-model/event-data.model";
import { OrganizerDataModel } from "../../model/search-stream-helper-model/organizer-data.model";
import { SearchSuggestionDataModel } from "../../model/search-stream-helper-model/search-suggestion-data.model";
import { BasicStreamMetadataModel } from "../../model/basic-stream-metadata.model";
import { BasicDataProducerService } from "./basic-data-producer.service";

export class SearchDataProducerService extends BasicDataProducerService {

    static initialize = (config: Configuration, disable: boolean) =>{
        SearchDataCollectorService.configure(config);
        if(disable){
            SearchDataCollectorService.disable();
        }
    };

    static callSearchDataCollector = (typedText:string, searchIntent:string, searchSuggestions:any[], eventCount:number,
                                eventsListed:any[], organizersListed:any[], loggedInUserId: string, pageNumber: number)=>{
        try{
            let basicStreamMetaData: BasicStreamMetadataModel = BasicDataProducerService.generatePrimaryDataForCollector();
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
            SearchDataCollectorService.recordSearchData(basicStreamMetaData.absoluteUrl, basicStreamMetaData.relativeUrl,loggedInUserId, basicStreamMetaData.personIdentifierId,
                basicStreamMetaData.sessionId, basicStreamMetaData.city, basicStreamMetaData.country, basicStreamMetaData.postal, basicStreamMetaData.region, basicStreamMetaData.ipaddress, typedText, searchIntent, eventCount, eventsList, organizersList, suggestionsList, pageNumber);
        }
        catch(e){
            console.log("exception while sending the data " + e);
        }
    };

    static getOrganizerDataFormList = (organizersList : any[]):Array<OrganizerDataModel> => {
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

    static getSuggestionsDataFormList = (suggestionsList: any[]):Array<SearchSuggestionDataModel> => {
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

    static getEventDataFormList = (eventList: any[]):Array<EventDataModel> => {
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