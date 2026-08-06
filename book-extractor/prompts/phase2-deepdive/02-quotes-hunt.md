# Phase 2.2 — Quote Hunting

## Mục đích
Trích dẫn gốc là thứ khó nhớ nhất nhưng giá trị nhất.
Prompt này dùng nhiều kỹ thuật để kích memory cho quotes.

---

## Prompt
```
Cuốn "{{BOOK_TITLE}}" của {{AUTHOR}}.

Tôi cần bạn cố gắng nhớ lại các CÂU TRÍCH DẪN NGUYÊN VĂN 
(hoặc gần nguyên văn) trong cuốn sách.

### Cách 1: Câu mở đầu sách
- Sách mở đầu bằng câu gì? (first line)
- Câu mở đầu có memorable không?

### Cách 2: Câu nổi tiếng nhất
- Câu/đoạn nào từ cuốn sách được trích dẫn nhiều nhất?
- Câu nào thường xuất hiện trong reviews/summary?

### Cách 3: Các định nghĩa
- Tác giả có định nghĩa khái niệm key bằng câu cụ thể nào?
  VD: "X is defined as..."

### Cách 4: Câu kết chương/sách
- Mỗi chương kết thúc bằng insight gì?
- Câu cuối cùng của sách là gì?

### Cách 5: Quotes từ người khác
- Tác giả trích dẫn ai khác trong sách?
- Epigraph đầu chương (nếu có)

Format mỗi quote:
- Nội dung: "[...]"
- Vị trí: Chương X / Mở đầu / Kết luận
- Confidence nguyên văn: 🟢 chính xác | 🟡 gần đúng | 🔴 paraphrase
- Tại sao important: [...]

QUAN TRỌNG: 
- Nếu nhớ ý nhưng không nhớ nguyên văn → đánh 🔴 và ghi rõ 
  "đây là paraphrase, không phải nguyên văn"
- KHÔNG bịa quote rồi nói là nguyên văn
```
