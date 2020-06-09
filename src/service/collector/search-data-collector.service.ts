import {SearchStreamDataModel} from "../../model/search-stream.model";
import {RecordSearchData} from "../publisher/record-search-data.service";
import {UUID} from "../shared/UUID";
import { EventDataModel } from "../../model/search-stream-helper-model/event-data.model";
import { OrganizerDataModel } from "../../model/search-stream-helper-model/organizer-data.model";
import { SearchSuggestionDataModel } from "../../model/search-stream-helper-model/search-suggestion-data.mode";
import { UserMetaDataService } from "../shared/user-metadata.service";
import { BasicDataCollectorService } from "./basic-data-collector.service";

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
            RecordSearchData.create(searchStreamData, SearchDataCollectorService._dataCollector._config).send();
        
    };

    static callRecordSearchData = (eventType: string, absoluteUrl:string, relativeUrl:string,
                             loggedInUserId:string, personIdentifierId:string,
                             sessionId:string, city:string, country:string, postalCode:string,
                             region:string, ipaddress:string, eventLabel: string,
                             clickedLocation: string, customText1:string):void => {

        
    }

    static getSearchStreamData = (absoluteUrl:string, relativeUrl:string,
                            loggedInUserId:string, personIdentifierId:string,
                            sessionId:string, city:string, country:string, postalCode:string,
                            region:string, ipaddress:string, typedText:string, 
                            searchIntent:string, eventCount: number, eventsList: Array<EventDataModel>, organizersListed: Array<OrganizerDataModel>, suggestionsList: Array<SearchSuggestionDataModel>, pageNumber: number):SearchStreamDataModel =>{
        let currentDate: Date = new Date();
        let longClientTimeStamp: number = currentDate.getTime();
        let userAgentBrowser: string = UserMetaDataService.getWebBrowserInfo();
        let recordId: string = UUID.generateUUID32();
        let userDevice: string = UserMetaDataService.isDevicePhone() ? "Phone" : "Desktop";
        let searchStreamData:SearchStreamDataModel = {
            userAgentBrowser: userAgentBrowser,
            absoluteUrl: absoluteUrl,
            relativeUrl: relativeUrl,
            longClientTimeStamp: longClientTimeStamp,
            personIdentifierId: personIdentifierId,
            recordId: recordId,
            sessionId: sessionId,
            clientTimeStamp:currentDate,
            userDevice: userDevice,
            typedText: typedText,
            searchIntent: searchIntent,
            eventCount: eventCount,
            eventsList: eventsList,
            organizersList: organizersListed,
            searchSuggestions: suggestionsList,
            pageNumber: pageNumber
        };
        if(loggedInUserId){
            searchStreamData.loggedInUserId = loggedInUserId;
        }
        if(city){
            searchStreamData.city = city;
        }
        if(country){
            searchStreamData.country = country;
        }
        if(postalCode){
            searchStreamData.postalCode = postalCode;
        }
        if(region){
            searchStreamData.region = region;
        }
        if(ipaddress){
            searchStreamData.ipAddress = ipaddress;
        }
        return searchStreamData;
    };
}