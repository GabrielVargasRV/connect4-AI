import Token from "./Token.js";

import Board from "./Board.js";

const boardEl = document.getElementById("board");
const boardElChildren = boardEl.children;

const barDirectionProperties = {
    LTR: {
        deg: '43deg',
        xOffset: -10,
        yOffset: 140,
        width: 340,
    },
    RTL: {
        deg: '-43deg',
        xOffset: -265,
        yOffset: 140,
        width: 340,
    },
    V: {
        deg: '90deg',
        xOffset: -88,
        yOffset: 140,
        width: 240,
    },
    H: {
        deg: '0deg',
        xOffset: 20,
        yOffset: 27,
        width: 270
    }
}




class Player{
    constructor(color, id){
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