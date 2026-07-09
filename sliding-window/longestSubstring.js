/**Given a string s, find the length of the longest substring without duplicate characters. */

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    var currentSubstring = '';
    var maxLength = 0;
    for (var i = 0; i < s.length; i++) {
        var j = currentSubstring.indexOf(s[i])
        currentSubstring += s[i];
        if (j < 0) {
            maxLength = Math.max(maxLength, currentSubstring.length);
        } else {
            currentSubstring = currentSubstring.substring(j + 1, currentSubstring.length);
        }
    }
    return maxLength;

};

console.log(lengthOfLongestSubstring("dvdf"))