# Phase 5 — Verification & Gap-Filling

## Tại sao cần Phase riêng cho verify?
Khi extract từ memory (không có sách gốc), sai số là CHẮC CHẮN có.
Phase này dùng 3 kỹ thuật để phát hiện và sửa.

---

## 5.1: Self-Check (Gemini tự kiểm tra)

```
Tôi đã extract nội dung cuốn "{{BOOK_TITLE}}" từ bạn qua nhiều prompt.
Dưới đây là BẢN TỔNG HỢP:

{{FULL_EXTRACTION_SUMMARY}}

Hãy đọc lại bản tổng hợp này và tự kiểm tra:

1. CONSISTENCY CHECK
   - Có thông tin nào MÂU THUẪN giữa các phần?
   - Cùng 1 ví dụ có bị kể khác nhau ở 2 chỗ?
   - Số liệu có khớp nhau giữa các lần nhắc?

2. HALLUCINATION SUSPECT
   - Phần nào bạn NGHI NGỜ mình có thể đã bịa?
   - Phần nào quá chi tiết so với mức bạn thật sự nhớ?
   - Chi tiết nào "nghe giống AI bịa" hơn là "sách thật viết"?

3. MISSING COVERAGE
   - Chương/phần nào bạn feel coverage mỏng nhất?
   - Có chủ đề phụ nào quan trọng mà chưa xuất hiện?

4. CONFIDENCE REVISION
   Sau khi nhìn lại toàn bộ, sửa confidence nếu cần:
   - Phần X: 🟡 → 🔴 (nay tôi nghĩ không chắc)
   - Phần Y: 🟡 → 🟢 (consistent across mentions → likely true)

Trả lời trung thực. Đây là bước quality control.
```

---

## 5.2: Web Cross-Check (Verify bằng web search)

```
Dùng web search để verify các claim sau từ cuốn "{{BOOK_TITLE}}":

{{LIST_OF_CLAIMS_TO_VERIFY}}

Với mỗi claim:
1. Search và tìm nguồn xác nhận/phủ nhận
2. Đánh giá: ✅ Confirmed | ❌ Wrong | ⚠️ Partially correct | ❓ Cannot verify
3. Nếu sai, thông tin đúng là gì?
4. Source link

Ưu tiên verify:
- Số liệu cụ thể (năm, %, con số)
- Tên người, tổ chức, sự kiện
- Claim gây ngạc nhiên hoặc controversial
- Bất kỳ phần nào đánh 🔴 confidence
```

---

## 5.3: Gap-Filling (Bổ sung lỗ hổng)

```
Dựa trên kết quả kiểm tra, các GAP sau đã được xác nhận:

{{LIST_OF_GAPS}}

Hãy thử bổ sung từng gap:

Với mỗi gap:
1. Thử nhớ lại thêm lần nữa — đôi khi bối cảnh mới kích memory
2. Nếu vẫn không nhớ, tìm trên web:
   - Book reviews chi tiết
   - Chapter summaries từ các nguồn khác
   - Academic papers citing this book
3. Ghi rõ source: [from memory] vs [from web: URL]

Mục tiêu: Đưa overall coverage lên >90%.
```

---

## Verification Checklist

Sau Phase 5, đánh giá:

| Metric | Target | Actual |
|--------|--------|--------|
| % chương covered | >95% | ? |
| % claims verified | >70% | ? |
| Hallucinations found | <10% | ? |
| Gaps remaining | <5 major | ? |
| Confidence: all 🟢 | >60% | ? |
| Confidence: any 🔴 | <10% | ? |
