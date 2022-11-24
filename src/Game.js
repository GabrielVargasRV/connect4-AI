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


const CreateGameTableCopy = () => {
    const InitialGameTableArray = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
    ]
    
    const copy = JSON.parse(JSON.stringify(InitialGameTableArray));
    return copy;
}

class Game {
    constructor(){
        this.isRunning = false;
        this.gameTable = CreateGameTableCopy(); // <-----------------------

        this.redPlayer = new Player('red', 1);
        this.yellowPlayer = new Player('yellow', 2);


        this.turnOf = this.redPlayer;
        this.isCoolingDown = false;
    }

    restart(){
        // restart players
        this.redPlayer.restart();
        this.yellowPlayer.restart();

        // restart header and reset turnOf
        this.turnOf = this.redPlayer;
        Header.changeToRed();

        // reset table
        this.gameTable = CreateGameTableCopy(); // <-------------------------
        
        // remove winner modal
        WinnerModal.remove();

        this.isRunning = true;

        this.setCoolDownWithTimeout(500);
    }

    run(){
        this.isRunning = true;

        Keyboard.keyup(this.onKeyUp.bind(this));   
    }

    onKeyUp(event){
        if(!this.isRunning || keys[event.keyCode] === undefined || this.isCoolingDown) return;


        this.turnOf.placeToken(keys[event.keyCode], this.gameTable);
        this.changeTurnOf();

        this.setCoolDownWithTimeout(700);

        const winner = checkForWinner(this.gameTable, {red: this.redPlayer, yellow: this.yellowPlayer});
        if(winner) this.win(winner);
    }

    setCoolDownWithTimeout(milliseconds = 1000){
        this.isCoolingDown = true;
        setTimeout(() => {
            this.isCoolingDown = false;
        }, milliseconds)
    }

    win(winner){
        winner.player.winnerAnimation(winner);
        WinnerModal.setRestartFunction((event) => {this.restart()});
        WinnerModal.setWithDelay(winner.player.color, 1000);
        this.isRunning = false;
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