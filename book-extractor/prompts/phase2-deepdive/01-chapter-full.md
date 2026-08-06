# Phase 2.1 — Chapter Deep Dive (Memory Mining)

## Kỹ thuật cốt lõi: ANCHOR-BASED RECALL
Thay vì hỏi "kể về chương X" (quá mở → AI tóm tắt sơ sài),
dùng thông tin đã biết từ Phase 1 làm "mỏ neo" để kích memory sâu hơn.

---

## Template chương (chạy lặp cho từng chương)

### Lượt 1: Broad Recall
```
Cuốn "{{BOOK_TITLE}}" của {{AUTHOR}}.
Chương {{CHAPTER_NUMBER}}: "{{CHAPTER_TITLE}}"

Đây là chương nằm sau "{{PREV_CHAPTER}}" và trước "{{NEXT_CHAPTER}}".
Nó thuộc phần lớn: {{PART_NAME}}.

Hãy nhớ lại MỌI THỨ bạn biết về chương này. Viết CHI TIẾT nhất có thể,
như thể bạn đang kể lại cho ai chưa đọc cuốn sách.

Cấu trúc:

1. TỔNG QUAN CHƯƠNG (5-10 câu)
   - Chương mở đầu bằng gì?
   - Điểm chính xuyên suốt chương?
   - Chương kết thúc / chuyển tiếp sang chương sau thế nào?

2. CÁC Ý CHÍNH (liệt kê hết, mỗi ý 2-3 câu giải thích)
   Với mỗi ý: 
   - Nội dung: [...]
   - Confidence: 🟢/🟡/🔴

3. VÍ DỤ & CÂU CHUYỆN
   Liệt kê MỌI ví dụ, case study, anecdote trong chương:
   - Ví dụ: [mô tả]
   - Mục đích ví dụ: [minh họa cho ý gì]
   - Chi tiết cụ thể nhớ được: [...]
   - Confidence: 🟢/🟡/🔴

4. SỐ LIỆU & DATA
   Bất kỳ con số, thống kê, kết quả nghiên cứu nào:
   - Data: [...]
   - Nguồn (nếu nhớ): [...]
   - Confidence: 🟢/🟡/🔴

5. TRÍCH DẪN GỐC (nếu nhớ nguyên văn)
   - Quote: "[...]"
   - Ai nói / viết: [...]
   - Confidence nguyên văn đúng: 🟢/🟡/🔴

6. THUẬT NGỮ
   Khái niệm mới được giới thiệu hoặc định nghĩa trong chương:
   - Thuật ngữ: [...]
   - Định nghĩa: [...]

QUAN TRỌNG:
- Viết DÀI. Tôi muốn bạn vét hết memory, không tóm tắt.
- Nếu chương dài, viết 2000+ từ cũng được.
- Nếu không nhớ, nói thẳng "không nhớ phần này".
- KHÔNG BỊA. Thà thiếu 50% nhưng đúng hơn có 100% mà 30% sai.
```

### Lượt 2: Anchor Drill (Đào sâu bằng mỏ neo)
Chạy SAU lượt 1, dùng output lượt 1 để đào tiếp.
```
Tiếp tục về Chương {{CHAPTER_NUMBER}}: "{{CHAPTER_TITLE}}".

Bạn đã nhắc đến {{EXAMPLE_FROM_ROUND1}}. Hãy đào sâu hơn:

1. Trước ví dụ đó, tác giả dẫn dắt vào bằng cách nào?
2. Sau ví dụ đó, tác giả rút ra kết luận gì?
3. Có ví dụ/câu chuyện nào NGAY SAU đó mà bạn chưa nhắc?
4. Phần này liên kết đến chương khác thế nào?

Ngoài ra, có gì bạn chợt NHỚ THÊM mà lượt trước quên?
Đôi khi việc nói về 1 phần sẽ kích nhớ phần khác.
```

### Lượt 3: Exhaustion Check (Kiểm tra đã vét hết chưa)
```
Chương {{CHAPTER_NUMBER}}: "{{CHAPTER_TITLE}}".

Tôi đã ghi nhận các ý sau từ bạn:
{{LIST_OF_ALL_POINTS_SO_FAR}}

Kiểm tra cuối cùng:
1. Có ý nào trong chương mà CHƯA CÓ trong danh sách trên?
2. Có transition/connection nào giữa các ý mà tôi chưa capture?
3. Phần đầu chương (opening) và cuối chương (closing) đã đầy đủ chưa?
4. Chương có summary/takeaway cuối không?

Nếu tất cả đã đủ, nói "Đã vét hết memory cho chương này."
Nếu nhớ thêm, bổ sung.
```

---

## Khi nào dùng nhiều lượt vs ít lượt?

| Confidence từ Phase 0 | Số lượt cho chương |
|----------------------|-------------------|
| 🟢 Nhớ rõ          | 3 lượt (broad → anchor → exhaustion) |
| 🟡 Nhớ trung bình   | 2 lượt (broad → exhaustion) |
| 🔴 Nhớ mờ          | 1 lượt (broad only, đánh dấu cần web verify) |
