import '../style.css';
import "./Player";
import Player from './Player';
import Keyboard from "./Keyboard";

import Game from "./Game";

const net = new brain.NeuralNetwork();
const data = [
  {
    input: { r: 0, g: 0, b: 0},
    output: [1],
  },
  {
    input: { r: 1, g: 1, b: 1},
    output: [0],
  }
]
net.train(data);

const board = [
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0],
];

const keys = {
	49: 0,
	50: 1,
	51: 2,
	52: 3,
	53: 4,
	54: 5,
	55: 6,
}

const boardEl = document.getElementById("board");
const boardElChildren = boardEl.children;

const game = new Game();

game.run();