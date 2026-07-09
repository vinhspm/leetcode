/**
 * Given an array of positive integers nums and a positive integer target, 
 * return the minimal length of a subarray whose sum is greater than or equal to target. 
 * If there is no such subarray, return 0 instead.
 */


/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    var minLength = 0;
    var slow = 0;
    var fast = 0;
    var currentSum = nums[slow];
    if (currentSum >= target) return 1;

    while (fast < nums.length - 1) {
        while (currentSum < target && fast < nums.length) {
            fast++;
            currentSum += nums[fast];
        }
        while (currentSum >= target && slow <= fast) {
            minLength = fast - slow + 1 > minLength && minLength !== 0 ? minLength : fast - slow + 1;
            currentSum -= nums[slow];
            slow++;
        }
        if (minLength === 1) return 1;
    }
    return minLength;
};
// console.log(minSubArrayLen1(7, [2, 3, 1, 2, 4, 3]))
console.log(minSubArrayLen(4, [1, 4, 4]))

