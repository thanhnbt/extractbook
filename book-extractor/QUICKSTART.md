# 🚀 Quick Start Guide — Cách dùng

## Bước 0: Chuẩn bị
1. Mở Gemini (gemini.google.com hoặc AI Studio)
2. Chọn model: Gemini 2.5 Pro (context window lớn nhất)
3. Settings: Temperature = 0.2 (cho extraction)

## Bước 1: Chạy Phase 0 — Recon
Mở file: `prompts/phase0-recon/01-book-probe.md`
- Copy prompt, thay {{BOOK_TITLE}} và {{AUTHOR}}
- Paste vào Gemini
- Đọc kết quả → quyết định có tiếp hay không

**Decision point:**
- Familiarity a/b → Tiến hành full pipeline ✅
- Familiarity c → Pipeline rút gọn + web verify nhiều
- Familiarity d/e → Dừng, cần nguồn khác (upload sách, summary sites)

## Bước 2: Chạy Phase 1 — Skeleton  
Mở: `prompts/phase1-skeleton/01-toc-recall.md`
- Chạy 3 lượt prompt (broad → gap fill → depth probe)
- Lưu output → `output/raw/phase1_toc.md`

Mở: `prompts/phase1-skeleton/02-thesis.md`
- Chạy prompt
- Lưu output → `output/raw/phase1_thesis.md`

**Sau Phase 1 bạn có:** TOC + thesis + concept map

## Bước 3: Chạy Phase 2 — Deep Dive
Mở: `prompts/phase2-deepdive/01-chapter-full.md`
- Thay {{variables}} bằng thông tin từ Phase 1
- Chạy cho TỪNG chương (3 lượt mỗi chương nếu 🟢)
- Lưu: `output/raw/phase2_ch01.md`, `phase2_ch02.md`, ...

Sau đó chạy thêm:
- `02-quotes-hunt.md` → thu thập quotes
- `03-examples-hunt.md` → thu thập ví dụ

**Sau Phase 2 bạn có:** Chi tiết từng chương

## Bước 4: Chạy Phase 3 — Cross-reference
Mở: `prompts/phase3-crossref/01-themes.md`
- Inject context từ Phase 1-2 (paste summary ngắn)
- Chạy prompt

**Sau Phase 3 bạn có:** Patterns xuyên suốt

## Bước 5: Chạy Phase 4 — Synthesis
Mở: `prompts/phase4-synthesis/01-all-deliverables.md`
- Chạy từng section (executive summary, cheat sheet, flashcards)
- Lưu deliverables

## Bước 6: Chạy Phase 5 — Verify
Mở: `prompts/phase5-verify/01-verify-all.md`
- Paste full extraction vào Gemini
- Chạy self-check
- Web verify các claim 🔴
- Gap-fill nếu cần → quay lại Phase 2

## Output cuối cùng
Copy các output đã verify vào `docs/wiki/`:
- `00-overview.md` — Executive summary
- `01-chapter01.md` ... `XX-chapterXX.md` — Từng chương
- `glossary.md` — Bảng thuật ngữ
- `quotes.md` — Trích dẫn
- `themes.md` — Chủ đề xuyên suốt
- `cheatsheet.md` — Cheat sheet 1 trang
- `flashcards.md` — Bộ flashcard

---

## Tips khi chạy

### 💡 Giữ conversation context
- Chạy Phase 0→1→2 TRONG CÙNG 1 CONVERSATION trên Gemini
- Context trước giúp Gemini nhớ tốt hơn ở prompt sau
- Nếu conversation quá dài, start new nhưng paste summary Phase trước

### 💡 Đừng rush
- Đọc output mỗi phase trước khi qua phase tiếp
- Nếu Phase 1 thiếu → Phase 2 sẽ thiếu theo
- Quality of Phase 1 quyết định quality toàn bộ

### 💡 Đổi cách hỏi khi bí
- "Trong chương về X, có ví dụ nào KHÔNG?" (negative probe)
- "Tôi nhớ sách có nhắc đến Y, đúng không?" (confirmation probe)
- "Chương nào nói về Z?" (reverse lookup)

### 💡 Fiction vs Non-fiction
- Fiction: thay "thesis/arguments" bằng "plot/character arc"
- Fiction: quotes quan trọng hơn (dialogue, descriptions)
- Fiction: examples → scenes, events, turning points
