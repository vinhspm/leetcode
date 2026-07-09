# LeetCode 68: Text Justification (Căn lề văn bản)

## 1. Đề bài (Problem Statement)
Cho một mảng các chuỗi `words` và độ rộng tối đa `maxWidth`. Hãy định dạng văn bản sao cho mỗi dòng có độ dài chính xác là `maxWidth` ký tự và được căn lề đều hai bên (fully justified).

Bạn nên đóng gói các từ theo cách tiếp cận **tham lam (greedy)**, tức là xếp càng nhiều từ vào mỗi dòng càng tốt. Thêm các khoảng trắng `' '` khi cần thiết để mỗi dòng có độ rộng đúng `maxWidth`.

Các khoảng trắng thừa giữa các từ nên được phân phối đều nhất có thể. Nếu số lượng khoảng trắng trên một dòng không chia đều cho các khoảng trống giữa các từ, các khe trống ở bên trái sẽ được phân phối nhiều khoảng trắng hơn các khe trống ở bên phải.

Đối với dòng cuối cùng của văn bản, nó phải được **căn lề trái (left-justified)** và không chèn thêm khoảng trắng thừa giữa các từ (chỉ có 1 khoảng trắng đơn giữa các từ, phần thừa dồn hết về bên phải).

---

## 2. Phân tích & Hướng tiếp cận (Interview Strategy)

Đây là dạng bài toán **Mô phỏng (Simulation)** kết hợp thuật toán **Tham lam (Greedy)**. Ý tưởng cốt lõi là chia bài toán thành 2 bước chính độc lập:

### Bước 1: Gom từ vào dòng hiện tại (Greedy Grouping)
Chúng ta duyệt qua danh sách các từ và gom nhiều từ nhất có thể vào dòng hiện tại sao cho:
$$\sum (\text{độ dài các từ}) + \text{số từ} - 1 \le \text{maxWidth}$$
*(Mỗi từ phải cách nhau ít nhất 1 dấu cách).*

* Giả sử dòng hiện tại đã có một số từ, khi muốn thêm một từ tiếp theo, độ dài tối thiểu của dòng sẽ tăng thêm: `1 (khoảng trắng tối thiểu) + độ dài từ mới`.
* Nếu tổng độ dài vượt quá `maxWidth`, ta dừng lại, định dạng dòng hiện tại rồi bắt đầu dòng mới với từ đó.

### Bước 2: Căn lề cho dòng (Justification Rules)
Khi đã chọn xong danh sách từ cho dòng hiện tại (`lineWords`), ta định dạng dòng đó dựa trên 2 trường hợp:

* **Trường hợp A: Dòng cuối cùng** HOẶC **Dòng chỉ có 1 từ**
  * Nối các từ lại với nhau bằng đúng **1 khoảng trắng** (`lineWords.join(' ')`).
  * Tính số khoảng trắng còn thiếu: `padding = maxWidth - line.length`.
  * Bù thêm khoảng trắng vào phía cuối (bên phải): `line + ' '.repeat(padding)`.

* **Trường hợp B: Dòng bình thường (có từ 2 từ trở lên)**
  * Cần căn đều 2 bên (Fully-justified).
  * Gọi $N$ là số từ trong dòng. Số khe trống giữa các từ sẽ là: $\text{gaps} = N - 1$.
  * Tổng số khoảng trắng cần phân bổ: $\text{totalSpaces} = \text{maxWidth} - \text{tổng độ dài các từ}$.
  * Phân phối khoảng trắng:
    * Số khoảng trắng tối thiểu mỗi khe: $\text{baseSpaces} = \lfloor \text{totalSpaces} / \text{gaps} \rfloor$.
    * Số khoảng trắng dư thừa còn lại: $\text{extraSpaces} = \text{totalSpaces} \pmod{\text{gaps}}$.
  * **Quy tắc:** Các khe thứ $j$ (từ trái qua phải, $0 \le j < \text{gaps}$) sẽ nhận:
    * $\text{baseSpaces} + 1$ khoảng trắng nếu $j < \text{extraSpaces}$.
    * $\text{baseSpaces} + 0$ khoảng trắng nếu $j \ge \text{extraSpaces}$.

