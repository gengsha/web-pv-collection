#!/usr/bin/env python3
"""Switch Google Fonts links to the mainland-China endpoints (fonts.googleapis.cn / fonts.gstatic.cn).

    python scripts/use_cn_font_mirror.py           # switch to .cn
    python scripts/use_cn_font_mirror.py --revert  # switch back to .com
Use it on a deployment aimed at mainland China; the repo itself keeps the .com links.
"""
import os, sys
from presets import ROOT

pairs = [("fonts.googleapis.com", "fonts.googleapis.cn"), ("fonts.gstatic.com", "fonts.gstatic.cn")]
if "--revert" in sys.argv:
    pairs = [(b, a) for a, b in pairs]
changed = 0
for dirpath, _, files in os.walk(ROOT):
    if "/.git" in dirpath:
        continue
    for f in files:
        if f.endswith((".html", ".css")):
            p = os.path.join(dirpath, f)
            s = open(p, encoding="utf-8").read()
            t = s
            for a, b in pairs:
                t = t.replace(a, b)
            if t != s:
                open(p, "w", encoding="utf-8").write(t)
                changed += 1
print(f"{changed} files updated")
