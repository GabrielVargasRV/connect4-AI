import Player from "./Player";
import { checkForWinner } from "./utils";
import Keyboard from "./Keyboard";
import Header from "./Header";
import WinnerModal from "./WinnerModal";

// Game Utils

const keys = {
	49: 0,
	50: 1,
	51: 2,
	52: 3,
	53: 4,
	54: 5,
	55: 6,
}


class Game {
    constructor(){
        this.isRunning = false;
        this.data = [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
        ]

        this.redPlayer = new Player('red', 1);
        this.yellowPlayer = new Player('yellow', 2);


        this.turnOf = this.redPlayer;
    }

    run(){
        this.isRunning = true;

        Keyboard.keyup((event) => {
            if(!this.isRunning || keys[event.keyCode] === undefined) return;

            this.turnOf.placeToken(keys[event.keyCode], this.data);
            this.changeTurnOf();

            const winner = checkForWinner(this.data, {red: this.redPlayer, yellow: this.yellowPlayer});
            if(winner){
                winner.player.winnerAnimation(winner);
                WinnerModal.setWithDelay(winner.player.color, 1000);
                this.isRunning = false;
            }
        })
        
    }

  	changeTurnOf(){
        // change to yellow
		if(this.turnOf.color === 'red'){
			this.turnOf = this.yellowPlayer;
            Header.changeToYellow();
			return;
		}

        // change to red
		this.turnOf = this.redPlayer;
        Header.changeToRed();
        return;
	}



}

export default Game;