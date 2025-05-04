# PDF Processing API

This Node.js API orchestrates PDF processing using pdfcpu, pdf2htmlEX, and Postgres.

## Endpoints

- `POST /upload` — Upload a PDF file (multipart/form-data, field: `pdf`)
- `POST /process` — Start processing a PDF (split, outline, convert)
- `GET /download/:docId/:chapter` — Download a converted HTML chapter
- `GET /health` — Health check

## Docker Usage

This service is designed to run with `docker-compose` alongside Postgres, pdfcpu, and pdf2htmlEX. Shared volumes are used for `/data` (input, split, output) and `/scripts/static` (custom CSS/JS for HTML output).

## Workflow

1. Upload a PDF via `/upload`.
2. Call `/process` to:
   - Extract outline and split PDF by chapters using pdfcpu.
   - Store split PDFs in `/data/split`.
   - Convert each split PDF to HTML using pdf2htmlEX.
   - Replace output HTML's CSS/JS with files from `/app/static`.
   - Store metadata and file paths in Postgres.
3. Download HTML chapters via `/download/:docId/:chapter`.

## Development

- `npm run dev` — Start with nodemon
- `npm start` — Start normally

---

**Note:** This is a scaffold. Implement orchestration logic in `index.js` as needed. 