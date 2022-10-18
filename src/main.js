import '../style.css';
import "./Player";
import Player from './Player';

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

class Game{
	constructor(){
		this.isRunning = false;
		
		this.data = board;
		
		this.redPlayer = new Player('red',1);
		this.yellowPlayer = new Player('yellow',2);

		this.turnOf = this.redPlayer;
	}

	draw(){
	}

	update(){}

	initialize(){}

	loop(){
		this.draw();
	}

	run(){
		this.isRunning = true;
		document.addEventListener('keyup', (event) => this.handleKeyUp(event));

		setInterval(() => {
			this.loop();
		}, 30);
	}

	checkForWinner(){
		const diagonalRightToLeft = (x, y, target) => {
			//o
			//  x
			//    x
			//      x

			if(
				this.data[y][x] === target && 
				this.data[y+1][x+1] === target &&
				this.data[y+2][x+2] === target &&
				this.data[y+3][x+3] === target
			){

				return [
					{x: x, y: y},
					{x: x+1, y: y+1},
					{x: x+2, y: y+2},
					{x: x+3, y: y+3},
				];
			};

			return false;
		}

		const diagonalLeftToRight = (x, y, target) => {
			//      o
			//    x
			//  x
			//x

			if(
				this.data[y][x] === target &&
				this.data[y-1][x-1] === target &&
				this.data[y-2][x-2] === target &&
				this.data[y-3][x-3] === target
			){

				return [
					{x: x, y: y},
					{x: x-1, y: y-1},
					{x: x-2, y: y-2},
					{x: x-3, y: y-3},
				];
			};

			return false;
		}

		const vertical = (x, y, target) => {
			// o
			// x
			// x
			// x

			if(
				this.data[y][x] === target &&
				this.data[y+1][x] === target &&
				this.data[y+2][x] === target &&
				this.data[y+3][x] === target
			){
				return [
					{x: x, y: y},
					{x: x, y: y+1},
					{x: x, y: y+2},
					{x: x, y: y+3},
				];
			};

			return false;
		}

		const horizontal = (x, y, target) => {
			// o x x x

			if(
				this.data[y][x] === target &&
				this.data[y][x+1] === target &&
				this.data[y][x+2] === target &&
				this.data[y][x+3] === target
			){
				return [
					{x: x, y: y},
					{x: x+1, y: y},
					{x: x+2, y: y},
					{x: x+3, y: y},
				]
			};

			return false;
		}

		for(let y = 0; y < this.data.length; y++){
			for(let x = 0; x < this.data[0].length; x++){

				if(x < 3 && y < 3){
					if(diagonalRightToLeft(x, y, this.redPlayer.id)){
						this.winnerAnimation(diagonalRightToLeft(x, y, this.redPlayer.id));
						return this.redPlayer;
					};
					if(diagonalRightToLeft(x, y, this.yellowPlayer.id)){
						this.winnerAnimation(diagonalRightToLeft(x, y, this.yellowPlayer.id));
						return this.yellowPlayer;
					};
				}

				if(x > 3 && y < 3){
					if(diagonalLeftToRight(x, y, this.redPlayer.id)){
						this.winnerAnimation(diagonalLeftToRight(x, y, this.redPlayer.id));
						return this.redPlayer;
					}
					if(diagonalLeftToRight(x, y, this.yellowPlayer.id)){
						this.winnerAnimation(diagonalLeftToRight(x, y, this.yellowPlayer.id));
						return this.yellowPlayer;
					}
				}

				if(y < 3){
					if(vertical(x, y, this.redPlayer.id)){
						this.winnerAnimation(vertical(x, y, this.redPlayer.id));
						return this.redPlayer;
					};
					if(vertical(x, y, this.yellowPlayer.id)){
						this.winnerAnimation(vertical(x, y, this.yellowPlayer.id));
						return this.yellowPlayer;
					};
				}

				if(x < 3){
					if(horizontal(x, y, this.redPlayer.id)){
						this.winnerAnimation(horizontal(x, y, this.redPlayer.id));
						return this.redPlayer;
					};
					if(horizontal(x, y, this.yellowPlayer.id)){
						this.winnerAnimation(horizontal(x, y, this.yellowPlayer.id));
						return this.yellowPlayer;
					};
				}

			}
		}


	}

	changeTurnOf(){
		if(this.turnOf.color === 'red'){
		this.turnOf = this.yellowPlayer;      
		return
		}

		this.turnOf = this.redPlayer;
	}

	handleKeyUp(event){
		if(keys[event.keyCode] === undefined) return;
		this.turnOf.placeToken(keys[event.keyCode], this.data);

		this.changeTurnOf()
		console.log(`Turn of ${this.turnOf.color}`);

		const winner = this.checkForWinner();
		if(winner){
			console.log(`Winner: ${winner.color}`);
		}
	}

	winnerAnimation(positionsOfTokens, player){
		const tokensEl = [];

		for(let token of positionsOfTokens){
			const indexOfEl = (7 * token.y) + token.x;
			if(boardElChildren[indexOfEl]) tokensEl.push(boardElChildren[indexOfEl]);
		}

		tokensEl.forEach((token, index) => {
			setTimeout(() => {
				console.log(token)
				token.animate([
					{backgroundColor: "black"},
					{backgroundColor: "green"},
					{backgroundColor: "black"},
				],{
					duration: 3000,
					iteration: 1
				})
			}, 100 * index)
		})
	}

	trainMode(){}
}

const game = new Game();

game.run();