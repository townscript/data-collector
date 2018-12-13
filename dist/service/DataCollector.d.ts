import { Configuration } from "../model/Configuration";
export declare class DataCollector {
    private _config;
    private static _dataCollector;
    private _disabled;
    private constructor();
    static configure: (config: Configuration) => void;
    static disable: () => void;
    static isDisabled: () => boolean;
    static getConfig: () => Configuration;
    static visitedPage: (url: string) => void;
    static clicked: (text: string) => void;
}