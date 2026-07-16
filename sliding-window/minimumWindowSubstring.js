/**
 * Given two strings s and t of lengths m and n respectively, 
 * return the minimum window substring of s such that every character in 
 * t (including duplicates) is included in the window.
 * If there is no such substring, return the empty string "".
 * The testcases will be generated such that the answer is unique.
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    var tFreq = new Map();
    var windowFreq = new Map();

    for (let char of t) {
        tFreq.set(char, (tFreq.get(char) || 0) + 1);
    }

    var left = 0;
    var right = 0;
    var required = tFreq.size;
    var formed = 0;
    var minLen = Infinity;
    var start = 0;

    while (right < s.length) {
        let char = s[right];
        windowFreq.set(char, (windowFreq.get(char) || 0) + 1);

        if (tFreq.has(char) && windowFreq.get(char) === tFreq.get(char)) {
            formed++;
        }

        while (left <= right && formed === required) {
            let currentLen = right - left + 1;
            if (currentLen < minLen) {
                minLen = currentLen;
                start = left;
            }

            let leftChar = s[left];
            windowFreq.set(leftChar, windowFreq.get(leftChar) - 1);

            if (tFreq.has(leftChar) && windowFreq.get(leftChar) < tFreq.get(leftChar)) {
                formed--;
            }
            left++;
        }
        right++;
    }

    return minLen === Infinity ? "" : s.substring(start, start + minLen);
};