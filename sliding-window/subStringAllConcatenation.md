# Phân tích bài toán: Substring with Concatenation of All Words

## 1. Yêu cầu bài toán
- Cho một chuỗi `s` và một mảng các từ `words`.
- Ràng buộc quan trọng: **Tất cả các từ trong mảng `words` đều có cùng độ dài**.
- Cần tìm tất cả các vị trí bắt đầu trong `s` sao cho chuỗi con kéo dài từ vị trí đó chứa **tất cả** các từ trong `words` ghép lại (có thể theo bất kỳ thứ tự nào), mỗi từ xuất hiện đúng số lần của nó trong `words`.

## 2. Cách tiếp cận 1: Sliding Window cơ bản (Cách bạn đang dùng)
Đây là cách tiếp cận dễ hiểu, trực quan và thường là ý tưởng đầu tiên nảy ra khi giải bài toán này.

### Ý tưởng:
1. Xác định tổng chiều dài của chuỗi con cần tìm: `totalLength = wordLength * words.length`.
2. Tạo một Hash Map (`wordsMap`) để lưu tần số xuất hiện của mỗi từ trong danh sách `words`. Việc này giúp ta biết được cần tìm những từ nào và với số lượng bao nhiêu.
3. Duyệt qua từng vị trí `i` trong chuỗi `s`, với `i` chạy từ `0` đến `s.length - totalLength`. 
   - Tại mỗi vị trí `i`, ta cắt ra một chuỗi con có độ dài `totalLength`.
   - Tiếp tục chia chuỗi con này thành các phần nhỏ có kích thước `wordLength` và đưa vào một Hash Map tạm thời là `wordMap`.
   - Sau đó, ta so sánh `wordMap` và `wordsMap`. Nếu số lượng các từ hoàn toàn khớp nhau, có nghĩa là tại vị trí `i` chứa tất cả các từ trong `words` => Lưu vị trí `i` vào mảng kết quả.

### Điểm mạnh & Điểm yếu:
- **Điểm mạnh:** Dễ hiểu, cấu trúc rõ ràng và dễ cài đặt.
- **Điểm yếu:** Tại mỗi bước `i`, chúng ta lại phải cắt chuỗi và tạo mới một `wordMap` từ đầu. Độ phức tạp tính toán xấp xỉ $O((N - M \times L) \times M)$ với $N$ là chiều dài `s`, $M$ là số từ, $L$ là độ dài mỗi từ.

---

## 3. Cách tiếp cận 2: Sliding Window Tối Ưu (Advanced)
Dựa vào việc "các từ có độ dài bằng nhau", ta có thể cải tiến thuật toán trượt cửa sổ (Sliding Window) để có độ phức tạp gần như $O(N)$.

### Ý tưởng:
Thay vì dịch cửa sổ theo từng ký tự (`i++`), chúng ta nhảy theo kích thước của một từ (`i += wordLength`).
1. Vì các từ có độ dài `wordLength`, chuỗi ghép hợp lệ có thể bị lệch nhịp. Nên ta sẽ chạy vòng lặp ngoài cùng `k` từ `0` đến `wordLength - 1`.
2. Đối với mỗi nhịp `k`, ta duy trì một "cửa sổ trượt" có hai con trỏ `left` và `right`, cùng dịch chuyển với bước nhảy là `wordLength`.
3. Ta mở rộng cửa sổ bằng cách dịch `right` sang phải và lấy từ ở vị trí đó:
   - Nếu từ này **có** trong `wordsMap`, ta thêm nó vào `wordMap` (của cửa sổ hiện tại) và tăng biến đếm số từ.
   - Nếu từ này bị dư (xuất hiện **nhiều hơn** số lần cho phép trong `wordsMap`), ta sẽ dời con trỏ `left` lên để thu hẹp cửa sổ, nhả bớt các từ ở bên trái ra cho đến khi số lượng từ trở lại mức hợp lệ.
   - Nếu từ này **không có** trong `wordsMap`, ta biết chuỗi ở đoạn này không thể hợp lệ. Lúc này ta xoá sạch `wordMap`, đặt lại bộ đếm về 0, và nhảy `left` tới thẳng vị trí tiếp theo ngay sau `right`.
4. Nếu số từ hợp lệ trong cửa sổ bằng đúng `words.length`, ta thêm `left` vào mảng kết quả. Sau đó ta nhả từ ở vị trí `left` ra và nhích `left` thêm 1 từ để tìm chuỗi hợp lệ tiếp theo.

### Điểm mạnh:
- Hiệu suất tăng lên rất nhiều vì chúng ta không bao giờ kiểm tra lại một từ hai lần bên trong cửa sổ. Nếu cửa sổ dịch lên, ta chỉ thêm từ mới vào và bỏ từ cũ đi, thay vì xây dựng lại nguyên một cái `wordMap`.

## 4. Bài học rút ra
1. **Làm việc với Map trong JavaScript**: Trong JS, hai cấu trúc đối tượng (kể cả Map, Set, Array, Object) không thể dùng toán tử `===` hay hàm nội bộ như `.equals()` (vì không tồn tại) để so sánh nội dung. Chúng ta bắt buộc phải tự so sánh thông qua việc kiểm tra thuộc tính `size` và chạy vòng lặp kiểm tra từng phần tử bên trong.
2. **Khởi tạo dữ liệu**: Việc tính toán/tạo cấu trúc dữ liệu cố định (như `wordsMap`) nên được dời ra **bên ngoài vòng lặp**. Việc đặt bên trong vòng lặp vô tình ép máy tính phải cấp phát lại bộ nhớ và tính toán lại một kết quả duy nhất, gây tốn kém thời gian và làm giảm hiệu suất rất nhiều.
