/**
 * Given an m x n matrix, return all elements of the matrix in spiral order.
 */

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
    let result = [];
    let rows = matrix.length;
    let cols = matrix[0].length;

    let left = 0;
    let right = cols - 1;
    let top = 0;
    let bottom = rows - 1;

    while (left <= right && top <= bottom) {
        // Traverse Right
        for (let i = left; i <= right; i++) {
            result.push(matrix[top][i]);
        }
        top++;

        // Traverse Down
        for (let i = top; i <= bottom; i++) {
            result.push(matrix[i][right]);
        }
        right--;

        // Traverse Left
        for (let i = right; i >= left; i--) {
            if (top <= bottom) {
                result.push(matrix[bottom][i]);
            }
        }
        bottom--;

        // Traverse Up
        for (let i = bottom; i >= top; i--) {
            if (left <= right) {
                result.push(matrix[i][left]);
            }
        }
        left++;
    }

    return result;
};

console.log("Basic:", spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
console.log("Basic:", spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])); // expect [1,2,3,4,8,12,11,10,9,5,6,7]  