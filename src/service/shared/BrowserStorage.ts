import { UUID } from "./UUID";

declare var localStorage: any;
declare var document: any;

export class BrowserStorage {

    static getFieldFromLocalStorage = (fieldName: string) => {
        return localStorage.getItem(fieldName);
    };

    static setFieldToLocalStorage = (fieldName: string, fieldValue: string) => {
        localStorage.setItem(fieldName, fieldValue);
    };

    static getCookie = (c_name: string) => {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    };

    static setCookie = (name: string, value: string, days: number) => {
        var date: Date, expires: string;
        if (days) {
            date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        } else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires;
    };

    static updateFieldToLocalStorage(identifierId: string) {
        var userIdentifierVal = this.getFieldFromLocalStorage(identifierId);
        if(!userIdentifierVal){
            userIdentifierVal = UUID.generateUUID32();
            this.setFieldToLocalStorage(identifierId, userIdentifierVal);
        } 
        return userIdentifierVal;  
    }

    static updateCookieToLocalStorage(id: string) {
        var val = this.getCookie(id);
        if(!val){
            val = UUID.generateUUID16();
            BrowserStorage.setCookie(id, val, 0);
        }
        return val;
    }
}