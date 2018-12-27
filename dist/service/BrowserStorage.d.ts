export declare class BrowserStorage {
    static getFieldFromLocalStorage: (fieldName: string) => any;
    static setFieldToLocalStorage: (fieldName: string, fieldValue: string) => void;
    static getCookie: (c_name: string) => string;
    static setCookie: (name: string, value: string, days: number) => void;
}
