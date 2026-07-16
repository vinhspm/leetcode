# Phân tích bài toán: Minimum Window Substring

## 1. Yêu cầu bài toán
- Cho hai chuỗi `s` và `t` có độ dài lần lượt là $m$ và $n$.
- Cần tìm **chuỗi con ngắn nhất** của `s` sao cho nó chứa **tất cả các ký tự** trong `t` (kể cả các ký tự trùng lặp).
- Nếu không tồn tại chuỗi con như vậy, trả về chuỗi rỗng `""`.
- Bài toán đảm bảo kết quả (nếu có) là duy nhất.

**Ví dụ:**
- `s = "ADOBECODEBANC"`, `t = "ABC"`
- Kết quả: `"BANC"` (vì `"BANC"` chứa đủ `'A'`, `'B'`, `'C'` và có độ dài nhỏ nhất là 4).

---

## 2. Phân tích & Hướng tiếp cận từng bước

Bài toán yêu cầu tìm một "cửa sổ" liên tục trong `s`. Đây là dấu hiệu kinh điển để áp dụng kỹ thuật **Cửa sổ trượt (Sliding Window)** với hai con trỏ `left` và `right`.

### Bước 1: Thống kê tần suất các ký tự cần tìm trong `t`
Vì `t` có thể chứa các ký tự trùng lặp (ví dụ: `t = "AAB"` cần 2 chữ `'A'`), chúng ta cần một cấu trúc dữ liệu để đếm số lượng ký tự cần thiết.
- Sử dụng một Map đặt tên là `tFreq` để lưu trữ tần suất xuất hiện của mỗi ký tự trong `t`.
- Xác định số lượng ký tự **duy nhất** cần thỏa mãn: `required = tFreq.size`.

### Bước 2: Thiết lập Cửa sổ trượt
Chúng ta sẽ sử dụng hai con trỏ `left` và `right` đều bắt đầu từ vị trí `0`, đại diện cho hai biên của cửa sổ hiện tại trong `s`.
- Sử dụng thêm một Map là `windowFreq` để theo dõi tần suất các ký tự nằm trong cửa sổ hiện tại.
- Sử dụng biến `formed` để đếm xem có bao nhiêu ký tự duy nhất trong cửa sổ hiện tại đã đạt đủ số lượng yêu cầu so với `t`.
- Khởi tạo các biến lưu trữ kết quả tối ưu nhất tìm được: `minLen = Infinity` và `start = 0`.

### Bước 3: Mở rộng cửa sổ (Dịch chuyển con trỏ `right`)
Chúng ta duyệt con trỏ `right` từ `0` đến hết chuỗi `s`:
1. Lấy ký tự tại biên phải `char = s[right]`.
2. Cập nhật tần suất của `char` vào `windowFreq`.
3. Kiểm tra xem ký tự này có nằm trong `t` không:
   - Nếu có (`tFreq.has(char)`) và số lượng trong cửa sổ hiện tại bằng đúng số lượng yêu cầu trong `t` (`windowFreq.get(char) === tFreq.get(char)`), ta tăng biến `formed` lên 1.

### Bước 4: Thu hẹp cửa sổ (Dịch chuyển con trỏ `left`)
Khi `formed === required` (tức là cửa sổ hiện tại đã chứa đầy đủ và thừa thãi các ký tự của `t`):
1. **Cập nhật kết quả tối ưu**: Nếu độ dài cửa sổ hiện tại (`right - left + 1`) nhỏ hơn `minLen`, ta cập nhật lại `minLen` và lưu vị trí bắt đầu `start = left`.
2. **Thu nhỏ cửa sổ**: Chúng ta cố gắng loại bỏ các ký tự không cần thiết hoặc dư thừa ở phía bên trái bằng cách dịch `left` sang phải:
   - Lấy ký tự tại biên trái `leftChar = s[left]`.
   - Giảm tần suất của `leftChar` trong `windowFreq`.
   - Nếu `leftChar` là một ký tự bắt buộc của `t` và số lượng của nó trong cửa sổ hiện tại rơi xuống thấp hơn số lượng yêu cầu (`windowFreq.get(leftChar) < tFreq.get(leftChar)`), thì cửa sổ này không còn hợp lệ nữa. Lúc này ta giảm biến `formed` đi 1.
   - Tăng `left` lên 1 để thực sự thu hẹp cửa sổ.

Quá trình thu hẹp này lặp lại liên tục (dùng vòng lặp `while`) cho đến khi cửa sổ không còn hợp lệ nữa (khi `formed < required`), sau đó ta lại quay lại **Bước 3** để dịch `right` sang phải tiếp.

---

## 3. Minh họa trực quan thuật toán trượt cửa sổ
Giả sử `s = "ADOBECODEBANC"`, `t = "ABC"` (Cần tìm `A:1`, `B:1`, `C:1` -> `required = 3`)

