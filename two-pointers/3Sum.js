/**
 * Given an integer array nums, return all the triplets 
 * [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, 
 * and nums[i] + nums[j] + nums[k] == 0.
 * Notice that the solution set must not contain duplicate triplets.
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    var result = [];
    nums = nums.sort((a, b) => a - b);
    for (var i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        var left = i + 1;
        var right = nums.length - 1;
        while (left < right) {
            if (nums[left] + nums[right] + nums[i] === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (nums[left] + nums[right] + nums[i] < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
};

// Test cases
console.log(threeSum([-1, 0, 1, 2, -1, -4])); // [[-1, -1, 2], [-1, 0, 1]]