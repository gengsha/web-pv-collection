#!/usr/bin/env python3
"""Capture a 1280x800 screenshot of every preset and rebuild the README gallery.

    pip install playwright && playwright install --with-deps chromium
    python scripts/screenshot.py
Runs automatically in .github/workflows/screenshots.yml.
"""
import functools, http.server, os, re, threading
from playwright.sync_api import sync_playwright
from presets import ROOT, VOLUMES, presets

PORT = 8765
OUT = os.path.join(ROOT, "screenshots")
PAGES = "https://gengsha.github.io/web-pv-collection"


def serve():
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
    handler.log_message = lambda *a: None
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


def capture():
    with sync_playwright() as p:
        browser = p.chromium.launch(args=["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"])
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        for vol in VOLUMES:
            os.makedirs(os.path.join(OUT, vol), exist_ok=True)
            for pid in presets(vol):
                page.goto(f"http://127.0.0.1:{PORT}/{vol}/presets/{pid}/index.html", wait_until="networkidle")
                page.wait_for_timeout(2500)  # let intro animations / shaders settle
                page.screenshot(path=os.path.join(OUT, vol, f"{pid}.jpg"), type="jpeg", quality=72)
                print("shot", vol, pid)
        browser.close()


def gallery():
    blocks = []
    for vol in VOLUMES:
        cells = [
            f'<a href="{PAGES}/{vol}/presets/{pid}/"><img src="screenshots/{vol}/{pid}.jpg" width="240" alt="{pid}"></a>'
            for pid in presets(vol)
        ]
        rows = ["<p>" + " ".join(cells[i:i + 4]) + "</p>" for i in range(0, len(cells), 4)]
        blocks.append(f"<details{' open' if vol == 'web-pv' else ''}><summary><b>{vol}</b></summary>\n\n" + "\n".join(rows) + "\n\n</details>")
    readme_path = os.path.join(ROOT, "README.md")
    readme = open(readme_path, encoding="utf-8").read()
    new = "<!-- GALLERY:START -->\n" + "\n\n".join(blocks) + "\n<!-- GALLERY:END -->"
    readme = re.sub(r"<!-- GALLERY:START -->.*?<!-- GALLERY:END -->", new, readme, flags=re.S)
    open(readme_path, "w", encoding="utf-8").write(readme)


if __name__ == "__main__":
    srv = serve()
    try:
        capture()
    finally:
        srv.shutdown()
    gallery()
