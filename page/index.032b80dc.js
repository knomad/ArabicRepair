function e(e){return e>=1536&&e<=1791||e>=64336&&e<=65023||e>=65136&&e<=65279||e>=1872&&e<=1919}function t(e,t){let n=-1;return function(){clearTimeout(n);let i=arguments,o=this;n=setTimeout(function(){e.apply(o,i)},t)}}String.prototype.reverse=function(){return this.split("").reverse().join("")},String.prototype.toChar=function(e){return void 0!=e?this.charCodeAt(e):this.charCodeAt(0)},String.prototype.isArabicChar=function(t){return void 0!=t?e(this[t].toChar(t)):e(this.toChar(0))},String.prototype.hasArabic=function(){for(let e=0;e<this.length;e++)if(this.isArabicChar(e))return!0;return!1},Number.prototype.isArabicChar=function(){return e(this)};const n=/([\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF\u0750-\u077F\s\/\\])/gu,i=/[ \t]+/gu,o=/[\n\r]+/gu;let r={input:HTMLTextAreaElement,output:HTMLTextAreaElement,space_remove:HTMLInputElement,line_remove:HTMLInputElement};function u(e){let t=r.input.value;r.space_remove.checked&&(t=t.replace(i," ")),r.line_remove.checked&&(t=t.replace(o,"\n"));let u=t.split("\n");for(let e=0;e<u.length;e++){if(u[e].length<=1)continue;u[e]=u[e].reverse();let t=u[e].split(n);if(null!=t){for(let e=0;e<t.length;e++)!t[e].isArabicChar()&&t[e].length>1&&(t[e]=t[e].reverse());u[e]=t.join("")}}r.output.value=u.join("\n")}window.addEventListener("load",e=>{r.input=document.getElementById("textinput"),r.output=document.getElementById("textoutput"),r.space_remove=document.getElementById("option_remove_spaces"),r.line_remove=document.getElementById("option_remove_newlines"),r.input.addEventListener("input",t(u,500)),r.space_remove.addEventListener("input",t(u,500)),r.line_remove.addEventListener("input",t(u,500)),document.getElementById("copyToClipboard").onclick=async function(){await navigator.clipboard.writeText(r.output.value)},document.getElementById("pasteFromClipboard").onclick=async function(){r.input.value=await navigator.clipboard.readText()},document.getElementById("loadTestText").onclick=async function(){var e;let t;e=(e,t)=>{r.input.value=e,u(null)},(t=new XMLHttpRequest).open("GET","./test.html"),t.onload=function(){e(this.responseText,this)},t.send()}});
//# sourceMappingURL=index.032b80dc.js.map