```text
Chỉ số (Index): 0  1  2  3  4  5  6  7  8  9  10 11 12
Chuỗi s:        A  D  O  B  E  C  O  D  E  B  A  N  C

1. right dịch từ 0 -> 5: Cửa sổ là "ADOBEC" (độ dài 6)
   - Đã chứa đủ 'A', 'B', 'C' (formed = 3).
   - Cập nhật minLen = 6, start = 0 ("ADOBEC").
   - Dịch left sang phải để thu hẹp:
     - Bỏ 'A' (chỉ số 0) -> Cửa sổ còn "DOBEC". Không còn đủ 'A' (formed giảm còn 2). Vòng lặp thu hẹp dừng.

2. right dịch tiếp đến 10: Cửa sổ là "DOBECODEBA"
   - Gặp lại 'A' ở vị trí 10 -> Cửa sổ hợp lệ trở lại (formed = 3).
   - Dịch left sang phải để thu hẹp:
     - Bỏ 'D' (1) -> "OBECODEBA" (hợp lệ)
     - Bỏ 'O' (2) -> "BECODEBA" (hợp lệ)
     - Bỏ 'B' (3) -> "ECODEBA". Mất 'B' nên formed giảm còn 2. Dừng thu hẹp.
     - (Lúc này cửa sổ hợp lệ ngắn nhất vẫn là "ADOBEC" độ dài 6).

3. right dịch tiếp đến 12: Cửa sổ là "ECODEBANC" (formed = 3)
   - Dịch left sang phải để thu hẹp:
     - Bỏ 'E' (4) -> "CODEBANC" (hợp lệ)
     - Bỏ 'C' (5) -> "ODEBANC". Mất 'C' nên formed giảm còn 2. Dừng thu hẹp.

4. Cứ như thế, cho đến khi thu hẹp tối đa cửa sổ cuối cùng đạt: "BANC" (chỉ số 9 -> 12, độ dài 4)
   - Chứa đủ 'B', 'A', 'N', 'C' (formed = 3).
   - Cập nhật minLen = 4, start = 9.

Kết quả cuối cùng là "BANC".
```

---

## 4. Mã nguồn JavaScript hoàn chỉnh

Dưới đây là mã nguồn tối ưu được triển khai đầy đủ dựa trên bộ khung có sẵn của [minimumWindowSubstring.js](file:///d:/Dev/test%20projects/testnodejs/sliding-window/minimumWindowSubstring.js):

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    if (!s || !t || s.length < t.length) return "";

    var tFreq = new Map();
    var windowFreq = new Map();

    // Bước 1: Điền tần suất ký tự của chuỗi t
    for (let char of t) {
        tFreq.set(char, (tFreq.get(char) || 0) + 1);
    }

    var left = 0;
    var right = 0;
    var required = tFreq.size; // Số ký tự duy nhất cần đáp ứng
    var formed = 0;            // Số ký tự duy nhất đã đáp ứng đủ tần suất
    
    // minLen lưu độ dài nhỏ nhất tìm được, start lưu chỉ số bắt đầu của chuỗi đó
    var minLen = Infinity;
    var start = 0;

    // Bước 2: Duyệt con trỏ right qua chuỗi s
    while (right < s.length) {
        let char = s[right];
        windowFreq.set(char, (windowFreq.get(char) || 0) + 1);

        // Nếu ký tự này thuộc t và đã tích lũy đủ số lượng cần thiết
        if (tFreq.has(char) && windowFreq.get(char) === tFreq.get(char)) {
            formed++;
        }

        // Bước 3: Khi cửa sổ hiện tại đã hợp lệ, cố gắng thu hẹp từ phía bên trái
        while (left <= right && formed === required) {
            let currentLen = right - left + 1;
            
            // Cập nhật kết quả tốt nhất
            if (currentLen < minLen) {
                minLen = currentLen;
                start = left;
            }

            let leftChar = s[left];
            // Giảm tần suất của ký tự góc trái khi đẩy left sang phải
            windowFreq.set(leftChar, windowFreq.get(leftChar) - 1);

            // Nếu ký tự bị loại bỏ làm cho cửa sổ thiếu hụt ký tự của t
            if (tFreq.has(leftChar) && windowFreq.get(leftChar) < tFreq.get(leftChar)) {
                formed--;
            }

            left++; // Thu hẹp cửa sổ
        }

        right++; // Mở rộng cửa sổ sang phải
    }

    return minLen === Infinity ? "" : s.substring(start, start + minLen);
};
```

---

## 5. Đánh giá độ phức tạp thuật toán
- **Độ phức tạp thời gian (Time Complexity)**: $\mathcal{O}(|s| + |t|)$
  - Mỗi ký tự trong chuỗi $s$ chỉ được con trỏ `right` duyệt qua đúng 1 lần và con trỏ `left` duyệt qua tối đa 1 lần.
  - Vòng lặp khởi tạo tần suất cho chuỗi $t$ mất thời gian $\mathcal{O}(|t|)$.
  - Do đó, tổng thời gian xử lý là tuyến tính tỉ lệ thuận với độ dài hai chuỗi.
- **Độ phức tạp không gian (Space Complexity)**: $\mathcal{O}(|s| + |t|)$
  - Trong trường hợp xấu nhất, Map `windowFreq` và `tFreq` chứa toàn bộ các ký tự duy nhất của chuỗi $s$ và $t$. Số lượng ký tự trong bảng chữ cái thông thường là cố định (hầu hết tối đa 52 ký tự cho chữ cái thường/hoa, hoặc 256 ký tự ASCII), nên bộ nhớ bổ sung thực chất có thể coi là hằng số $\mathcal{O}(1)$.
