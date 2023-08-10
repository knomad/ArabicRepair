export const arabic_ranges = [[0x0600, 0x06FF], [0xFB50, 0xFDFF], [0xFE70, 0xFEFF], [0x0750, 0x077F]];

export function isInArabicRange(charCode: number): boolean {
    return (charCode >= 0x0600 && charCode <= 0x06FF)
        || (charCode >= 0xFB50 && charCode <= 0xFDFF)
        || (charCode >= 0xFE70 && charCode <= 0xFEFF)
        || (charCode >= 0x0750 && charCode <= 0x077F);
}

export function debounce(func: Function, interval: number) {
    let lastCall = -1;
    return function () {
        clearTimeout(lastCall);
        let args = arguments;
        let self = this;
        lastCall = setTimeout(function () {
            func.apply(self, args);
        }, interval);
    };
}

export function downloadText(url: string, ondone: (text: string, request: XMLHttpRequest) => void) {
    let client = new XMLHttpRequest();
    client.open('GET', url);
    client.onload = function () {
        ondone(this.responseText, this);
    }
    client.send();
}