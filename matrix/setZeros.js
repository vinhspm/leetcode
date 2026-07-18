/**
 * Given an m x n integer matrix matrix, if an element is 0, 
 * set its entire row and column to 0's.
 * You must do it in place.
 */

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
    let rows = matrix.length;
    let cols = matrix[0].length;

    let rowHasZero = false;
    let colHasZero = false;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === 0) {
                if (i === 0) rowHasZero = true;
                if (j === 0) colHasZero = true;

                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }

    if (rowHasZero) {
        for (let j = 0; j < cols; j++) {
            matrix[0][j] = 0;
        }
    }

    if (colHasZero) {
        for (let i = 0; i < rows; i++) {
            matrix[i][0] = 0;
        }
    }
};