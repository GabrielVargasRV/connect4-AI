import Token from "./Token.js";

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

        this.tokens = new Map();
    }

    restart(){
        this.deleteAllTokens();
        this.barEl?.remove();
    }

    createToken(targetPosition){
        return new Token(this.color, targetPosition.x, targetPosition.y)
    }

    getBoundingClientRect(x, y){
        return boardElChildren[(7 * y) + x].getBoundingClientRect();
    }

    setToken(x, y, token){
        this.tokens.set(`x${x}.y${y}`, token);
    }

    placeToken(xIndex, board, callback){

        const checkIfPlaceIsEmpty = (y) => {
            return board[y][xIndex] === 0;
        }
        
        for(let y = board.length - 1; y >= 0; y--){

            if(checkIfPlaceIsEmpty(y)){
                board[y][xIndex] = this.id;

                const targetPosition = this.getBoundingClientRect(xIndex, y);
                const token = this.createToken(targetPosition);
                this.setToken(xIndex, y, token);

                return;
            }
        }
    }

    winnerAnimation({tokensCoords, direction}){
        tokensCoords.forEach((coords, index) => {
            setTimeout(() => {
                const token = this.tokens.get(`x${coords.x}.y${coords.y}`);
                token.element.style.border = '3px solid #2B7A0B';
            }, index * 50);
        })

        const createBarAndAppendArguments = {
            x: this.tokens.get(`x${tokensCoords[0].x}.y${tokensCoords[0].y}`).x,
            y: this.tokens.get(`x${tokensCoords[0].x}.y${tokensCoords[0].y}`).y,
            properties: barDirectionProperties[direction],
        }
        this.createBarAndAppend(createBarAndAppendArguments);
    }

    createBarAndAppend({x, y, properties}){
        this.barEl = document.createElement('div');
        
        this.barEl.classList.add('bar');
        this.barEl.style.left = `${x + properties.xOffset}px`;
        this.barEl.style.top = `${y + properties.yOffset}px`;
        this.barEl.style.width = `${properties.width}px`
        this.barEl.style.transform = `rotate(${properties.deg})`;

        document.body.appendChild(this.barEl);

        return this.barEl;
    }


    deleteAllTokens(){
        this.tokens.forEach((token) => {
            token.delete();
        });

        this.tokens.clear();
    }
}


export default Player;