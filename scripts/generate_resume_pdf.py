from __future__ import annotations

from pathlib import Path
from textwrap import wrap


PAGE_WIDTH = 595
PAGE_HEIGHT = 842
LEFT = 56
TOP = 780
LEADING = 18
TITLE_SIZE = 22
BODY_SIZE = 10


def escape_pdf_text(value: str) -> str:
    return value.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def chunk_lines() -> list[list[tuple[str, int]]]:
    entries: list[tuple[str, int]] = [
        ("Jun-Ho Kang, Ph.D.", TITLE_SIZE),
        ("Process Separation and Industrial AI Specialist", 13),
        ("", BODY_SIZE),
        ("Email: junhok0629@google.com", BODY_SIZE),
        (
            "Google Scholar: https://scholar.google.com/citations?user=im_R1NYAAAAJ&hl=ko",
            BODY_SIZE,
        ),
        ("", BODY_SIZE),
        (
            "Summary: Works at the intersection of PSA-based gas separation, dynamic simulation,",
            BODY_SIZE,
        ),
        (
            "surrogate modeling, time-series prediction, and optimization for industrial systems.",
            BODY_SIZE,
        ),
        ("", BODY_SIZE),
        ("Highlights", 12),
        ("- 14 publications, including 3 first-author papers", BODY_SIZE),
        ("- 15 conference presentations across international and domestic venues", BODY_SIZE),
        ("- 6 selected industrial projects in chemicals, shipping, semiconductors, and energy", BODY_SIZE),
        ("- 7 funded research programs", BODY_SIZE),
        ("", BODY_SIZE),
        ("Experience", 12),
        ("Dogwood AI | AI Developer / Research Lead | Mar 2023 - Jun 2025", BODY_SIZE),
        (
            "Led integrated AI solutions for chemical manufacturing, linking quality prediction,",
            BODY_SIZE,
        ),
        (
            "optimization, anomaly analysis, surrogate modeling, and explainable interfaces.",
            BODY_SIZE,
        ),
        ("", BODY_SIZE),
        ("Yonsei University | Ph.D. Researcher | Mar 2017 - Feb 2023", BODY_SIZE),
        (
            "Conducted high-fidelity dynamic simulation and machine-learning modeling for PSA,",
            BODY_SIZE,
        ),
        ("membrane systems, CO2 capture, and hydrogen recovery processes.", BODY_SIZE),
        ("", BODY_SIZE),
        ("Selected Projects", 12),
        ("- Onboard wet CO2 capture optimization for LNG-fueled ships", BODY_SIZE),
        ("- Xenon recovery process development from MSR off-gas", BODY_SIZE),
        ("- Integrated AI platform for chemical manufacturing operations", BODY_SIZE),
        ("- AI-based batch simulator for semiconductor material optimization", BODY_SIZE),
        ("", BODY_SIZE),
        ("Education", 12),
        (
            "Ph.D. integrated program in Chemical and Biomolecular Engineering, Yonsei University",
            BODY_SIZE,
        ),
        ("B.S. in Chemical and Biomolecular Engineering, Yonsei University", BODY_SIZE),
        ("", BODY_SIZE),
        ("Core Tools", 12),
        ("gPROMS, Aspen Plus, Pro/II, MATLAB, Python, ANN/DNN, Genetic Algorithm, XAI, LLM", BODY_SIZE),
        ("", BODY_SIZE),
        (
            "This PDF is a concise export for download from the portfolio site. See the website for",
            BODY_SIZE,
        ),
        ("full project narratives, publication archive, and bilingual content.", BODY_SIZE),
    ]

    pages: list[list[tuple[str, int]]] = [[]]
    current_y = TOP

    for line, size in entries:
        wraps = [line] if not line else wrap(line, width=84)
        if not wraps:
            wraps = [""]

        for index, wrapped in enumerate(wraps):
            line_size = size if index == 0 else BODY_SIZE
            if current_y < 70:
                pages.append([])
                current_y = TOP
            pages[-1].append((wrapped, line_size))
            current_y -= LEADING if wrapped else LEADING // 2

    return pages


def text_stream(lines: list[tuple[str, int]]) -> bytes:
    commands = ["BT", f"/F1 {BODY_SIZE} Tf", f"1 0 0 1 {LEFT} {TOP} Tm"]
    current_size = BODY_SIZE
    first = True

    for line, size in lines:
        if first:
            first = False
        else:
            commands.append(f"0 -{LEADING} Td")
        if size != current_size:
            commands.append(f"/F1 {size} Tf")
            current_size = size
        safe = escape_pdf_text(line)
        commands.append(f"({safe}) Tj")

    commands.append("ET")
    return "\n".join(commands).encode("ascii", "replace")


def build_pdf() -> bytes:
    pages = chunk_lines()
    objects: list[bytes] = []

    def add_object(payload: bytes) -> int:
        objects.append(payload)
        return len(objects)

    font_id = add_object(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    page_ids: list[int] = []
    content_ids: list[int] = []

    for page_lines in pages:
        stream = text_stream(page_lines)
        content_id = add_object(
            f"<< /Length {len(stream)} >>\nstream\n".encode("ascii")
            + stream
            + b"\nendstream"
        )
        content_ids.append(content_id)
        page_ids.append(0)

    kids = []
    pages_id_placeholder_index = len(objects)
    add_object(b"<<>>")

    for index, content_id in enumerate(content_ids):
        page_id = add_object(
            (
                f"<< /Type /Page /Parent {pages_id_placeholder_index + 1} 0 R "
                f"/MediaBox [0 0 {PAGE_WIDTH} {PAGE_HEIGHT}] "
                f"/Resources << /Font << /F1 {font_id} 0 R >> >> "
                f"/Contents {content_id} 0 R >>"
            ).encode("ascii")
        )
        page_ids[index] = page_id
        kids.append(f"{page_id} 0 R")

    pages_id = pages_id_placeholder_index + 1
    objects[pages_id_placeholder_index] = (
        f"<< /Type /Pages /Count {len(page_ids)} /Kids [{' '.join(kids)}] >>"
    ).encode("ascii")

    catalog_id = add_object(f"<< /Type /Catalog /Pages {pages_id} 0 R >>".encode("ascii"))

    buffer = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    offsets = [0]

    for object_id, payload in enumerate(objects, start=1):
        offsets.append(len(buffer))
        buffer.extend(f"{object_id} 0 obj\n".encode("ascii"))
        buffer.extend(payload)
        buffer.extend(b"\nendobj\n")

    xref_offset = len(buffer)
    buffer.extend(f"xref\n0 {len(objects) + 1}\n".encode("ascii"))
    buffer.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        buffer.extend(f"{offset:010d} 00000 n \n".encode("ascii"))
    buffer.extend(
        (
            f"trailer\n<< /Size {len(objects) + 1} /Root {catalog_id} 0 R >>\n"
            f"startxref\n{xref_offset}\n%%EOF\n"
        ).encode("ascii")
    )
    return bytes(buffer)


def main() -> None:
    destination = Path("public/files/jun-ho-kang-cv.pdf")
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_bytes(build_pdf())


if __name__ == "__main__":
    main()
