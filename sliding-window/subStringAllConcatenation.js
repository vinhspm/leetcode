/**
 * You are given a string s and an array of strings words. All the strings of words are of the same length.
 * A concatenated string is a string that exactly contains all the strings of any permutation of words concatenated.
 * For example, if words = ["ab","cd","ef"], then "abcdef", "abefcd", 
 * "cdabef", "cdefab", "efabcd", and "efcdab" are all concatenated strings. 
 * "acdbef" is not a concatenated string because it is not the concatenation of any permutation of words.
 * Return an array of the starting indices of all the concatenated substrings in s. You can return the answer in any order.
 */
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
    let result = [];
    if (s.length === 0 || words.length === 0) return result;

    let wordLength = words[0].length;
    let wordsLength = words.length;
    let totalLength = wordLength * wordsLength;

    let wordsMap = new Map();
    for (let j = 0; j < words.length; j++) {
        wordsMap.set(words[j], (wordsMap.get(words[j]) || 0) + 1);
    }

    for (let i = 0; i <= s.length - totalLength; i++) {
        let currentMap = new Map(wordsMap);
        let currentSubString = s.substring(i, i + totalLength);
        let matchedWordsCount = 0;

        for (let j = 0; j < totalLength; j += wordLength) {
            let currentWord = currentSubString.substring(j, j + wordLength);
            if (currentMap.has(currentWord) && currentMap.get(currentWord) > 0) {
                currentMap.set(currentWord, currentMap.get(currentWord) - 1);
                matchedWordsCount++;
            } else {
                break;
            }
        }

        if (matchedWordsCount === wordsLength) {
            result.push(i);
        }
    }

    return result;


};

console.log("Cơ bản:", findSubstring("barfoothefoobarman", ["foo", "bar"]));

/**
 * Cách tiếp cận 2: Sliding Window tối ưu (nhảy theo wordLength)
 * Độ phức tạp O(N)
 */
var findSubstringAdvanced = function (s, words) {
    let result = [];
    if (s.length === 0 || words.length === 0) return result;

    let wordLength = words[0].length;
    let wordsLength = words.length;

    let wordsMap = new Map();
    for (let word of words) {
        wordsMap.set(word, (wordsMap.get(word) || 0) + 1);
    }

    // Các từ có chiều dài bằng nhau, nên điểm bắt đầu cửa sổ hợp lệ 
    // chỉ có thể rơi vào các index từ 0 đến wordLength - 1.
    for (let i = 0; i < wordLength; i++) {
        let left = i;
        let right = i;
        let currentMap = new Map();
        let validWordsCount = 0;

        // Bắt đầu trượt cửa sổ
        while (right + wordLength <= s.length) {
            // Lấy từ tiếp theo bên phải
            let word = s.substring(right, right + wordLength);
            right += wordLength;

            if (wordsMap.has(word)) {
                currentMap.set(word, (currentMap.get(word) || 0) + 1);
                validWordsCount++;

                // Nếu từ hiện tại xuất hiện nhiều hơn số lần cho phép, 
                // thu hẹp cửa sổ từ bên trái cho đến khi hợp lệ
                while (currentMap.get(word) > wordsMap.get(word)) {
                    let leftWord = s.substring(left, left + wordLength);
                    currentMap.set(leftWord, currentMap.get(leftWord) - 1);
                    validWordsCount--;
                    left += wordLength;
                }

                // Khi gom đủ số lượng từ => Tìm được chuỗi hợp lệ
                if (validWordsCount === wordsLength) {
                    result.push(left);

                    // Thả từ ngoài cùng bên trái ra để tiếp tục trượt
                    let leftWord = s.substring(left, left + wordLength);
                    currentMap.set(leftWord, currentMap.get(leftWord) - 1);
                    validWordsCount--;
                    left += wordLength;
                }
            } else {
                // Nếu gặp từ không nằm trong words, chuỗi bị ngắt quãng. 
                // Reset toàn bộ cửa sổ.
                currentMap.clear();
                validWordsCount = 0;
                left = right;
            }
        }
    }

    return result;
};

console.log("Tối ưu:", findSubstringAdvanced("barfoothefoobarman", ["foo", "bar"]));
