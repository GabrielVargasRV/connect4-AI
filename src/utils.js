



export function diagonalLeftToRight(x, y, board, target){
    //o
    //  x
    //    x
    //      x

    if(x > 3 || y > 2) return false;

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

export function diagonalRightToLeft(x, y, board, target){
    //      o
    //    x
    //  x
    //x

    if(x < 3 || y > 2) return false;

    if(
        board[y][x] === target &&
        board[y+1][x-1] === target &&
        board[y+2][x-2] === target &&
        board[y+3][x-3] === target
    ){

        return [
            {x: x, y: y},
            {x: x-1, y: y+1},
            {x: x-2, y: y+2},
            {x: x-3, y: y+3},
        ];
    };

    return false;
}

export function vertical(x, y, board, target){
    // o
    // x
    // x
    // x

    if(y > 2) return false;
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
            const diagonalRightToLeftRedPlayerResult = diagonalRightToLeft(x, y, board, players.red.id);
            if(diagonalRightToLeftRedPlayerResult){
                return {
                    tokensCoords: diagonalRightToLeftRedPlayerResult,
                    player: players.red,
                    direction: 'RTL'
                }
            }

            // Diagonal right to left yellow player
            const diagonalRightToLeftYellowPlayerResult = diagonalRightToLeft(x, y, board, players.yellow.id);
            if(diagonalRightToLeftYellowPlayerResult){
                return {
                    tokensCoords: diagonalRightToLeftYellowPlayerResult,
                    player: players.yellow,
                    direction: 'RTL'
                }
            }

            // Diagonal left to right red player
            const diagonalLeftToRightRedPlayerResult = diagonalLeftToRight(x, y, board, players.red.id);
            if(diagonalLeftToRightRedPlayerResult){
                return {
                    tokensCoords: diagonalLeftToRightRedPlayerResult,
                    player: players.red,
                    direction: 'LTR'
                }
            }

            // Diagonal left to right yellow player
            const diagonalLeftToRightYellowPlayerResult = diagonalLeftToRight(x, y, board, players.yellow.id);
            if(diagonalLeftToRightYellowPlayerResult){
                return {
                    tokensCoords: diagonalLeftToRightYellowPlayerResult,
                    player: players.yellow,
                    direction: 'LTR'
                }
            }

            // Vertical red player
            const verticalRedPlayerResult = vertical(x, y, board, players.red.id);
            if(verticalRedPlayerResult){
                return {
                    tokensCoords: verticalRedPlayerResult,
                    player: players.red,
                    direction: 'V'
                }
            }

            // Vertical yellow player
            const verticalYellowPlayerResult = vertical(x, y, board, players.yellow.id);
            if(verticalYellowPlayerResult){
                return {
                    tokensCoords: verticalYellowPlayerResult,
                    player: players.yellow,
                    direction: 'V'
                }
            }

            // Horizontal red player
            const horizontalRedPlayerResult = horizontal(x, y, board, players.red.id);
            if(horizontalRedPlayerResult){
                return {
                    tokensCoords: horizontalRedPlayerResult,
                    player: players.red,
                    direction: 'H'
                }
            }

            // Horizontal yellow player
            const horizontalYellowPlayerResult = horizontal(x, y, board, players.yellow.id);
            if(horizontalYellowPlayerResult) {
                return {
                    tokensCoords: horizontalYellowPlayerResult,
                    player: players.yellow,
                    direction: 'H'
                }
            }

        }
    }


}


