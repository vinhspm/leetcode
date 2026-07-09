# Hướng dẫn giải bài toán 3Sum

## 1. Phân tích bài toán
Bài toán yêu cầu tìm tất cả các bộ 3 số `[nums[i], nums[j], nums[k]]` sao cho:
- `i != j`, `i != k`, và `j != k` (3 vị trí khác nhau).
- `nums[i] + nums[j] + nums[k] == 0`.
- **Quan trọng:** Không được chứa các bộ 3 trùng lặp. (Ví dụ: `[-1, 0, 1]` và `[0, 1, -1]` được coi là giống nhau).

## 2. Vấn đề trong code hiện tại của bạn
Trong file `3Sum.js`, code của bạn đang gặp phải 2 vấn đề lớn:
1. **Lặp vô hạn (Infinite Loop):** Khi tìm thấy một bộ ba thỏa mãn (`nums[left] + nums[right] === -nums[i]`), bạn thêm nó vào mảng `result` nhưng lại **không di chuyển** con trỏ `left` hoặc `right`. Do đó, vòng lặp `while (left < right)` sẽ chạy mãi mãi với cùng một cặp `left` và `right` đó. Đây là lý do khi chạy code bạn không thấy script dừng lại.
2. **Chưa xử lý trùng lặp (Duplicate logic):** Khi mảng có các phần tử giống nhau đứng cạnh nhau (ví dụ: `[-1, -1, 0, 1, 2]`), bạn có thể sẽ lấy trùng các bộ ba. Bài toán yêu cầu kết quả không chứa các bộ ba trùng nhau.

## 3. Thuật toán tối ưu: Sắp xếp (Sorting) + Hai con trỏ (Two Pointers)
Đây là cách tiếp cận phổ biến và tối ưu nhất cho bài 3Sum:

**Bước 1: Sắp xếp mảng**
Đầu tiên, sắp xếp mảng tăng dần. Việc này giúp chúng ta:
- Dễ dàng sử dụng kỹ thuật hai con trỏ.
- Dễ dàng loại bỏ các phần tử trùng lặp bằng cách kiểm tra các phần tử liền kề.

**Bước 2: Duyệt qua mảng (cố định số thứ nhất)**
Dùng vòng lặp `for` với biến `i` chạy từ đầu đến cuối mảng (đến `nums.length - 2` vì cần chừa lại 2 vị trí cho số thứ 2 và thứ 3).
- Số thứ nhất là `nums[i]`.
- Bài toán trở thành tìm 2 số còn lại (trong khoảng từ `i + 1` đến cuối mảng) sao cho tổng của chúng bằng `-nums[i]`.

**Bước 3: Dùng hai con trỏ tìm 2 số còn lại**
Khởi tạo:
- `left = i + 1`
- `right = nums.length - 1`

Trong khi `left < right`:
- Tính `sum = nums[i] + nums[left] + nums[right]`.
- Nếu `sum === 0`: Ta tìm thấy một bộ ba thỏa mãn. Lưu vào mảng kết quả. **(Sau đó phải di chuyển cả `left` và `right` và bỏ qua các phần tử trùng lặp để tránh lấy lại kết quả cũ)**.
- Nếu `sum < 0`: Tổng quá nhỏ, cần tăng tổng bằng cách di chuyển `left` sang phải (`left++`).
- Nếu `sum > 0`: Tổng quá lớn, cần giảm tổng bằng cách di chuyển `right` sang trái (`right--`).

**Bước 4: Bỏ qua các phần tử trùng lặp**
Để không bị trùng bộ 3:
- Khi vòng `for` chạy biến `i`, nếu `nums[i] === nums[i - 1]` thì ta bỏ qua (`continue`) vì số này đã được xét rồi.
- Khi tìm thấy `sum === 0`, ta cần tiến `left` và lùi `right` cho đến khi gặp số khác biệt thì mới dừng lại để tránh lấy trùng cặp.

## 4. Code hoàn chỉnh (JavaScript)

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    var result = [];
    
    // 1. Sắp xếp mảng tăng dần
    nums = nums.sort((a, b) => a - b);
    
    // 2. Duyệt qua từng phần tử làm mốc
    for (var i = 0; i < nums.length - 2; i++) {
        // Bỏ qua nếu phần tử hiện tại giống phần tử trước đó để tránh trùng lặp kết quả
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        
        var left = i + 1;
        var right = nums.length - 1;
        
        // 3. Dùng 2 con trỏ tìm các cặp có tổng bằng -nums[i]
        while (left < right) {
            var sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                // Thêm vào kết quả
                result.push([nums[i], nums[left], nums[right]]);
                
                // Di chuyển con trỏ và bỏ qua các phần tử trùng lặp
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < 0) {
                left++; // Cần tăng tổng
            } else {
                right--; // Cần giảm tổng
            }
        }
    }
    
    return result;
};

// Test cases
console.log(threeSum([-1, 0, 1, 2, -1, -4])); // Output: [[-1, -1, 2], [-1, 0, 1]]
console.log(threeSum([0, 1, 1]));             // Output: []
console.log(threeSum([0, 0, 0]));             // Output: [[0, 0, 0]]
```

## 5. Phân tích độ phức tạp
- **Độ phức tạp thời gian (Time Complexity):** `O(N^2)`.
  - Sắp xếp mảng mất `O(N log N)`.
  - Vòng lặp `for` chạy `N` lần, bên trong vòng lặp `while` chạy nhiều nhất `N` lần. Do đó phần này mất `O(N^2)`.
  - Tổng thời gian là `O(N log N + N^2) = O(N^2)`.
- **Độ phức tạp không gian (Space Complexity):** `O(1)` hoặc `O(N)` phụ thuộc vào thuật toán sắp xếp nội bộ của trình duyệt/Node.js (thường là tốn bộ nhớ `O(N)` cho việc sắp xếp). Mảng `result` trả về không tính vào space complexity của thuật toán.
