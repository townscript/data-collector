import { StreamData } from "../model/StreamData";
import { Configuration } from "../model/Configuration";
export declare class RecordData {
    private readonly _putRecord;
    private _config;
    private constructor();
    static create: (data: StreamData, config: Configuration) => RecordData;
    send: () => void;
}
