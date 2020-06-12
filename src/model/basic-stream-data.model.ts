export interface BasicStreamDataModel {
    recordId: string,
    userAgentBrowser: string,
    absoluteUrl: string,
    relativeUrl: string,
    loggedInUserId?: string,
    personIdentifierId: string,
    sessionId: string,
    longClientTimeStamp: number,
    //Visitors information
    ipAddress ?:string,
    city ?:string,
    country ?:string,
    postalCode ?:string,
    region ?:string,
    clientTimeStamp: Date,
    userDevice:string
}