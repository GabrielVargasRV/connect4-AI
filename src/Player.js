import Board from "./Board.js";

class Player{
    constructor(color, id){
        this.playerType = 'Human';
        this.color = color;
        this.id = id;
    }
    restart(){}
    placeToken(x){
        Board.placeToken(x, this);
    }

    winnerAnimation({tokensCoords, direction}){
        Board.winnerAnimation({player: this, tokensCoords: tokensCoords, direction: direction});
    }
}


export default Player;