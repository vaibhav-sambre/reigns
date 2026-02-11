import os

PAGE_WIDTH = 612
PAGE_HEIGHT = 792
LEFT = 54
TOP = 760
LINE = 13

OUTPUT = "output/pdf/office-reigns-app-summary.pdf"

lines = [
    ("Office Reigns - App Summary", "title"),
    ("", "spacer"),
    ("What It Is", "h"),
    ("Office Reigns is a local-first browser game inspired by Reigns where each week presents a workplace", "n"),
    ("decision. Player choices shift four career pillars and determine whether they earn promotion or burn out.", "n"),
    ("", "spacer"),
    ("Who It's For", "h"),
    ("Primary persona: individual contributors in corporate roles. The app supports role selection for", "n"),
    ("Developer, Product Manager, Analyst, and Business Associate.", "n"),
    ("", "spacer"),
    ("What It Does", "h"),
    ("- Runs week-by-week decision gameplay with two choices per card.", "b"),
    ("- Tracks four pillars (bandwidth, salary, reputation, life) with clamped values 0-100.", "b"),
    ("- Applies deterministic game rules for promotion and game-over outcomes.", "b"),
    ("- Seeds and stores card content locally in IndexedDB.", "b"),
    ("- Supports persona-aware and anti-repeat card selection with optional seeded RNG.", "b"),
    ("- Provides admin tools to list/edit/delete cards and configure promotion settings.", "b"),
    ("- Imports/exports cards as JSON for backup and bulk updates.", "b"),
    ("", "spacer"),
    ("How It Works (Repo Evidence)", "h"),
    ("- UI layer: React + React Router routes '/' for gameplay and '/admin' for tooling.", "b"),
    ("- State layer: GameProvider (useReducer + effects) orchestrates init, decision, draw, and persistence.", "b"),
    ("- Engine layer: pure TypeScript modules (effects, gameState, promotion, cardSelector) compute outcomes.", "b"),
    ("- Persistence layer: idb-backed IndexedDB stores cards, current game state, and promotion settings.", "b"),
    ("- Data flow: Intro persona -> card drawn -> choice -> effects applied -> status checked -> state saved.", "b"),
    ("- External backend/API service: Not found in repo.", "b"),
    ("", "spacer"),
    ("How To Run (Minimal)", "h"),
    ("1. Install dependencies: npm install", "n"),
    ("2. Start dev server: npm run dev", "n"),
    ("3. Open: http://localhost:5173 (admin UI at /admin)", "n"),
    ("", "spacer"),
    ("Evidence files: README.md; src/App.tsx; src/ui/hooks/useGame.tsx; src/engine/*.ts;", "f"),
    ("src/persistence/db.ts; src/admin/*.tsx; package.json.", "f"),
]


def esc(text: str) -> str:
    return text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')


# Build a simple one-page PDF with built-in Helvetica fonts.
objects = []


def add_obj(data: bytes) -> int:
    objects.append(data)
    return len(objects)


content_parts = [b"BT\n"]
y = TOP

for text, kind in lines:
    if kind == "spacer":
        y -= 6
        continue

    if kind == "title":
        font = "/F2"
        size = 18
    elif kind == "h":
        font = "/F2"
        size = 12
    elif kind == "f":
        font = "/F1"
        size = 8
    else:
        font = "/F1"
        size = 10

    if kind == "b":
        x = LEFT + 4
    else:
        x = LEFT

    content_parts.append(f"{font} {size} Tf\n".encode("ascii"))
    content_parts.append(f"1 0 0 1 {x} {y} Tm\n".encode("ascii"))
    content_parts.append(f"({esc(text)}) Tj\n".encode("ascii"))
    y -= LINE

content_parts.append(b"ET\n")
content_stream = b"".join(content_parts)

font1 = add_obj(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
font2 = add_obj(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
content = add_obj(b"<< /Length " + str(len(content_stream)).encode("ascii") + b" >>\nstream\n" + content_stream + b"endstream")
page = add_obj(
    f"<< /Type /Page /Parent 5 0 R /MediaBox [0 0 {PAGE_WIDTH} {PAGE_HEIGHT}] /Resources << /Font << /F1 {font1} 0 R /F2 {font2} 0 R >> >> /Contents {content} 0 R >>".encode(
        "ascii"
    )
)
pages = add_obj(b"<< /Type /Pages /Count 1 /Kids [4 0 R] >>")
catalog = add_obj(b"<< /Type /Catalog /Pages 5 0 R >>")

pdf = bytearray()
pdf.extend(b"%PDF-1.4\n")
offsets = [0]
for i, obj in enumerate(objects, start=1):
    offsets.append(len(pdf))
    pdf.extend(f"{i} 0 obj\n".encode("ascii"))
    pdf.extend(obj)
    pdf.extend(b"\nendobj\n")

xref_start = len(pdf)
pdf.extend(f"xref\n0 {len(objects) + 1}\n".encode("ascii"))
pdf.extend(b"0000000000 65535 f \n")
for off in offsets[1:]:
    pdf.extend(f"{off:010d} 00000 n \n".encode("ascii"))

pdf.extend(
    f"trailer\n<< /Size {len(objects) + 1} /Root {catalog} 0 R >>\nstartxref\n{xref_start}\n%%EOF\n".encode(
        "ascii"
    )
)

os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
with open(OUTPUT, "wb") as f:
    f.write(pdf)

print(OUTPUT)
