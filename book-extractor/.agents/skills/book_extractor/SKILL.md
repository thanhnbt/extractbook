---
name: book_extractor
description: Kỹ năng siêu phân rã sách. Sử dụng 40 Micro-Agents để phân tích sâu sắc các chương sách thành định dạng Song ngữ (Bilingual), cấm bịa đặt (Zero Hallucination), lập kế hoạch 30s và tự động Build ra giao diện Web (HTML/CSS).
---

# Hướng dẫn Kỹ năng: Book Extractor

Kỹ năng này định nghĩa một quy trình đồ sộ (Massive Pipeline) để phân tích, mở rộng và dịch thuật một cuốn sách thành một trang Web Bách khoa toàn thư Song ngữ.

## 1. Kiến trúc Siêu phân rã (Hyper-Fragmentation)
Khi người dùng kích hoạt kỹ năng này cho một cuốn sách (ví dụ: "Hãy chạy book_extractor cho cuốn Rich Dad Poor Dad"), bạn PHẢI thực hiện việc băm nhỏ cấu trúc cuốn sách như sau:
- Chia mỗi chương lớn thành **10 chủ đề vi mô (micro-topics)**.
- Khởi chạy tổng cộng **40 Sub-agents (Micro-Agents)** (nếu sách có 4 chương, hoặc tương đương với số chương) thông qua công cụ `invoke_subagent`.

## 2. Tiêu chuẩn của Sub-agent (Prompt Template)
Trong tham số `Prompt` của mỗi Sub-agent, bạn BẮT BUỘC phải truyền đạt các quy tắc "thép" sau:

1. **BILINGUAL (Song ngữ):** Mọi đoạn văn, tiêu đề đều phải được viết bằng ngôn ngữ gốc (ví dụ: Tiếng Anh) đi kèm ngay lập tức với bản dịch Tiếng Việt.
2. **ZERO HALLUCINATION (Cấm bịa đặt):** Nghiêm cấm việc sáng tạo ra các nhân vật hoặc Case Study giả định không có thật trong sách. Thay vào đó, để tăng độ dài, Agent phải phân tích cực kỳ sâu sắc về **Kinh tế vĩ mô** và **Tâm lý học hành vi**.
3. **30s PLANNING (Đếm ngược 30 giây):** Agent phải gọi tool `schedule` để đợi 30 giây (DurationSeconds=30, TimerCondition='never') nhằm có thời gian suy nghĩ, sau đó mới gọi tool `write_to_file` để ghi ra file nháp (ví dụ: `01-part01.md`).
4. **SILENT EXIT:** Khi hoàn thành, Agent chỉ được phép phản hồi "DONE", tuyệt đối không tóm tắt để tránh làm quá tải bộ nhớ hệ thống.

## 3. Quy trình Lắp ráp (Assembly & Build)
- Trong thời gian các Agent chạy, hãy tạo một script Python tên là `combine_and_build.py`.
- Script này phải có nhiệm vụ:
  1. Quét toàn bộ các file `*part*.md` đã được các Agent viết.
  2. Nối (Concatenate) các file của cùng một chương lại thành 1 file Markdown duy nhất.
  3. Dùng thư viện `markdown` để dịch mã MD sang HTML.
  4. Đổ nội dung HTML vào một template Website có sẵn giao diện Dark Mode cao cấp.
- Khi toàn bộ 40 Agent báo "DONE", hãy gọi tool `run_command` để thực thi script Python trên.

## Lệnh Khởi Động
Người dùng chỉ cần nói: **"Chạy kỹ năng book_extractor"**, bạn hãy ngay lập tức phân tích số lượng chương, tạo danh sách 40 chủ đề vi mô, và kích hoạt dàn Agent song song mà không cần hỏi thêm.
