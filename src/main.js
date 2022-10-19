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

	trainMode(){}
}

const game = new Game();

game.run();