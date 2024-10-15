import { html } from "htm/preact";
import { useState, useCallback } from "preact/hooks";
require("./style.scss");

const [START, WAITING, BAD_SELECTION, GOOD_SELECTION, READY, FREEROLL] = [
  1, 2, 3, 4, 5,
];
//can roll: START , READY
function canRoll(s) {
  return s == START || s == READY;
}
function canSubmit(s) {
  return s == GOOD_SELECTION;
}

function roll6() {
  let r = [];
  for (let i = 0; i < 5; i++) {
    r.push(Math.ceil(Math.random() * 6));
  }
  return r.slice(0);
}

function countPairs(pn, pa) {
  return pa.filter((e) => e == pn).length();
}
function countCubesInPair(pair, cubePairs) {
  console.log("count", pair, "in", cubePairs);
  const r = cubePairs.filter((e) => e == pair).length;
  console.log(r);
  return r;
}

function setOnePair(pair, index, pairs) {
  pairs[index] = pair;
  return pairs.slice(0);
}
function notPair(pair) {
  console.log("not pair", pair, "means", pair === 1 ? 2 : 1);
  return pair === 1 ? 2 : 1;
}

function TheCube({ index, number, pair, hidden, onClick, disabled }) {
  return html`<div
    class="TheCube"
    data-pair=${pair}
    data-hidden=${hidden}
    onClick=${(e) => {
      typeof onClick === "function" && !hidden && onClick(index, number);
    }}
  >
    ${hidden ? "" : number}
  </div>`;
}

export default function Cubes({ discards, enabled, submitFn }) {
  let [values, setValues] = useState(roll6());
  let [pairs, setPairs] = useState([0, 0, 0, 0, 0]);
  let [currentPair, setCurrentPair] = useState(1);
  let [cubeState, setCubeState] = useState(enabled ? START : DISABLED);

  const clickCube = useCallback(
    (i, n) => {
      //if cube has pair, which is not 0, set to 0 ; return
      if (pairs[i] != 0) {
        setPairs(setOnePair(0, i, pairs));
        return;
      }
      const pairslen = [countCubesInPair(1, pairs), countCubesInPair(2, pairs)];
      if (pairslen[0] == 2 && pairslen[1] == 2) {
        return;
      }
      //if cube has no pair...
      const cubesInPair = countCubesInPair(currentPair, pairs);
      //...and current pair has 2 cubes
      // = change current pair, give new current pair to cube; return
      if (cubesInPair + 1 >= 2) {
        console.log("Current pair eshausted", cubesInPair);
        setCurrentPair(notPair(currentPair));
      } else {
        console.log("keep current pair", cubesInPair);
      }

      // ...and current pair has less than 2 cubes
      //  = add current pair to cube ; return
      setPairs(setOnePair(currentPair, i, pairs));
    },
    [pairs, cubeState],
  );
  const doRoll = useCallback(() => {
    console.log("do the roll");
    setValues(roll6());
    setCubeState(WAITING);
  }, []);

  const calcMove = useCallback(() => {
    return pairs.reduce(
      (a, e, i) => {
        a[e] += values[i];
      },
      [0, 0, 0],
    );
  }, []);

  return html`<div class="Cubes">
    <div class="cubesContainer">
      ${values.map(
    (v, i) =>
      html`<${TheCube}
            number=${v}
            index=${i}
            pair=${pairs[i]}
            hidden=${cubeState == START}
            onClick=${clickCube}
          />`,
  )}
    </div>
    <button
      onClick=${() => {
      if (canRoll(cubeState)) {
        doRoll();
        return;
      }
      if (canSubmit(cubeState)) {
        console.log("submit");
        typeof submitFn === "function" && submitFn();
        setCubeState(WAITING);
      }
    }}
    >
      ${canRoll(cubeState)
      ? "ROLL"
      : cubeState == GOOD_SELECTION
        ? "GO!"
        : "CHOOSE CUBES"}
    </button>
  </div>`;
}
