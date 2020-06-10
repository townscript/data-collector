import {SearchStreamDataModel} from "../../model/search-stream.model";
import { EventDataModel } from "../../model/search-stream-helper-model/event-data.model";
import { OrganizerDataModel } from "../../model/search-stream-helper-model/organizer-data.model";
import { SearchSuggestionDataModel } from "../../model/search-stream-helper-model/search-suggestion-data.model";
import { BasicDataCollectorService } from "./basic-data-collector.service";
import { RecordData } from "../publisher/RecordData";
import { BasicStreamDataModel } from "../../model/basic-stream-data.model";

export class SearchDataCollectorService extends BasicDataCollectorService {

    static recordSearchData = (absoluteUrl:string, relativeUrl:string,
        loggedInUserId:string, personIdentifierId:string,
        sessionId:string, city:string, country:string, postalCode:string,
        region:string, ipaddress:string, typedText:string, 
        searchIntent:string, eventCount: number, eventsList: Array<EventDataModel>, organizersListed: Array<OrganizerDataModel>, suggestionsList: Array<SearchSuggestionDataModel>, pageNumber: number):void => {

            let searchStreamData = SearchDataCollectorService.getSearchStreamData( absoluteUrl, relativeUrl,
                loggedInUserId, personIdentifierId, sessionId, city,
                country, postalCode, region, ipaddress, typedText, 
                searchIntent, eventCount, eventsList, organizersListed, suggestionsList, pageNumber);
            RecordData.create(SearchDataCollectorService._dataCollector._config, SearchDataCollectorService.getConfig().streamName).publishDataToKinesis(searchStreamData);
        
    };

    static getSearchStreamData = (absoluteUrl:string, relativeUrl:string,
                            loggedInUserId:string, personIdentifierId:string,
                            sessionId:string, city:string, country:string, postalCode:string,
                            region:string, ipaddress:string, typedText:string, 
                            searchIntent:string, eventCount: number, eventsList: Array<EventDataModel>, organizersListed: Array<OrganizerDataModel>, suggestionsList: Array<SearchSuggestionDataModel>, pageNumber: number):SearchStreamDataModel =>{
        let basicStreamData: BasicStreamDataModel = BasicDataCollectorService.setBasicStreamData(absoluteUrl,relativeUrl,loggedInUserId,personIdentifierId,sessionId,city,country,postalCode,region,ipaddress);           
        let searchStreamData:SearchStreamDataModel = basicStreamData;
        searchStreamData.eventCount = eventCount;
        searchStreamData.eventsList = eventsList;
        searchStreamData.organizersList = organizersListed;
        searchStreamData.pageNumber = pageNumber;
        searchStreamData.searchIntent = searchIntent;
        searchStreamData.typedText = typedText;
        searchStreamData.searchSuggestions = suggestionsList;
        return searchStreamData;
    };
}