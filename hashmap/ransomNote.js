/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
    let magazineMap = new Map();

    for (let char of magazine) {
        magazineMap.set(char, (magazineMap.get(char) || 0) + 1);
    }

    for (let char of ransomNote) {
        if (magazineMap.has(char)) {
            magazineMap.set(char, magazineMap.get(char) - 1);
            if (magazineMap.get(char) === 0) {
                magazineMap.delete(char);
            }
        } else {
            return false;
        }
    }
    return true;
};

console.log(canConstruct("a", "b"));
console.log(canConstruct("aa", "ab"));
console.log(canConstruct("aa", "aab"));
