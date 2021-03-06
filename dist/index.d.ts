export declare function getFrom(str: string, startToken: string, endToken: string): string;
export declare function isNil<T>(val: T): boolean;
export declare function arrify<T>(value: T | T[]): T[];
export declare function checkArrayParam(value: string, options: string[], name?: string): void;
export declare function getOffset(limit?: number, page?: number, offset?: number): number;
export declare function removeQueryUrl(val: string): string;
export declare function paginateArray<T>(arr: T[], limit: number, page: number): T[];
export declare function getPageNumber(total: number, limit: number): number;
export declare function padZeros(val: string | number, len: number): string;
export declare function binaryToDecimal(data: string): string;
export declare function stringifyQuery(obj: any, prefix?: any): string;
export declare function isPlainObject(obj: any): boolean;
export declare function toBoolean(value: string | number | boolean, emptyStringIsTrue?: boolean): boolean;
export declare function deepForEach(obj: any, callback: DeepForEach.Callback, options?: DeepForEach.Options): void;
export declare function createFilter(state: boolean | string, condition: (state?: boolean | string) => boolean, isReversed?: boolean): boolean;
export declare function rand(min: number, max: number): number;
export declare function generateId(size?: number): string;
export declare namespace DeepForEach {
    type Callback = (value, key: string, object?) => void;
    interface Options {
        key?: string;
        callbackObject?: boolean;
        callbackArray?: boolean;
    }
}
