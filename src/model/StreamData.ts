export interface StreamData {
    //Unique Id for record
    recordId: string,
    eventType: string,
    userAgentBrowser: string,
    absoluteUrl: string,
    relativeUrl: string,
    loggedInUserId?: string,
    personIdentifierId: string,
    sessionId: string,
    longClientTimeStamp: number,
    detailClientTimeStamp: string,
    customText1 ?: string,
    //Visitors information
    ipaddress ?:string,
    city ?:string,
    country ?:string,
    postalCode ?:string,
    region ?:string,
    eventLabel ?: string,
    clickedLocation ?: string,
    clienttimestamp: Date,
    userDevice:string
}