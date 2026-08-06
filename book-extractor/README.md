# 📚 Book Knowledge Extractor — Gemini Memory Mining

## Mục tiêu
Vét cạn nội dung một cuốn sách từ **bộ nhớ training** của Gemini,
KHÔNG nạp file sách. Tổ chức thành knowledge base có cấu trúc.

## Core Challenge
Gemini đã "đọc" hàng triệu sách trong quá trình training. Kiến thức nằm
trong parametric memory — nhưng:
- Không biết nhớ đến đâu (no self-awareness of coverage)
- Có thể bịa (hallucination) khi không nhớ rõ
- Xu hướng tóm tắt quá mức nếu không ép chi tiết
- Cần kỹ thuật "đào nhiều lớp" để vét cạn

## Pipeline: 6 Phases

```
Phase 0        Phase 1        Phase 2         Phase 3        Phase 4        Phase 5
RECON    ───▶  SKELETON  ───▶ DEEP DIVE  ───▶ CROSS-REF ───▶ SYNTHESIS ───▶ VERIFY
                                                                              │
Sách này       TOC &          Từng chương     Patterns       Wiki &          ◄─┘
có trong       thesis         7 chiều         xuyên suốt     deliverables   Gap? → 
memory?        argument       phân tích       themes         Q&A            Quay lại
Mức nào?       tree                           evolution                     Phase 2
```

## Anti-Hallucination Strategy

### 1. Confidence Tagging
Mọi prompt yêu cầu Gemini tự đánh giá confidence:
- 🟢 HIGH: Nhớ rõ, chắc chắn đúng
- 🟡 MEDIUM: Nhớ đại ý, có thể sai chi tiết  
- 🔴 LOW: Không chắc, có thể đang suy luận/bịa
- ⚫ UNKNOWN: Không nhớ

### 2. Cross-verification
- Hỏi cùng 1 thông tin bằng 2-3 prompt khác nhau
- So sánh output → inconsistency = likely hallucination
- Phase 5 verify bằng web search

### 3. "Đào sâu bằng anchor"
Thay vì hỏi chung, dùng chi tiết đã biết để kích memory:
- "Trong chương về X, tác giả dùng ví dụ gì?" (better)
- vs "Kể về chương 3" (worse — quá mở)

## Thư mục

```
book-extractor/
├── README.md
├── config.yaml
│
├── prompts/
│   ├── phase0-recon/           # Trinh sát: sách có trong memory?
│   │   ├── 01-book-probe.md    # Test nhận biết sách
│   │   └── 02-depth-assess.md  # Đánh giá độ sâu memory
│   │
│   ├── phase1-skeleton/        # Bộ xương
│   │   ├── 01-toc-recall.md    # Nhớ lại mục lục
│   │   ├── 02-thesis.md        # Thesis & argument tree
│   │   └── 03-concept-map.md   # Bản đồ khái niệm
│   │
│   ├── phase2-deepdive/        # Đào sâu từng chương
│   │   ├── 01-chapter-full.md  # Template chương (7 chiều)
│   │   ├── 02-quotes-hunt.md   # Đào trích dẫn
│   │   ├── 03-examples-hunt.md # Đào ví dụ & case study
│   │   └── 04-terminology.md   # Đào thuật ngữ
│   │
│   ├── phase3-crossref/        # Liên kết chéo
│   │   ├── 01-themes.md
│   │   ├── 02-contradictions.md
│   │   └── 03-evolution.md
│   │
│   ├── phase4-synthesis/       # Tổng hợp
│   │   ├── 01-executive.md
│   │   ├── 02-wiki-gen.md
│   │   └── 03-qa-gen.md
│   │
│   └── phase5-verify/          # Kiểm chứng
│       ├── 01-self-check.md    # Gemini tự kiểm tra
│       ├── 02-web-verify.md    # Cross-check bằng web search
│       └── 03-gap-fill.md      # Bổ sung gaps
│
├── scripts/
│   ├── run_pipeline.py
│   ├── gemini_client.py
│   ├── consistency_checker.py  # So sánh cross-prompt outputs
│   └── wiki_builder.py
│
├── memory/                     # State & progress
│   ├── progress.json
│   ├── confidence_map.json     # Track confidence per section
│   ├── consistency_log.json    # Cross-check results
│   └── extraction_cache.json
│
├── docs/
│   ├── wiki/                   # Output wiki pages
│   └── construction/           # Build decisions & iterations
│
├── output/
│   ├── raw/                    # Raw Gemini responses
│   ├── processed/              # Parsed & confidence-tagged
│   └── final/                  # Deliverables
│
└── templates/
    └── wiki-page.md
```
