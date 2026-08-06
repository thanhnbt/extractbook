# Construction Decisions — Memory Mining Approach

## Tại sao approach này?

### D1: Memory Mining vs File Upload
**Bối cảnh:** Có 2 cách extract sách bằng LLM:
- Upload file sách → extract (ground truth có sẵn)
- Hỏi LLM nhớ lại → reconstruct (no ground truth)

**Chọn:** Memory Mining vì:
- Không cần file sách (có thể không có bản digital)
- Gemini đã "đọc" nhiều sách nổi tiếng rất kỹ
- Nhanh hơn (không tốn token upload)
- Có thể dùng cho sách đã ngừng bán

**Rủi ro:** Hallucination, incomplete recall → cần Phase 5 verify.

### D2: Tại sao Confidence Tagging?
**Vấn đề:** LLM không biết mình không biết. Nó sẽ bịa thay vì nói "không nhớ".
**Giải pháp:** Ép LLM tự đánh giá confidence (🟢🟡🔴) trên MỌI output.
**Tại sao hiệu quả:**
- LLM được train để calibrate uncertainty ở 1 mức nào đó
- Khi ép tag 🔴, nó "cho phép" mình thú nhận không biết
- Không hoàn hảo nhưng tốt hơn nhiều so với không tag

### D3: Progressive Recall (Đào nhiều lượt)
**Insight:** Hỏi 1 câu "kể hết" → AI tóm tắt 20% rồi dừng.
Nhưng hỏi 3 lượt → mỗi lượt kích thêm memory.
**Tương tự:** Giống cách con người nhớ lại — "à, nói đến cái đó thì tôi nhớ thêm..."

Lượt 1: Broad recall (bắt cái rõ nhất)
Lượt 2: Anchor drill (dùng L1 làm gợi ý)
Lượt 3: Exhaustion check (xác nhận đã hết)

### D4: Tách prompt theo dimension
**Vấn đề:** 1 prompt "kể hết" → AI ưu tiên summary, bỏ qua ví dụ/quote.
**Giải pháp:** Prompt riêng cho:
- Summary (Phase 2.1)
- Quotes (Phase 2.2)
- Examples & case studies (Phase 2.3)
- Terminology (Phase 2.4)

Mỗi prompt chuyên biệt → coverage tốt hơn trên dimension đó.

### D5: Web Verify cho 🔴 claims
**Chiến lược verify 3 tầng:**
1. Self-check (Gemini nhìn lại output mình → phát hiện inconsistency)
2. Cross-prompt (hỏi cùng fact 2 cách → so sánh)
3. Web search (verify fact cụ thể)

**Chỉ web verify cho:**
- Mọi claim 🔴
- Sample 30% claim 🟡
- Số liệu cụ thể (năm, %, tên)

---

## Prompt Engineering Notes

### Tip 1: "KHÔNG BỊA" < "ĐÁNH 🔴"
Nói "đừng bịa" không hiệu quả lắm (AI vẫn bịa).
Nhưng cho nó cách EXIT gracefully ("đánh 🔴") thì nó dùng.
→ Luôn cung cấp escape hatch thay vì chỉ cấm.

### Tip 2: Context stacking
Phase sau nên nhận output Phase trước làm context.
VD: Phase 2 nhận TOC từ Phase 1 → biết chương nào cần đào.
VD: Phase 3 nhận chapter summaries → tìm cross-reference.

### Tip 3: "Viết DÀI" > "Viết chi tiết"
"Viết chi tiết" → AI viết 500 từ rồi feel "đã chi tiết rồi".
"Viết 2000 từ trở lên" → ép nó mở rộng hơn.
Cụ thể số từ hiệu quả hơn yêu cầu chung.

### Tip 4: Sau khi liệt kê → hỏi "còn gì nữa?"
AI thường dừng ở 5-7 items dù nhớ nhiều hơn.
Hỏi tiếp "còn gì nữa?" kích thêm 3-5 items.
Đây là bản chất của Progressive Recall.

### Tip 5: Sách tiếng Anh nổi tiếng = best case
Memory depth phụ thuộc:
- Ngôn ngữ (EN >> VN > ZH > ...)
- Popularity (bestseller >> niche)
- Recency (2020-2023 >> 1990s)
- Type (non-fiction thường nhớ structure tốt hơn fiction)
