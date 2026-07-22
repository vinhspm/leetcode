/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
    let charSMap = new Map();
    let charTMap = new Map();
    for (let i = 0; i < s.length; i++) {
        const sChar = s[i];
        const tChar = t[i];
        if (charSMap.has(sChar) && charSMap.get(sChar) !== tChar) return false;
        if (charTMap.has(tChar) && charTMap.get(tChar) !== sChar) return false;
        charSMap.set(sChar, tChar);
        charTMap.set(tChar, sChar);
    }
    return true;
};

let s = "badc", t = "baba";
console.log(isIsomorphic(s, t))