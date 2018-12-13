import { StreamData } from "../model/StreamData";
export declare class RecordData {
    private readonly _putRecord;
    private constructor();
    static create: (data: StreamData, uniqueIdentifier: string) => RecordData;
    send: () => void;
}
