import { preact } from "preact";
import { useCallback, useState } from "preact/hooks";
import { html } from "htm/preact";
require("./style.scss");

function Tile({ type, visited, occupied }) {
  return html`<div
    class="Tile ${type || "default"}"
    data-visited=${visited}
    data-occupied=${occupied}
  >
    *
  </div>`;
}

export default function Track({ startL, scoringL, position }) {
  const tl = startL + scoringL;
  const tr = Array.apply(null, Array(tl)).map(() => ""); // Array(tl);
  return html`<div class="Track">${tr.map((_, i) => html`<${Tile} />`)}</div> `;
}
