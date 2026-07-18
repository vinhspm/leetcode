/**
 * You are given an n x n 2D matrix representing an image, 
 * rotate the image by 90 degrees (clockwise).
 * You have to rotate the image in-place, which means you have to modify
 * the input 2D matrix directly. DO NOT allocate another 2D matrix
 * and do the rotation.
 */

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
    let left = 0;
    let right = matrix.length - 1;

    while (left < right) {
        for (let i = 0; i < right - left; i++) {
            let top = left;
            let bottom = right;

            // 1. Lưu biến tạm thời ở vị trí top-left
            let topLeft = matrix[top][left + i];

            // 2. Di chuyển bottom-left lên top-left
            matrix[top][left + i] = matrix[bottom - i][left];

            // 3. Di chuyển bottom-right sang bottom-left
            matrix[bottom - i][left] = matrix[bottom][right - i];

            // 4. Di chuyển top-right xuống bottom-right
            matrix[bottom][right - i] = matrix[top + i][right];

            // 5. Gán giá trị lưu tạm vào vị trí top-right
            matrix[top + i][right] = topLeft;
        }
        left++;
        right--;
    }
};