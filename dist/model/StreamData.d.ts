export interface StreamData {
    recordId: string;
    eventType: string;
    userAgentBrowser: string;
    absoluteUrl: string;
    relativeUrl: string;
    loggedInUserId?: string;
    personIdentifierId: string;
    sessionId: string;
    longClientTimeStamp: number;
    detailClientTimeStamp: string;
    customText1?: string;
    ipaddress?: string;
    city?: string;
    country?: string;
    postalCode?: string;
    region?: string;
}
