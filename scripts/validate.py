#!/usr/bin/env python3
"""Repository health check (run locally or in CI): python scripts/validate.py"""
import os, re, subprocess, sys, shutil
from presets import ROOT, VOLUMES, REQUIRED_FILES, presets, spec_path, spec_prompt

errors = []
REQUIRED_SECTIONS = ["风格概述", "色彩令牌", "排版与字体", "大模型直接复用"]
LOCAL_REF = re.compile(r'(?:href|src)="(?!https?:|#|mailto:|data:|//)([^"?#]+)')

for vol in VOLUMES:
    for f in ("index.html", "hub.js", "hub.css", "README.md"):
        if not os.path.exists(os.path.join(ROOT, vol, f)):
            errors.append(f"{vol}: missing {f}")
    hub = open(os.path.join(ROOT, vol, "hub.js"), encoding="utf-8").read()
    hub_ids = re.findall(r'id:\s*"([^"]+)"', hub)
    if hub_ids != presets(vol):
        errors.append(f"{vol}/hub.js ids do not match preset folders")
    for pid in presets(vol):
        d = os.path.join(ROOT, vol, "presets", pid)
        for f in REQUIRED_FILES:
            if not os.path.exists(os.path.join(d, f)):
                errors.append(f"{vol}/{pid}: missing {f}")
        spec = open(spec_path(vol, pid), encoding="utf-8").read()
        for sec in REQUIRED_SECTIONS:
            if not re.search(rf"^##[^\n]*{sec}", spec, re.M):
                errors.append(f"{vol}/{pid}: style-spec.md lacks section '{sec}'")
        if not spec_prompt(vol, pid):
            errors.append(f"{vol}/{pid}: empty prompt block")
        css = open(os.path.join(d, "style.css"), encoding="utf-8").read()
        if "prefers-reduced-motion" not in css:
            errors.append(f"{vol}/{pid}: style.css has no prefers-reduced-motion rule")

for dirpath, _, files in os.walk(ROOT):
    if "/.git" in dirpath or "/node_modules" in dirpath:
        continue
    for f in files:
        p = os.path.join(dirpath, f)
        if f.endswith(".html"):
            for ref in LOCAL_REF.findall(open(p, encoding="utf-8").read()):
                if not os.path.exists(os.path.normpath(os.path.join(dirpath, ref))):
                    errors.append(f"{os.path.relpath(p, ROOT)}: broken link {ref}")
        elif f.endswith(".js") and shutil.which("node"):
            r = subprocess.run(["node", "--check", p], capture_output=True, text=True)
            if r.returncode:
                errors.append(f"{os.path.relpath(p, ROOT)}: JS syntax error")

r = subprocess.run([sys.executable, os.path.join(ROOT, "scripts", "sync_prompts.py"), "--check"], capture_output=True, text=True)
if r.returncode:
    errors.append(r.stdout.strip())

if errors:
    print("✗ " + "\n✗ ".join(errors))
    sys.exit(1)
n = sum(len(presets(v)) for v in VOLUMES)
print(f"✓ {n} presets OK")
