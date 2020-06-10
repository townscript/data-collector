import { BrowserStorage } from "../shared/BrowserStorage";
import { BasicStreamMetadataModel } from "../../model/basic-stream-metadata.model";
import { BasicStreamDataModel } from "../../model/basic-stream-data.model";

declare var window: any;

export class BasicDataProducerService {
    private static PERSON_IDENTIFIER_ID: string = 'personIdentifierId';
    private static SESSION_ID: string = "session_id";

    static generatePrimaryDataForCollector = (): BasicStreamMetadataModel=>{
        let relativeUrl = window.location.pathname;
        let absoluteUrl = window.location.href;
        let personIdentifierId = BrowserStorage.updateFieldToLocalStorage(BasicDataProducerService.PERSON_IDENTIFIER_ID);
        let sessionId = BrowserStorage.updateCookieToLocalStorage(BasicDataProducerService.SESSION_ID);
        let ipInfoData = BrowserStorage.getFieldFromLocalStorage("ipinfo_data");
        let ipInfoJson = JSON.parse(ipInfoData);
        let basicStreamMetadataModel: BasicStreamMetadataModel = {
            city: ipInfoJson.city,
            country: ipInfoJson.country,
            postal: ipInfoJson.postal,
            region: ipInfoJson.region,
            ipaddress: ipInfoJson.ip,
            relativeUrl: relativeUrl,
            absoluteUrl: absoluteUrl,
            personIdentifierId: personIdentifierId,
            sessionId: sessionId
        }
        return basicStreamMetadataModel;
    };
}