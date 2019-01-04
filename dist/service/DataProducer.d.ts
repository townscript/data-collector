import { Configuration } from "../model/Configuration";
export declare class DataProducer {
    private static PERSON_IDENTIFIER_ID;
    private static SESSION_ID;
    private _config;
    private constructor();
    static initialize: (config: Configuration, disable: boolean) => void;
    static callPageView: (loggedInUserId: string) => void;
    static callClickEvent: (eventLabel: string, clickedLocation: string, loggedInUserId: string) => void;
    static callDataCollector: (eventType: string, eventLabel: string, clickedLocation: string, loggedInUserId: string) => void;
}
