# Phase 0.1 — Book Probe (Trinh sát)

## Mục đích
Trước khi đào, cần biết Gemini nhớ cuốn sách này ở mức nào.
Sách bestseller → nhớ rất sâu. Sách niche → có thể chỉ nhớ overview.
Kết quả Phase 0 quyết định chiến lược đào ở Phase 2.

---

## Prompt 1: Initial Probe (Dò đầu tiên)
```
Tôi muốn tìm hiểu chi tiết về cuốn sách "{{BOOK_TITLE}}" 
của tác giả {{AUTHOR}}.

Trước khi bắt đầu, hãy tự đánh giá trung thực:

1. Bạn có biết cuốn sách này không? (yes/no)
2. Mức độ quen thuộc: (chọn 1)
   a) Đã được train trên toàn bộ nội dung sách
   b) Biết khá chi tiết (tóm tắt + nhiều chi tiết cụ thể)
   c) Biết ở mức tổng quan (nội dung chính, thesis)
   d) Chỉ biết tên + vài thông tin cơ bản
   e) Không biết hoặc không chắc

3. Nếu biết, liệt kê:
   - Năm xuất bản
   - Số chương (ước lượng)
   - 3 chương đầu tiên (tên chính xác nếu nhớ)
   - Thesis chính
   - 1 chi tiết rất cụ thể (ví dụ, số liệu, tên nhân vật phụ)

4. Có gì bạn KHÔNG NHỚ rõ về cuốn sách?

Hãy trả lời TRUNG THỰC. Nếu không chắc, nói "không chắc".
Đừng bịa. Tôi thà biết bạn không nhớ còn hơn nhận thông tin sai.
```

## Prompt 2: Depth Assessment (Đánh giá độ sâu)
```
Tiếp tục về "{{BOOK_TITLE}}". 

Hãy thử nhớ lại MỤC LỤC CHÍNH XÁC nhất có thể.
Với mỗi chương/phần, đánh giá mức nhớ:

Format:
Chương X: "[Tên chương]"
- Confidence tên chương: 🟢/🟡/🔴
- Confidence nội dung: 🟢/🟡/🔴
- Có nhớ ví dụ/data cụ thể trong chương? yes/no
- Có nhớ quotes gốc? yes/no

Sau đó tổng kết:
- Tổng số chương bạn nhớ: X/Y
- Chương nhớ rõ nhất: [...]
- Chương mờ nhất: [...]
- Ước lượng % nội dung bạn có thể reconstruct: X%
```

---

## Cách đọc kết quả

| Kết quả | Chiến lược Phase 2 |
|---------|-------------------|
| Familiarity = a/b, >70% chương 🟢 | Full deep dive, ép chi tiết tối đa |
| Familiarity = b/c, mix 🟢🟡 | Deep dive + web verify cho phần 🟡 |
| Familiarity = c/d, nhiều 🔴 | Overview only + bổ sung bằng web search |
| Familiarity = e | Dừng lại, đổi sang approach khác (nạp sách) |

## Notes
- Kết quả probe cũng có thể bị hallucinate
  → Cross-check vài fact cụ thể bằng web search
- Sách tiếng Anh thường được nhớ tốt hơn sách tiếng Việt
- Sách sau 2023 có thể nằm ngoài training data
