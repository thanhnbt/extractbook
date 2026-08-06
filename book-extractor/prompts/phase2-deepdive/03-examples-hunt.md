# Phase 2.3 — Examples & Case Studies Mining

## Tại sao prompt riêng cho ví dụ?
Ví dụ/case study là phần "thịt" của sách non-fiction.
AI thường bỏ qua chúng khi tóm tắt → cần prompt chuyên biệt.

---

## Prompt
```
Cuốn "{{BOOK_TITLE}}" của {{AUTHOR}}.

Hãy liệt kê TẤT CẢ ví dụ, case study, anecdote, câu chuyện, 
và thí nghiệm được nhắc đến trong sách.

Với mỗi ví dụ:

### Format:
- Tên/Mô tả: [VD: "Thí nghiệm marshmallow của Stanford"]
- Chương: [số hoặc tên]
- Loại: [anecdote / case study / thí nghiệm / phép so sánh / metaphor / 
         ví dụ lịch sử / ví dụ đời thực]
- Tóm tắt: [3-5 câu kể lại]
- Mục đích: [minh họa cho luận điểm gì]
- Chi tiết cụ thể: [tên người, số liệu, năm, nơi chốn — nếu nhớ]
- Confidence: 🟢/🟡/🔴

### Gợi ý nhớ thêm:
Sau khi liệt kê xong, thử nghĩ lại:
1. Chương nào CHƯA có ví dụ nào? → có thể bạn quên
2. Tác giả có dùng running example (1 ví dụ xuyên suốt nhiều chương)?
3. Có ví dụ nào ở phần mở đầu hoặc kết luận sách?
4. Có ví dụ nào controversial hoặc surprising?
5. Tác giả có kể chuyện cá nhân (personal anecdote)?

Mục tiêu: Liệt kê ít nhất {{MIN_EXAMPLES}} ví dụ.
Sách non-fiction trung bình có 20-50 ví dụ. Bạn nhớ được bao nhiêu?
```
