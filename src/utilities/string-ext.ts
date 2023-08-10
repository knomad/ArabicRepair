import "./utilz"
import {isInArabicRange} from "./utilz";

export {}
declare global {
    interface String {
        reverse(): string;
        isArabicChar(index?: number): boolean;
        toChar(index?: number): number;
        hasArabic(): boolean;
    }

    interface Number {
        isArabicChar(): boolean;
    }
}


String.prototype.reverse = function (): string {
    return this.split("").reverse().join("");
}

String.prototype.toChar = function (index?: number): number {
    if (index != undefined) {
        return this.charCodeAt(index);
    }
    return this.charCodeAt(0);
}

String.prototype.isArabicChar = function (index?: number | undefined): boolean {
    if (index != undefined) {
        return isInArabicRange(this[index].toChar(index));
    }
    return isInArabicRange(this.toChar(0));
}

String.prototype.hasArabic = function (): boolean {
    for (let i = 0; i < this.length; i++) {
        if (this.isArabicChar(i)) {
            return true;
        }
    }
    return false;
}

Number.prototype.isArabicChar = function () {
    return isInArabicRange(this);
}