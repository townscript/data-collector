"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventType_1 = require("../model/EventType");
var RecordData_1 = require("./RecordData");
var UUID_1 = require("./UUID");
var DataCollector = /** @class */ (function () {
    function DataCollector(config) {
        this._disabled = false;
        this._config = config;
    }
    DataCollector.configure = function (config) {
        DataCollector._dataCollector = new DataCollector(config);
    };
    DataCollector.disable = function () {
        DataCollector._dataCollector._disabled = true;
    };
    DataCollector.isDisabled = function () {
        return DataCollector._dataCollector._disabled;
    };
    DataCollector.getConfig = function () {
        return DataCollector._dataCollector._config;
    };
    DataCollector.visitedPage = function (absoluteUrl, relativeUrl, loggedInUserId, personIdentifierId, sessionId, city, country, postalCode, region, ipaddress, customText1) {
        DataCollector.callRecordData(EventType_1.EventType.PAGEVIEW, absoluteUrl, relativeUrl, loggedInUserId, personIdentifierId, sessionId, city, country, postalCode, region, ipaddress, "", "", customText1);
    };
    DataCollector.clicked = function (absoluteUrl, relativeUrl, loggedInUserId, personIdentifierId, sessionId, city, country, postalCode, region, ipaddress, eventLabel, clickedLocation, customText1) {
        DataCollector.callRecordData(EventType_1.EventType.CLICK, absoluteUrl, relativeUrl, loggedInUserId, personIdentifierId, sessionId, city, country, postalCode, region, ipaddress, eventLabel, clickedLocation, customText1);
    };
    DataCollector.callRecordData = function (eventType, absoluteUrl, relativeUrl, loggedInUserId, personIdentifierId, sessionId, city, country, postalCode, region, ipaddress, eventLabel, clickedLocation, customText1) {
        if (DataCollector.isDisabled())
            return;
        var streamData = DataCollector.getStreamData(eventType, absoluteUrl, relativeUrl, loggedInUserId, personIdentifierId, sessionId, city, country, postalCode, region, ipaddress, eventLabel, clickedLocation, customText1);
        RecordData_1.RecordData.create(streamData, DataCollector._dataCollector._config).send();
    };
    DataCollector.getStreamData = function (eventType, absoluteUrl, relativeUrl, loggedInUserId, personIdentifierId, sessionId, city, country, postalCode, region, ipaddress, eventLabel, clickedLocation, customText1) {
        var currentDate = new Date();
        var detailClientTimeStamp = currentDate.toString();
        var longClientTimeStamp = currentDate.getTime();
        var userAgentBrowser = DataCollector.getWebBrowserInfo();
        var recordId = UUID_1.UUID.generateUUID32();
        var userDevice = DataCollector.isDevicePhone() ? "Phone" : "Desktop";
        var streamData = {
            eventType: eventType,
            userAgentBrowser: userAgentBrowser,
            absoluteUrl: absoluteUrl,
            relativeUrl: relativeUrl,
            longClientTimeStamp: longClientTimeStamp,
            detailClientTimeStamp: detailClientTimeStamp,
            personIdentifierId: personIdentifierId,
            recordId: recordId,
            sessionId: sessionId,
            clienttimestamp: currentDate,
            userDevice: userDevice
        };
        if (loggedInUserId) {
            streamData.loggedInUserId = loggedInUserId;
        }
        if (city) {
            streamData.city = city;
        }
        if (country) {
            streamData.country = country;
        }
        if (postalCode) {
            streamData.postalCode = postalCode;
        }
        if (region) {
            streamData.region = region;
        }
        if (customText1) {
            streamData.customText1 = customText1;
        }
        if (ipaddress) {
            streamData.ipaddress = ipaddress;
        }
        if (eventLabel) {
            streamData.eventLabel = eventLabel;
        }
        if (clickedLocation) {
            streamData.clickedLocation = clickedLocation;
        }
        return streamData;
    };
    DataCollector.isDevicePhone = function () {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
            check = true; })(window.navigator.userAgent || window.navigator.vendor || window.opera);
        return check;
    };
    DataCollector.getWebBrowserInfo = function () {
        try {
            var ua = window.navigator.userAgent, tem, M = ua.match(/(CriOS|opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return 'IE ' + (tem[1] || '');
            }
            if (M[1] === 'Chrome') {
                tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
                if (tem != null)
                    return tem.slice(1).join(' ').replace('OPR', 'Opera');
            }
            M = M[2] ? [M[1], M[2]] : [window.navigator.appName, window.navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/(\d+)/i)) != null)
                M.splice(1, 1, tem[1]);
            return M.join(' ');
        }
        catch (e) {
            return "Browser Detection Error";
        }
    };
    return DataCollector;
}());
exports.DataCollector = DataCollector;
