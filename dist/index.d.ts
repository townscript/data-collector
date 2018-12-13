import { Configuration } from "./Configuration";
export declare class DataCollector {
    private _config;
    private static _dataCollector;
    private _disabled;
    private constructor();
    static configure: (config: Configuration) => void;
    static disable: () => void;
    static isEnable: () => boolean;
    static getCofig: () => Configuration;
    static visitedPage: (url: string) => void;
    static clicked: (text: string) => void;
}
