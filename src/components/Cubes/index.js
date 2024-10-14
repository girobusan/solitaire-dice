import { html } from "htm/preact";
import { useState } from "preact/hooks";
require("./style.scss");

function roll6() {
  let r = [];
  for (let i = 0; i < 6; i++) {
    r.push(Math.ceil(Math.random() * 6));
  }
  return r;
}

function TheCube({ number, pair }) {
  return html`<div class="TheCube" data-pair=${pair}>${number}</div>`;
}

export default function Cubes({ discards }) {
  let [values, setValues] = useState(roll6());
  let [pair1, setPair1] = useState([]);
  let [pair2, setPair2] = useState([]);
  return html`<div class="Cubes">
    ${values.map((v) => html`<${TheCube} number=${v} />`)}
  </div>`;
}
