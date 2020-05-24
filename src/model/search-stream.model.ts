import { EventData } from "./search-stream-helper-model/event-data.model";
import { OrganizerData } from "./search-stream-helper-model/organizer-data.model";
import { SearchSuggestionData } from "./search-stream-helper-model/search-suggestion-data.mode";

export interface SearchStreamData {
    recordid: string, //Unique Id for record
    useragentbrowser: string,
    absoluteurl: string,
    relativeurl: string,
    loggedinuserid?: string,
    personidentifierid: string,
    sessionid: string,
    longclienttimestamp: number,
    //Visitors information
    ipaddress ?:string,
    city ?:string,
    country ?:string,
    postalcode ?:string,
    region ?:string,
    clienttimestamp: Date,
    //search specific information
    userdevice:string,
    typedtext: string, //original text typed in
    searchintent: string, //search query performed on this text
    eventcount: number,//count of events fetched on the searchIntent
    eventslist:Array<EventData>, // List of events on first page(includes objects containing fields - event_id, event_name and search_score)
    organizerslist:Array<OrganizerData>, // List of organizers on first page(list of user_ids of organizers fetched)
    searchsuggestions: Array<SearchSuggestionData>, //search suggestions given to the user 
    pagenumber: number 
}