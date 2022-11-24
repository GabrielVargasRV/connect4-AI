import {createBoard2DArray} from "./utils";

const boardHTML = document.getElementById("board");
boardChildrenHTML = boardHTML.children;


let virtualBoard = createBoard2DArray();
// VirtualBoard[y,x] = 0 ---> Empty
// VirtualBoard[y,x] = 1 ---> Red Player's Token
// VirtualBoard[y,x] = 2 ---> Yellow Player's Token 

class Board{

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

        return boardChildrenHTML[(7 * y) + x].getBoundingClientRect()
    }
}

export default Board;