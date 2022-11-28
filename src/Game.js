import Player from "./Player";
import PlayerAI from "./AI";
import { checkForWinner } from "./utils";
import Keyboard from "./Keyboard";
import Header from "./Header";
import WinnerModal from "./WinnerModal";

import Board from "./Board";

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
        this.yellowPlayer = new PlayerAI('yellow', 2);


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

        Board.restart();
        
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
        const player = this.turnOf;

        if(player.mode && player.mode != 'train') return;


        player.placeToken(keys[event.keyCode])

        this.changeTurnOf();
        this.setCoolDownWithTimeout(700);
        const winner = checkForWinner(Board.getVirtualBoard(), {red: this.redPlayer, yellow: this.yellowPlayer});
        if(winner) this.win(winner);
    }

    setCoolDownWithTimeout(milliseconds = 1000){
        this.isCoolingDown = true;
        setTimeout(() => {
            this.isCoolingDown = false;
        }, milliseconds)
    }

    win(winner){
        Board.winnerAnimation({player: winner.player, tokensCoords: winner.tokensCoords, direction: winner.direction})
        WinnerModal.setRestartFunction((event) => {this.restart()});
        WinnerModal.setWithDelay(winner.player.color, 1000);
        this.isRunning = false;
    }

    playTurnOfAIWithDelay(delay = 700){
        setTimeout(() => {
            this.turnOf.placeToken();
            this.changeTurnOf()
        }, delay)
    }

  	changeTurnOf(){
        // change to yellow
		if(this.turnOf.color === 'red'){
			this.turnOf = this.yellowPlayer;

            if(this.turnOf.playerType === 'AI' && this.turnOf.mode === 'play'){
                this.playTurnOfAIWithDelay();
            }
                
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