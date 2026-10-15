#!/usr/bin/env python3
"""style-spec.md is the single source of truth for each preset's LLM prompt.

    python scripts/sync_prompts.py          # rewrite hub.js prompts from style-spec.md
    python scripts/sync_prompts.py --check  # exit 1 if any hub.js prompt has drifted
"""
import os, re, sys
from presets import ROOT, VOLUMES, presets, spec_prompt, js_escape, js_unescape, HUB_PROMPT_RE


def main(check):
    drift = []
    for vol in VOLUMES:
        hub = os.path.join(ROOT, vol, "hub.js")
        js = open(hub, encoding="utf-8").read()
        ids = presets(vol)
        matches = list(HUB_PROMPT_RE.finditer(js))
        if len(matches) != len(ids):
            sys.exit(f"{vol}/hub.js has {len(matches)} prompts but {len(ids)} preset folders")
        out, last = [], 0
        for pid, m in zip(ids, matches):
            want = spec_prompt(vol, pid)
            if want is None:
                sys.exit(f"{vol}/{pid}: style-spec.md has no prompt block")
            if js_unescape(m.group(2)).strip() != want:
                drift.append(f"{vol}/{pid}")
            out += [js[last:m.start(2)], js_escape(want)]
            last = m.end(2)
        out.append(js[last:])
        if not check:
            open(hub, "w", encoding="utf-8").write("".join(out))
    if check and drift:
        print("Prompt drift (run scripts/sync_prompts.py):\n  " + "\n  ".join(drift))
        sys.exit(1)
    print(("checked" if check else "synced") + f", {len(drift)} drifted")


if __name__ == "__main__":
    main("--check" in sys.argv)
