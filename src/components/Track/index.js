import { preact } from "preact";
import { useCallback, useState } from "preact/hooks";
import { html } from "htm/preact";
require("./style.scss");

function Tile({ type, visited, occupied }) {
  return html`<div
    class="Tile ${type || "default"}"
    data-visited=${visited}
    data-occupied=${occupied}
  ></div>`;
}

export default function Track({
  startL,
  scoringL,
  position,
  score,
  trackScore,
  trackNumber,
}) {
  const tl = startL + scoringL;
  const tr = Array.apply(null, Array(tl)).map(() => ""); // Array(tl);
  return html`<div class="Track">
    <div class="number">${trackNumber}</div>
    ${tr.map(
    (_, i) =>
      html`<${Tile}
          occupied=${i == position}
          visited=${i < position}
          type=${i < startL ? "danger" : "safe"}
        />`,
  )}
    <div class="score">${score}</div>
  </div> `;
}