---

## 3. Mã nguồn chi tiết (JavaScript)

```javascript
/**
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

        // 1. Gom từ tối đa cho dòng hiện tại (Greedy)
        while (i < words.length && lineLength + 1 + words[i].length <= maxWidth) {
            lineWords.push(words[i]);
            lineLength += 1 + words[i].length;
            i++;
        }

        const isLastLine = (i === words.length);
        const isSingleWordLine = (lineWords.length === 1);

        // 2. Định dạng dòng hiện tại
        if (isLastLine || isSingleWordLine) {
            // Căn lề trái
            let line = lineWords.join(' ');
            let padding = maxWidth - line.length;
            result.push(line + ' '.repeat(padding));
        } else {
            // Căn lề đều hai bên (Fully-justified)
            let totalWordLength = lineWords.reduce((sum, word) => sum + word.length, 0);
            let totalSpaces = maxWidth - totalWordLength;
            let gaps = lineWords.length - 1;

            let baseSpaces = Math.floor(totalSpaces / gaps);
            let extraSpaces = totalSpaces % gaps;

            let line = '';
            for (let j = 0; j < gaps; j++) {
                line += lineWords[j];
                // Phân phối thêm 1 khoảng trắng cho các khe bên trái nếu còn dư
                let spacesToApply = baseSpaces + (j < extraSpaces ? 1 : 0);
                line += ' '.repeat(spacesToApply);
            }
            line += lineWords[lineWords.length - 1]; // Ghép từ cuối cùng
            result.push(line);
        }
    }

    return result;
}
```

---

## 4. Đánh giá độ phức tạp (Complexity Analysis)

* **Thời gian (Time Complexity):** $\mathcal{O}(N)$
  * Trong đó $N$ là tổng số ký tự của tất cả các từ trong mảng `words`.
  * Chúng ta chỉ duyệt qua mỗi từ một lần để gom dòng. Việc phân bổ khoảng trắng và tạo chuỗi dòng mới cũng chỉ duyệt qua số lượng ký tự tương ứng trên mỗi dòng. Do đó thời gian chạy tuyến tính.
* **Không gian (Space Complexity):** $\mathcal{O}(1)$ phụ trợ (auxiliary space)
  * Mảng `lineWords` lưu trữ tạm thời các từ trong một dòng, có kích thước tối đa là $\text{maxWidth}$ (nhỏ và không đổi).
  * Không sử dụng thêm bất cứ cấu trúc dữ liệu bổ sung nào ngoại trừ mảng kết quả `result` để lưu các chuỗi trả về.

---

## 5. Các điểm cần lưu ý khi phỏng vấn (Interview Checklist & Tips)

1. **Nhận diện dạng bài:** Đây không phải bài toán dùng cấu trúc dữ liệu phức tạp (như Tree, Graph, DP). Nó thuần túy kiểm tra khả năng code mạch lạc, tổ chức hàm hợp lý và xử lý các điều kiện biên (edge cases).
2. **Liệt kê các trường hợp đặc biệt:**
   * Dòng chỉ chứa đúng 1 từ có độ dài ngắn hơn `maxWidth`.
   * `maxWidth` đúng bằng độ dài của từ dài nhất.
   * Dòng cuối cùng của văn bản (đặc biệt quan trọng vì rất dễ quên không xử lý căn lề trái).
3. **Giải thích tư duy phân phối khoảng trắng:** Hãy trình bày rõ ràng phép chia lấy phần nguyên `/` và phép chia lấy dư `%` để chứng minh sự tối ưu trong việc chia đều khoảng trắng.
4. **Chia module rõ ràng:** Khi viết code trước mặt người phỏng vấn, hãy tách bạch logic gom nhóm và logic định dạng để code của bạn trông sạch sẽ và dễ đọc hơn.
