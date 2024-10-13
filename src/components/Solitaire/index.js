import { preact } from "preact";
import { useCallback, useState } from "preact/hooks";
import { html } from "htm/preact";
import Track from "../Track";

const emptyState = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const track2pos = (n) => n - 2;
const pos2track = (n) => n + 2;
const firstPos = [3, 3, 4, 4, 5, 5, 5, 4, 4, 3, 3];
const scoringPos = [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
const scores = [10, 7, 6, 5, 4, 3, 4, 5, 6, 7, 10];
const minusScore = -20;
const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const trackLengths = firstPos.map((n, i) => n + scoringPos[i]);
const discardsTracks = [8, 8, 8];
const [INITIAL, WAITING, ENDGAME] = [1, 2, 3];

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

 const checkMove = useCallback(
  (num1, num2, discard) => {
   //chek if first number can be used (not final)
   //chek if second number can be used (not final)
   //check if discard is valid (free roll decided by cubes comp?)
  },
  [positions, gameState, discards, discardNums],
 );

 return html`<div class="Solitaire">
    Solitaire Dice
    <div class="mainField">
      ${positions.map(
  (p, i) =>
   html`<${Track}
            startL=${firstPos[i]}
            scoringL=${scoringPos[i]}
            position=${p}
          />`,
 )}
    </div>
    <div class="discards"></div>
    <div class="cubes"></div>
  </div>`;
}
