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
        const barElement = document.createElement('div');
        
        barElement.classList.add('bar');
        barElement.style.left = `${x + properties.xOffset}px`;
        barElement.style.top = `${y + properties.yOffset}px`;
        barElement.style.width = `${properties.width}px`
        barElement.style.transform = `rotate(${properties.deg})`;

        document.body.appendChild(barElement);

        return barElement;
    }
}


export default Player;