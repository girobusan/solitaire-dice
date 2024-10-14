import { preact } from "preact";
import { useCallback, useState } from "preact/hooks";
import { html } from "htm/preact";
import Track from "../Track";
import Discards from "../Discards";
import Cubes from "../Cubes";
require("./style.scss");

// constants
const minusScore = -20;
const emptyState = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const track2pos = (n) => n - 2;
const pos2track = (n) => n + 2;
const [INITIAL, WAITING, ENDGAME] = [1, 2, 3];
//field
const firstPos = [3, 3, 4, 4, 5, 5, 5, 4, 4, 3, 3];
const scoringPos = [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
const scores = [10, 7, 6, 5, 4, 3, 4, 5, 6, 7, 10];
const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const trackLengths = firstPos.map((n, i) => n + scoringPos[i]);
//discards
const discardsTracks = [8, 8, 8];

function calcTrack(pos, firstLength, trackScore) {
 if (pos == 0) {
  return 0;
 }
 if (pos < firstLength) {
  return minusScore;
 }
 return trackScore * (pos - firstLength);
}

export default function Solitaire({ }) {
 let [positions, setPositions] = useState(emptyState.slice(0));
 let [gameState, setGameState] = useState(INITIAL);
 let [cubes, setCubes] = useState([0, 0, 0, 0]);
 let [discards, setDiscards] = useState([0, 0, 0]);
 let [discardNums, setDiscardNums] = useState([0, 0, 0]);

 const checkTracks = useCallback(
  (num1, num2) => {
   const result = [];
   //chek if first number can be used (not final)
   result.push(positions[num1 - 2] < trackLengths[num1 - 2]);
   //chek if second number can be used (not final)
   result.push(positions[num2 - 2] < trackLengths[num2 - 2]);
  },
  [positions, gameState],
 );
 const checkDiscard = useCallback(
  (discard) => {
   //if there is empty slot
   if (discards.indexOf(0) != -1) {
    return true;
   }
   //if there is a slot for d...
   let slot = discards.indexOf(discard);
   if (slot == -1) {
    return false;
   }
   //...and the slot has empty space
   return discardNums[slot] <= discardsTracks[slot];
  },
  [discards, discardNums],
 );

 return html`<div class="Solitaire">
    <div class="header">Solitaire Dice</div>
    <div class="field">
      <div class="mainField">
        ${positions.map(
  (p, i) =>
   html`<${Track}
              startL=${firstPos[i]}
              scoringL=${scoringPos[i]}
              position=${p}
              score=${calcTrack(p, firstPos[i], scoringPos[i], scores[i])}
              trackScore=${scores[i]}
              trackNumber=${numbers[i]}
            />`,
 )}
      </div>
      <div class="discards">
        <${Discards}
          discards=${discards}
          discardsTracks=${discardNums}
          trackLengths=${discardsTracks}
        />
      </div>
    </div>
    <div class="cubes"><${Cubes} /></div>
  </div>`;
}
