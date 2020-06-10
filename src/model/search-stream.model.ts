import { EventDataModel } from "./search-stream-helper-model/event-data.model";
import { OrganizerDataModel } from "./search-stream-helper-model/organizer-data.model";
import { SearchSuggestionDataModel } from "./search-stream-helper-model/search-suggestion-data.model";
import { BasicStreamDataModel } from "./basic-stream-data.model";

export interface SearchStreamDataModel extends BasicStreamDataModel {
    typedText?: string, //original text typed in
    searchIntent?: string, //search query performed on this text
    eventCount?: number,//count of events fetched on the searchIntent
    eventsList?:Array<EventDataModel>, // List of events on first page(includes objects containing fields - event_id, event_name and search_score)
    organizersList?:Array<OrganizerDataModel>, // List of organizers on first page(list of user_ids of organizers fetched)
    searchSuggestions?: Array<SearchSuggestionDataModel>, //search suggestions given to the user 
    pageNumber?: number 
}