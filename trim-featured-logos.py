#!/usr/bin/env python3
"""Trim uniform margins from featured project PNGs (corner colour match, like Sharp trim)."""
from __future__ import annotations

import os
from collections import deque

import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.abspath(__file__))
THRESH = 14 * 3  # sum of abs RGB delta vs corner; ~sharp threshold 14

# Opaque logos with white/cream mats: remove only edge-connected background so tile gradients show through
EDGE_KEY_TRANSPARENT = {"GoCafeCo", "Pronto", "InPlan", "WiseWeb"}

LOGOS = [
    ("MWF", "MedWorkFlow.png"),
    ("GoCafeCo", "Projects Logo.png"),
    ("Pronto", "Logo.png"),
    ("InPlan", "Logo.png"),
    ("WiseWeb", "Logo.png"),
    ("OpenRole", "logo.png"),
]


def trim_png(path: str) -> tuple[int, int, int, int] | None:
    im = Image.open(path).convert("RGBA")
    arr = np.array(im)
    h, w = arr.shape[0], arr.shape[1]
    r0, g0, b0, a0 = (int(x) for x in arr[0, 0])
    has_transparency = bool(np.any(arr[:, :, 3] < 250))

    if has_transparency:
        mask = arr[:, :, 3] > 40
    elif a0 < 30:
        mask = arr[:, :, 3] > 40
    else:
        dr = np.abs(arr[:, :, 0].astype(np.int16) - r0)
        dg = np.abs(arr[:, :, 1].astype(np.int16) - g0)
        db = np.abs(arr[:, :, 2].astype(np.int16) - b0)
        mask = (dr + dg + db) > THRESH

    if not np.any(mask):
        return None

    ys = np.where(np.any(mask, axis=1))[0]
    xs = np.where(np.any(mask, axis=0))[0]
    y0, y1 = int(ys[0]), int(ys[-1])
    x0, x1 = int(xs[0]), int(xs[-1])

    pad = max(1, min(h, w) // 160)
    y0 = max(0, y0 - pad)
    x0 = max(0, x0 - pad)
    y1 = min(h - 1, y1 + pad)
    x1 = min(w - 1, x1 + pad)

    if (x0, y0, x1, y1) == (0, 0, w - 1, h - 1):
        return None

    nw, nh = x1 - x0 + 1, y1 - y0 + 1
    # Avoid pointless re-saves when already tight (repeated runs)
    if nw >= w - 2 and nh >= h - 2:
        return None

    im.crop((x0, y0, x1 + 1, y1 + 1)).save(path, optimize=True, compress_level=9)
    return (w, h, x1 - x0 + 1, y1 - y0 + 1)


def flood_key_outer_matte(path: str, tol: int = 52) -> bool:
    """
    Set alpha=0 for pixels that (1) match corner median colour within tol and
    (2) are 4-connected to the image edge through such pixels.
    Leaves enclosed light areas (e.g. WiseWeb 'W') intact.
    """
    im = Image.open(path).convert("RGBA")
    arr = np.array(im)
    h, w = arr.shape[:2]
    rgb = arr[:, :, :3].astype(np.int16)
    corners = np.array(
        [arr[0, 0, :3], arr[0, w - 1, :3], arr[h - 1, 0, :3], arr[h - 1, w - 1, :3]],
        dtype=np.int16,
    )
    ref = np.median(corners, axis=0).astype(np.int16)
    dist = (
        np.abs(rgb[:, :, 0] - ref[0])
        + np.abs(rgb[:, :, 1] - ref[1])
        + np.abs(rgb[:, :, 2] - ref[2])
    )
    is_matte = dist <= tol

    visited = np.zeros((h, w), dtype=bool)
    q: deque[tuple[int, int]] = deque()
    for x in range(w):
        for y in (0, h - 1):
            if is_matte[y, x] and arr[y, x, 3] > 30:
                visited[y, x] = True
                q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if is_matte[y, x] and not visited[y, x] and arr[y, x, 3] > 30:
                visited[y, x] = True
                q.append((y, x))

    while q:
        y, x = q.popleft()
        for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            ny, nx = y + dy, x + dx
            if (
                0 <= ny < h
                and 0 <= nx < w
                and not visited[ny, nx]
                and is_matte[ny, nx]
                and arr[ny, nx, 3] > 30
            ):
                visited[ny, nx] = True
                q.append((ny, nx))

    if not np.any(visited):
        return False
    arr2 = arr.copy()
    arr2[visited, 3] = 0
    Image.fromarray(arr2).save(path, optimize=True, compress_level=9)
    return True


def export_webp(png_path: str) -> None:
    out = os.path.splitext(png_path)[0] + ".webp"
    im = Image.open(png_path).convert("RGBA")
    im.save(out, "WEBP", quality=82, method=6)
    print("webp:", out)


def main() -> None:
    for sub, name in LOGOS:
        path = os.path.join(ROOT, "featured-projects", sub, name)
        if not os.path.isfile(path):
            print("skip (missing):", path)
            continue
        out = trim_png(path)
        if out is None:
            print("trim unchanged:", path)
        else:
            bw, bh, aw, ah = out
            print(f"trim ok: {path}  {bw}x{bh} -> {aw}x{ah}")
        if sub in EDGE_KEY_TRANSPARENT:
            if flood_key_outer_matte(path):
                print("edge-key transparent:", path)
            else:
                print("edge-key skip:", path)
        try:
            export_webp(path)
        except Exception as e:
            print("webp skip:", path, e)


if __name__ == "__main__":
    main()
