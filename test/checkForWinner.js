
import assert from "assert";
import { checkForWinner } from "../src/utils.js";
import Player from "../src/Player.js";

describe('Check for winner', () => {

    const text = `
        [0,0,0,0,0,0,0]\n
        [0,0,0,0,0,0,0]\n
        [0,0,0,0,0,0,0]\n
        [0,0,0,0,0,0,0]\n
        [0,0,0,0,0,0,0]\n
        [1,1,1,1,0,0,0]\n
        \n
        should return red player.
    `;

    const parameter1 = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [1,1,1,1,0,0,0],
    ]

    const parameter2 = {
        red: new Player('red', 1),
        yellow: new Player('yellow', 2)
    }

    const expected = {
        tokensCoords: [
            {x: 0, y: 5},
            {x: 1, y: 5},
            {x: 2, y: 5},
            {x: 3, y: 5},
        ],
        player: parameter2.red,
    }

    it(text,() => {
        assert.equal(checkForWinner(parameter1, parameter2), expected)
    })
})
