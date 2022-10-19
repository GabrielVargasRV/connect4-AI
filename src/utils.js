



export function diagonalRightToLeft(x, y, board, target){
    //o
    //  x
    //    x
    //      x

    if(x > 3 && y > 3) return false;

    if(
        board[y][x] === target && 
        board[y+1][x+1] === target &&
        board[y+2][x+2] === target &&
        board[y+3][x+3] === target
    ){

        return [
            {x: x, y: y},
            {x: x+1, y: y+1},
            {x: x+2, y: y+2},
            {x: x+3, y: y+3},
        ];
    };

    return false;
}

export function diagonalLeftToRight(x, y, board, target){
    //      o
    //    x
    //  x
    //x

    if(x < 3 && y > 3) return false;

    if(
        board[y][x] === target &&
        board[y-1][x-1] === target &&
        board[y-2][x-2] === target &&
        board[y-3][x-3] === target
    ){

        return [
            {x: x, y: y},
            {x: x-1, y: y-1},
            {x: x-2, y: y-2},
            {x: x-3, y: y-3},
        ];
    };

    return false;
}

export function vertical(x, y, board, target){
    // o
    // x
    // x
    // x

    if(y > 3) return false;

    if(
        board[y][x] === target &&
        board[y+1][x] === target &&
        board[y+2][x] === target &&
        board[y+3][x] === target
    ){
        return [
            {x: x, y: y},
            {x: x, y: y+1},
            {x: x, y: y+2},
            {x: x, y: y+3},
        ];
    };

    return false;
}

export function horizontal(x, y, board, target){
    // o x x x

    if(x > 3) return false;

    if(
        board[y][x] === target &&
        board[y][x+1] === target &&
        board[y][x+2] === target &&
        board[y][x+3] === target
    ){
        return [
            {x: x, y: y},
            {x: x+1, y: y},
            {x: x+2, y: y},
            {x: x+3, y: y},
        ]
    };

    return false;
}


export function checkForWinner(board, players){


    for(let y = 0; y < board.length; y++){
        for(let x = 0; x < board[0].length; x++){

            // Diagonal right to left red player
            const diagonalRightToLeftRedPlayerResult = diagonalRightToLeft(x, y, board, players.red);
            if(diagonalRightToLeftRedPlayerResult){
                return {
                    tokensCoords: diagonalRightToLeftRedPlayerResult,
                    player: players.red,
                }
            }

            // Diagonal right to left yellow player
            const diagonalRightToLeftYellowPlayerResult = diagonalRightToLeft(x, y, board, players.yellow);
            if(diagonalRightToLeftYellowPlayerResult){
                return {
                    tokensCoords: diagonalRightToLeftYellowPlayerResult,
                    player: players.yellow,
                }
            }

            // Diagonal left to right red player
            const diagonalLeftToRightRedPlayerResult = diagonalRightToLeft(x, y, board, players.red);
            if(diagonalLeftToRightRedPlayerResult){
                return {
                    tokensCoords: diagonalLeftToRightRedPlayerResult,
                    player: players.red
                }
            }

            // Diagonal left to right yellow player
            const diagonalLeftToRightYellowPlayerResult = diagonalRightToLeft(x, y, board, players.yellow);
            if(diagonalLeftToRightYellowPlayerResult){
                return {
                    tokensCoords: diagonalLeftToRightYellowPlayerResult,
                    player: players.red
                }
            }

            // Vertical red player
            const verticalRedPlayerResult = vertical(x, y, board, players.red);
            if(verticalRedPlayerResult){
                return {
                    tokensCoords: verticalRedPlayerResult,
                    player: players.red,
                }
            }

            // Vertical yellow player
            const verticalYellowPlayerResult = vertical(x, y, board, players.yellow);
            if(verticalYellowPlayerResult){
                return {
                    tokensCoords: verticalYellowPlayerResult,
                    player: players.yellow
                }
            }

            // Horizontal red player
            const horizontalRedPlayerResult = horizontal(x, y, board, players.red);
            if(horizontalRedPlayerResult){
                return {
                    tokensCoords: horizontalRedPlayerResult,
                    player: players.red,
                }
            }

            // Horizontal yellow player
            const horizontalYellowPlayerResult = horizontal(x, y, board, players.yellow);
            if(horizontalYellowPlayerResult) {
                return {
                    tokensCoords: horizontalYellowPlayerResult,
                    player: players.yellow
                }
            }

        }
    }


}
