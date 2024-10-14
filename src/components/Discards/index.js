import { html } from "htm/preact";
require("./style.scss");

function VTile({ filled }) {
  return html`<div class="VTile ${filled ? "filled" : "empty"}"></div>`;
}

function Column({ number, length, filledLength }) {
  const tr = Array.apply(null, Array(length)).map(() => ""); // Array(tl);
  return html`<div class="Column">
    <div class="colhead">${number || " "}</div>
    <div class="coltiles">
      ${tr.map((_, i) => html`<${VTile} filled=${i < filledLength} />`)}
    </div>
  </div>`;
}

export default function Discards({ discards, discardsTracks, trackLengths }) {
  return html`<div class="Discards">
    ${discards.map(
    (e, i) =>
      html`<${Column}
          number=${e}
          length=${trackLengths[i]}
          filledLength=${discardsTracks[i]}
        />`,
  )}
  </div>`;
}
