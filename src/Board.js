import Token from "./Token";
import {createBoard2DArray} from "./utils";

const boardHTML = document.getElementById("board");
const boardChildrenHTML = boardHTML.children;

//--------------------------------------
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
//--------------------------------------


let virtualBoard = createBoard2DArray();
// VirtualBoard[y,x] = 0 ---> Empty
// VirtualBoard[y,x] != 0 ---> some player's id

let tokensHTML = new Map();
let barsHTML = [];

class Board{

    static getRandomBoard(){
        
    }

    static getVirtualBoard(){
        return virtualBoard;
    }

    static isCoordOnBoardEmpty(x,y){
        return virtualBoard[y][x] === 0;
    }

    static getBoundingClientRect(x, y){
        /* 
            Children array example:
            [
                0,0,0,0,0,0,0, -> length = 7
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0, -> so if I want to get array[y = 2, x = 4] then -> index = (7 * 2) + x
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,
            ]
        */

        return boardChildrenHTML[(7 * y) + x].getBoundingClientRect();
    }

    static placeToken(x, player){

        // if everything goes ok these will be the coords returned
        let placedTokenX = undefined, placedTokenY = undefined;
        let tokenHTML = null;

        // travel virtualBoard[y] from bottom to top
        for(let y = virtualBoard.length - 1; y >= 0; y--){
            if(this.isCoordOnBoardEmpty(x,y)){
                virtualBoard[y][x] = player.id;
                placedTokenX = x;
                placedTokenY = y;

                const targetPosition = this.getBoundingClientRect(x, y);
                tokenHTML = new Token(player.color, targetPosition.x, targetPosition.y);
                tokensHTML.set(`${player.id}-${x}${y}`, tokenHTML);

                return
            }
        }

        if(!placedTokenX || !placedTokenY || !tokenHTML) return null;
        return {x: placedTokenX, y: placedTokenY, tokenHTML: tokenHTML};
    }

    static winnerAnimation({player, tokensCoords, direction}){
        tokensCoords.forEach((coords, index) => {
            setTimeout(() => {
                const token = tokensHTML.get(`${player.id}-${coords.x}${coords.y}`);
                token.element.style.border = "3px solid #2B7A0B";
            }, index * 50);
        });
        
        const createBarAndAppendArguments = {
            x: tokensHTML.get(`${player.id}-${tokensCoords[0].x}${tokensCoords[0].y}`).x,
            y: tokensHTML.get(`${player.id}-${tokensCoords[0].x}${tokensCoords[0].y}`).y,
            properties: barDirectionProperties[direction],
        }

        const barHTML = this.createBarAndAppend(createBarAndAppendArguments);
        barsHTML.push(barHTML);
    }

    static createBarAndAppend({x, y, properties}){
        const barEl = document.createElement('div');

        barEl.classList.add('bar');
        barEl.style.left = `${x + properties.xOffset}px`;
        barEl.style.top = `${y + properties.yOffset}px`;
        barEl.style.width = `${properties.width}px`;
        barEl.style.transform = `rotate(${properties.deg})`;

        document.body.appendChild(barEl);

        return barEl;
    }

    static removeAllTokensHTML(){
        tokensHTML.forEach(token => token.delete());
        tokensHTML.clear();
    }

    static removeAllBarsHTML(){
        barsHTML.forEach(bar => bar.remove());
    }

    static restartVirtualBoard(){
        virtualBoard = createBoard2DArray();
    }

    static restart(){
        this.removeAllTokensHTML();
        this.removeAllBarsHTML();
        this.restartVirtualBoard();
    }

    static virtualBoardTo1D(){
        const oneDimensionVirtualBoard = [];

        for(let i = 0; i < virtualBoard.length; i++){
            for(let j of virtualBoard[i]){
                oneDimensionVirtualBoard.push(j);
            }
        }

        return oneDimensionVirtualBoard;
    }
}

export default Board;