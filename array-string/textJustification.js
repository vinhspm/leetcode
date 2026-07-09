/**
 * LeetCode 68: Text Justification
 * 
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
function fullJustify(words, maxWidth) {
    const result = [];
    let i = 0;

    while (i < words.length) {
        // Bắt đầu dòng mới với từ đầu tiên
        let lineWords = [words[i]];
        let lineLength = words[i].length;
        i++;

        // Cách tiếp cận Tham lam (Greedy): Gom càng nhiều từ càng tốt vào dòng hiện tại
        // Độ dài tối thiểu khi thêm từ tiếp theo = độ dài hiện tại + 1 dấu cách + độ dài từ mới
        while (i < words.length && lineLength + 1 + words[i].length <= maxWidth) {
            lineWords.push(words[i]);
            lineLength += 1 + words[i].length;
            i++;
        }

        // Định dạng (Format) dòng hiện tại dựa trên các điều kiện
        const isLastLine = (i === words.length);
        const isSingleWordLine = (lineWords.length === 1);

        if (isLastLine || isSingleWordLine) {
            // Trường hợp 1: Dòng cuối cùng hoặc dòng chỉ có 1 từ
            // -> Căn lề trái (Left-justified): Nối các từ bằng 1 dấu cách, phần thừa bù khoảng trắng bên phải
            let line = lineWords.join(' ');
            let padding = maxWidth - line.length;
            result.push(line + ' '.repeat(padding));
        } else {
            // Trường hợp 2: Dòng bình thường có từ 2 từ trở lên
            // -> Căn lề đều 2 bên (Fully-justified)
            let totalWordLength = lineWords.reduce((sum, word) => sum + word.length, 0);
            let totalSpaces = maxWidth - totalWordLength;
            let gaps = lineWords.length - 1; // Số khoảng trống giữa các từ

            let baseSpaces = Math.floor(totalSpaces / gaps); // Số lượng khoảng trắng tối thiểu mỗi khoảng trống
            let extraSpaces = totalSpaces % gaps;            // Số khoảng trắng dư thừa cần phân phối từ trái qua phải

            let line = '';
            for (let j = 0; j < gaps; j++) {
                line += lineWords[j];
                // Phân phối: j khoảng trống đầu tiên nhận thêm 1 khoảng trắng dư thừa
                let spacesToApply = baseSpaces + (j < extraSpaces ? 1 : 0);
                line += ' '.repeat(spacesToApply);
            }
            line += lineWords[lineWords.length - 1]; // Ghép từ cuối cùng của dòng
            result.push(line);
        }
    }

    return result;
}

// ==================== TEST CASES ====================
const words1 = ["This", "is", "an", "example", "of", "text", "justification."];
const maxWidth1 = 16;
console.log("--- Example 1 ---");
console.log(JSON.stringify(fullJustify(words1, maxWidth1), null, 2));

const words2 = ["What","must","be","acknowledgment","shall","be"];
const maxWidth2 = 16;
console.log("\n--- Example 2 ---");
console.log(JSON.stringify(fullJustify(words2, maxWidth2), null, 2));

const words3 = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"];
const maxWidth3 = 20;
console.log("\n--- Example 3 ---");
console.log(JSON.stringify(fullJustify(words3, maxWidth3), null, 2));
