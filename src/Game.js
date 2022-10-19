import Player from "./Player";
import { checkForWinner } from "./utils";

// Game Utils




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


    loop(){

    }

    run(){
        this.isRunning = true;

        setInterval(() => {
            this.loop();
        }, 30)

    }



}