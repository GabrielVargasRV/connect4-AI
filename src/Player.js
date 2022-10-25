import Token from "./Token.js";

const boardEl = document.getElementById("board");
const boardElChildren = boardEl.children;

class Player{
    constructor(color, id){
        this.color = color;
        this.id = id;

        this.tokens = new Map();
    }

    placeToken(xIndex, board){
        
        for(let y = board.length - 1; y >= 0; y--){

            if(board[y][xIndex] === 0){
                board[y][xIndex] = this.id;

                const targetPosition = boardElChildren[(7 * y) + xIndex].getBoundingClientRect();
                this.tokens.set(`x${xIndex}.y${y}`, new Token(this.color, targetPosition.x, targetPosition.y));

                return;
            }
        }
    }

    winnerAnimation(posTokens){
        posTokens.forEach((posToken) => {
            const token = this.tokens.get(`x${posToken.x}.y${posToken.y}`);
            token.changeColor('green');
        })
    }
}


export default Player;