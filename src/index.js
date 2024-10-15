import "preact/debug";
console.log("Solitaire Dice");
import { h, render } from "preact";
import Solitaire from "./components/Solitaire";

function mountGame(el) {
 console.log("Mount game", el);
 const game = h(Solitaire, {});
 render(game, el);
}

window.addEventListener("DOMContentLoaded", () =>
 mountGame(document.querySelector("#game")),
);
