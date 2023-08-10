import "./utilities"
import {debounce, downloadText} from "./utilities/utilz";

const splitter_regexp = /([\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF\u0750-\u077F\s\/\\])/gu
const space_remover_regexp = /[ \t]+/gu
const line_remover_regexp = /[\n\r]+/gu

let pp = {
    input: HTMLTextAreaElement,
    output: HTMLTextAreaElement,
    space_remove: HTMLInputElement,
    line_remove: HTMLInputElement
}

function onTextChanged(ev: Event) {
    let txt = pp.input.value;

    if (pp.space_remove.checked) {
        txt = txt.replace(space_remover_regexp, " ");
    }

    if (pp.line_remove.checked) {
        txt = txt.replace(line_remover_regexp, "\n");
    }

    let lines = txt.split("\n");

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].length <= 1) continue;
        lines[i] = lines[i].reverse();
        let contexts = lines[i].split(splitter_regexp);
        if (contexts == null) continue;
        for (let j = 0; j < contexts.length; j++) {
            if (!contexts[j].isArabicChar() && contexts[j].length > 1) {
                contexts[j] = contexts[j].reverse();
            }
        }
        lines[i] = contexts.join("");
    }

    pp.output.value = lines.join("\n");
}

window.addEventListener("load", ev => {
    pp.input = document.getElementById("textinput") as HTMLTextAreaElement;
    pp.output = document.getElementById("textoutput") as HTMLTextAreaElement;
    pp.space_remove = document.getElementById("option_remove_spaces") as HTMLInputElement;
    pp.line_remove = document.getElementById("option_remove_newlines") as HTMLInputElement;

    pp.input.addEventListener("input", debounce(onTextChanged, 500));
    pp.space_remove.addEventListener("input", debounce(onTextChanged, 500));
    pp.line_remove.addEventListener("input", debounce(onTextChanged, 500));

    document.getElementById("copyToClipboard").onclick = async function () {
        await navigator.clipboard.writeText(pp.output.value);
    }

    document.getElementById("pasteFromClipboard").onclick = async function () {
        pp.input.value = await navigator.clipboard.readText();
    }

    document.getElementById("loadTestText").onclick = async function () {
        downloadText("./test.html", (text, request) => {
            pp.input.value = text;
            onTextChanged(null);
        });

    }
});

