import { Configuration } from "../../model/Configuration";

export class BasicDataCollectorService {
    public _config: Configuration;
    public static _dataCollector: BasicDataCollectorService;
    public _disabled: boolean = false;

    public constructor(config: Configuration) {
        this._config = config;
    }

    static configure = (config: Configuration):void => {
        BasicDataCollectorService._dataCollector = new BasicDataCollectorService(config);
    };

    static disable = ():void => {
        BasicDataCollectorService._dataCollector._disabled = true;
    };

    static isDisabled = ():boolean => {
        return BasicDataCollectorService._dataCollector._disabled;
    };

    static getConfig = ():Configuration => {
        return BasicDataCollectorService._dataCollector._config;
    };

}