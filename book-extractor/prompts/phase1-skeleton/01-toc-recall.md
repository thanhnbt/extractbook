# Phase 1.1 — TOC Recall (Nhớ lại mục lục)

## Kỹ thuật chính: Progressive Recall
Không hỏi "kể hết TOC" 1 lần → AI sẽ tóm tắt quá mức.
Thay vào đó, dùng 3 lượt đào dần sâu:

---

## Lượt 1: Recall sơ bộ
```
Cuốn "{{BOOK_TITLE}}" của {{AUTHOR}}.

Hãy nhớ lại cấu trúc cuốn sách này chi tiết nhất có thể.

Với mỗi chương/phần, cung cấp:
- Tên chương (nguyên bản nếu nhớ, dịch nếu sách tiếng nước ngoài)
- 2-3 câu mô tả nội dung chương
- Confidence: 🟢 chắc chắn | 🟡 khá chắc | 🔴 không chắc

Lưu ý quan trọng:
- Nếu không nhớ tên chương chính xác, ghi "~[tên ước lượng]" 
- Nếu không nhớ có chương đó hay không, ghi "[?]"
- TUYỆT ĐỐI KHÔNG bịa tên chương. Thà thiếu còn hơn sai.
```

## Lượt 2: Gap fill (Điền khoảng trống)
```
Dựa trên TOC bạn vừa nhớ lại, tôi thấy có {{N}} chương/phần.

Hãy kiểm tra lại:
1. Có chương/phần nào bạn QUÊN chưa liệt kê không?
   Thử nghĩ lại — có phần giới thiệu, kết luận, phụ lục?
   
2. Giữa chương {{X}} và chương {{Y}}, có thiếu gì không?
   (Đôi khi nhớ chương 1,2,3 rồi nhảy sang 7,8 mà không biết)

3. Thứ tự các chương đã đúng chưa?

Bổ sung và sửa nếu cần.
```

## Lượt 3: Depth probe (Đào thêm cho chương mờ)
```
Trong các chương bạn đánh 🟡 và 🔴, hãy thử nhớ thêm bằng cách:

Với mỗi chương mờ:
- Có từ khóa/concept nào bạn liên tưởng đến chương này?
- Nó đứng giữa chương nào → nội dung có khả năng về gì?
- Có ví dụ/câu chuyện nào bạn nhớ mang máng thuộc chương này?

Mục tiêu: nâng 🟡 lên 🟢, và xác nhận 🔴 là thật sự không nhớ
(để tôi biết phần nào cần verify bằng nguồn khác).
```
