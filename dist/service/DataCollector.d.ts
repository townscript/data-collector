import { Configuration } from "../model/Configuration";
import { StreamData } from "../model/StreamData";
export declare class DataCollector {
    private _config;
    private static _dataCollector;
    private _disabled;
    private constructor();
    static configure: (config: Configuration) => void;
    static disable: () => void;
    static isDisabled: () => boolean;
    static getConfig: () => Configuration;
    static visitedPage: (absoluteUrl: string, relativeUrl: string, loggedInUserId: string, personIdentifierId: string, sessionId: string, city: string, country: string, postalCode: string, region: string, ipaddress: string, customText1: string) => void;
    static clicked: (absoluteUrl: string, relativeUrl: string, loggedInUserId: string, personIdentifierId: string, sessionId: string, city: string, country: string, postalCode: string, region: string, ipaddress: string, eventLabel: string, clickedLocation: string, customText1: string) => void;
    static callRecordData: (eventType: string, absoluteUrl: string, relativeUrl: string, loggedInUserId: string, personIdentifierId: string, sessionId: string, city: string, country: string, postalCode: string, region: string, ipaddress: string, eventLabel: string, clickedLocation: string, customText1: string) => void;
    static getStreamData: (eventType: string, absoluteUrl: string, relativeUrl: string, loggedInUserId: string, personIdentifierId: string, sessionId: string, city: string, country: string, postalCode: string, region: string, ipaddress: string, eventLabel: string, clickedLocation: string, customText1: string) => StreamData;
    static isDevicePhone: () => boolean;
    static getWebBrowserInfo: () => string;
}
