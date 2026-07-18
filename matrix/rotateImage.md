# Phân tích bài toán: Rotate Image (Xoay ma trận 90 độ)

## 1. Yêu cầu bài toán
- Cho một ma trận vuông $n \times n$ đại diện cho một bức ảnh.
- Cần xoay ma trận này **90 độ theo chiều kim đồng hồ**.
- Ràng buộc cực kỳ quan trọng: **Xoay tại chỗ (in-place)**. Bạn không được phép cấp phát một ma trận phụ khác để sao chép dữ liệu, mà phải chỉnh sửa trực tiếp trên ma trận đầu vào để đạt độ phức tạp bộ nhớ phụ là $\mathcal{O}(1)$.

---

## 2. Cách tiếp cận 1: Chuyển vị & Đảo ngược (Transpose & Reverse)
Đây là cách tiếp cận phổ biến nhất, cực kỳ thông minh, dễ cài đặt và ít bị lỗi chỉ số (index). Ý tưởng này dựa trên một tính chất toán học thú vị của ma trận vuông.

### Ý tưởng cốt lõi:
Xoay một ma trận 90 độ theo chiều kim đồng hồ tương đương với việc thực hiện lần lượt hai bước sau:
1. **Chuyển vị ma trận (Transpose):** Biến hàng thành cột và cột thành hàng (phản chiếu qua đường chéo chính từ góc trên-trái xuống dưới-phải).
2. **Đảo ngược từng hàng (Reverse):** Đảo thứ tự các phần tử trên từng hàng độc lập theo chiều ngang.

### Minh họa trực quan:

Giả sử ma trận ban đầu:
```text
[
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
```

#### **Bước 1: Chuyển vị ma trận (Transpose)**
Chúng ta hoán đổi phần tử đối xứng qua đường chéo chính `matrix[i][j]` và `matrix[j][i]` (chỉ duyệt phần tam giác phía trên đường chéo `j >= i`).

- Trục chéo chính: `1, 5, 9` (giữ nguyên).
- Hoán đổi: `2 <-> 4`, `3 <-> 7`, `6 <-> 8`.

Kết quả sau khi chuyển vị:
```text
[
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9]
]
```

#### **Bước 2: Đảo ngược từng hàng (Reverse)**
Duyệt qua từng hàng và đảo ngược thứ tự các phần tử của hàng đó.
- Hàng 1: `[1, 4, 7]` -> `[7, 4, 1]`
- Hàng 2: `[2, 5, 8]` -> `[8, 5, 2]`
- Hàng 3: `[3, 6, 9]` -> `[9, 6, 3]`

Kết quả cuối cùng:
```text
[
  [7, 4, 1],
  [8, 5, 2],
  [9, 6, 3]
]
```
*(Đây chính xác là ma trận ban đầu được xoay 90 độ theo chiều kim đồng hồ)*

---

## 3. Cách tiếp cận 2: Xoay theo nhóm 4 phần tử (4-way Swapping)
Nếu bạn muốn thực hiện phép xoay chỉ trong **một vòng lặp duy nhất** mà không qua hai bước trung gian, bạn có thể dịch chuyển trực tiếp từng nhóm 4 phần tử có mối liên kết xoay vòng với nhau.

### Ý tưởng:
Xoay ma trận vuông tương tự như việc xoay các lớp vỏ đồng tâm (từ ngoài vào trong).
Với mỗi lớp vỏ, ta chia các phần tử thành các nhóm 4 vị trí sẽ thay thế cho nhau khi xoay 90 độ:
- Phía trên (Top) -> Phía phải (Right) -> Phía dưới (Bottom) -> Phía trái (Left) -> Quay lại Phía trên (Top).

```text
(top, left + i)  ----->  (top + i, right)
       ^                        |
       |                        v
(bottom - i, left) <---  (bottom, right - i)
```

### Cách cài đặt cụ thể:
Ta duy trì hai ranh giới `left` và `right` đại diện cho lớp vỏ hiện tại (ban đầu `left = 0`, `right = n - 1`).
Khi tịnh tiến vào lớp trong, ta tăng `left` và giảm `right`.

```javascript
var rotateFourWay = function(matrix) {
    let left = 0;
    let right = matrix.length - 1;

    while (left < right) {
        for (let i = 0; i < right - left; i++) {
            let top = left;
            let bottom = right;

            // 1. Lưu biến tạm thời ở vị trí top-left
            let topLeft = matrix[top][left + i];

            // 2. Di chuyển bottom-left lên top-left
            matrix[top][left + i] = matrix[bottom - i][left];

            // 3. Di chuyển bottom-right sang bottom-left
            matrix[bottom - i][left] = matrix[bottom][right - i];

            // 4. Di chuyển top-right xuống bottom-right
            matrix[bottom][right - i] = matrix[top + i][right];

            // 5. Gán giá trị lưu tạm vào vị trí top-right
            matrix[top + i][right] = topLeft;
        }
        left++;
        right--;
    }
};
```

---

## 4. So sánh hai cách tiếp cận

| Tiêu chí | Cách 1: Transpose & Reverse | Cách 2: 4-way Swapping |
| :--- | :--- | :--- |
| **Độ phức tạp Thời gian** | $\mathcal{O}(n^2)$ | $\mathcal{O}(n^2)$ |
| **Độ phức tạp Không gian** | $\mathcal{O}(1)$ | $\mathcal{O}(1)$ |
| **Độ dễ hiểu & Cài đặt** | **Rất dễ**, trực quan, tận dụng được hàm `.reverse()` có sẵn của JS. | **Khó hơn**, dễ nhầm lẫn các chỉ số biến đổi `left + i`, `right - i`. |
| **Số lần ghi bộ nhớ** | Ghi nhiều hơn (thực hiện đổi chỗ toàn bộ, rồi lại đảo ngược). | Tối ưu hơn (mỗi ô chỉ được ghi đúng 1 lần tới vị trí đích). |

> **Khuyên dùng:** Trong các buổi phỏng vấn, **Cách 1** luôn là lựa chọn an toàn hàng đầu vì code cực kỳ ngắn gọn, ít bug và thể hiện tư duy phân tích hình học tốt.
