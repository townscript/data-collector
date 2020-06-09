import { BasicStreamDataModel } from "./basic-stream-data.model";

export interface StreamData extends BasicStreamDataModel {
    //Unique Id for record
    eventType: string,
    detailClientTimeStamp: string,
    customText1 ?: string,
    //Visitors information
    eventLabel ?: string,
    clickedLocation ?: string,
}