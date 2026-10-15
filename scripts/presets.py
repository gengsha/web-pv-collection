"""Shared helpers: locate presets, extract the canonical LLM prompt from style-spec.md."""
import os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOLUMES = ["web-pv", "web-pv2", "web-pv3", "web-pv4"]
REQUIRED_FILES = ["index.html", "style.css", "main.js", "style-spec.md"]
PROMPT_RE = re.compile(r"(##[^\n]*大模型直接复用[^\n]*\n.*?```(?:markdown|text)?\n)(.*?)(\n?```)", re.S)
HUB_PROMPT_RE = re.compile(r"(prompt:\s*`)((?:\\.|[^`\\])*)(`)", re.S)


def presets(vol):
    d = os.path.join(ROOT, vol, "presets")
    return sorted(x for x in os.listdir(d) if os.path.isdir(os.path.join(d, x)))


def spec_path(vol, pid):
    return os.path.join(ROOT, vol, "presets", pid, "style-spec.md")


def spec_prompt(vol, pid):
    m = PROMPT_RE.search(open(spec_path(vol, pid), encoding="utf-8").read())
    return m.group(2).strip() if m else None


def js_escape(s):
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def js_unescape(s):
    return re.sub(r"\\(.)", r"\1", s)
