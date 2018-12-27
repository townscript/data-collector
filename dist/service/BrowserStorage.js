"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BrowserStorage = /** @class */ (function () {
    function BrowserStorage() {
    }
    BrowserStorage.getFieldFromLocalStorage = function (fieldName) {
        return localStorage.getItem(fieldName);
    };
    BrowserStorage.setFieldToLocalStorage = function (fieldName, fieldValue) {
        localStorage.setItem(fieldName, fieldValue);
    };
    BrowserStorage.getCookie = function (c_name) {
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
    BrowserStorage.setCookie = function (name, value, days) {
        var date, expires;
        if (days) {
            date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires;
    };
    return BrowserStorage;
}());
exports.BrowserStorage = BrowserStorage;
