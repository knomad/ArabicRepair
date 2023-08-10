
const arabic_ranges = [[0x0600,0x06FF], [0xFB50,0xFDFF], [0xFE70,0xFEFF], [0x0750,0x077F]];
function isInArabicRange(charCode:number):boolean{
    return (charCode >= 0x0600 && charCode <= 0x06FF)
        || (charCode >= 0xFB50 && charCode <= 0xFDFF)
        || (charCode >= 0xFE70 && charCode <= 0xFEFF)
        || (charCode >= 0x0750 && charCode <= 0x077F);
}

function range_size(size:number, startAt:number = 0):ReadonlyArray<number> {
    return [...Array(size).keys()].map(i => i + startAt);
}

function range_span(first:number, last:number):ReadonlyArray<number> {
    return range_size(last-first+1, first);
}

export const context_splitter = /([\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF\u0750-\u077F ]+|[^\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF\u0750-\u077F]+)/gu;
export const TOKEN_PATTERN = /([\u0041-\u005A\u0061-\u007A\u0670\u064B-\u0652\u0621-\u064A']+|[^\u0041-\u005A\u0061-\u007A\u0670\u064B-\u0652\u0621-\u064A']+)/gu;
function split_contexts(text:string)
{
    text.match(context_splitter);
}

export {arabic_ranges, isInArabicRange, range_span, range_size};
function characterRange(startChar:string, endChar:string) {

    //return String.fromCharCode(...range(endChar.charCodeAt(0) - startChar.charCodeAt(0), startChar.charCodeAt(0)))
}

export function debounce(func:Function, interval:number) {
    let lastCall = -1;
    return function() {
        clearTimeout(lastCall);
        let args = arguments;
        let self = this;
        lastCall = setTimeout(function() {
            func.apply(self, args);
        }, interval);
    };
}

export function downloadText(url:string, ondone:(text:string, request: XMLHttpRequest)=>void){
    let client = new XMLHttpRequest();
    client.open('GET', url);
    client.onload = function() {
        ondone(this.responseText, this);
    }
    client.send();
}