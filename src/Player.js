import Token from "./Token";

const boardEl = document.getElementById("board");
const boardElChildren = boardEl.children;

class Player{
    constructor(color, id){
        this.color = color;
        this.id = id;

        this.tokens = [];
    }

    placeToken(xIndex, board){
        
        for(let y = board.length - 1; y >= 0; y--){

            if(board[y][xIndex] === 0){
                board[y][xIndex] = this.id;

                const targetPosition = boardElChildren[(7 * y) + xIndex].getBoundingClientRect();
                this.tokens.push(new Token(this.color, targetPosition.x, targetPosition.y));

                return;
            }
        }
    }
}


export default Player;