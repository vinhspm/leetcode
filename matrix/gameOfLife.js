/**
 * According to Wikipedia's article: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."
 * The board is made up of an m x n grid of cells, where each cell has an initial state: live (represented by a 1) or dead (represented by a 0). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):
 * Any live cell with fewer than two live neighbors dies as if caused by under-population.
 * Any live cell with two or three live neighbors lives on to the next generation.
 * Any live cell with more than three live neighbors dies, as if by over-population.
 * Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
 * The next state of the board is determined by applying the above rules simultaneously to every cell in the current state of the m x n grid board. In this process, births and deaths occur simultaneously.
 * Given the current state of the board, update the board to reflect its next state.
 * Note that you do not need to return anything.
 * Example 1:
Input: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
Explanation: 
Live neighbors: 
- Cell (0,1) has 1 live neighbor(s)
- Cell (1,2) has 3 live neighbor(s)
- Cell (2,0) has 1 live neighbor(s)
- Cell (2,1) has 3 live neighbor(s)
- Cell (2,2) has 3 live neighbor(s)

Example 2:
Input: board = [[1,1],[1,0]]
Output: [[1,1],[1,1]]
Explanation: 
Live neighbors: 
- Cell (0,0) has 2 live neighbor(s)
- Cell (0,1) has 2 live neighbor(s)
- Cell (1,0) has 2 live neighbor(s)
- Cell (1,1) has 1 live neighbor(s)
*/
/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function (board) {
    const n = board.length;
    const m = board[0].length;

    // Directions for neighbors
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    // First pass: **Mark** temporary state changes
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            let liveNeighbors = 0;
            for (const [dx, dy] of directions) {
                const ni = i + dx;
                const nj = j + dy;

                if (ni >= 0 && ni < n && nj >= 0 && nj < m) {
                    // Check if neighbor was originally live
                    if (board[ni][nj] === 1 || board[ni][nj] === 2) {
                        liveNeighbors++;
                    }
                }
            }

            if (board[i][j] === 1) { // Current cell is live
                if (liveNeighbors < 2 || liveNeighbors > 3) {
                    board[i][j] = 2; // live -> dead
                }
            } else { // Current cell is dead
                if (liveNeighbors === 3) {
                    board[i][j] = 3; // dead -> live
                }
            }
        }
    }

    // Second pass: **Finalize** state changes
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (board[i][j] === 2) {
                board[i][j] = 0; // Finalize live -> dead
            } else if (board[i][j] === 3) {
                board[i][j] = 1; // Finalize dead -> live
            }
        }
    }
};