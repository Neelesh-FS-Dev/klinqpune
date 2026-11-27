#!/usr/bin/env python3
"""Create web-optimised copies of the supplied Instagram media.

Originals in the parent folder are never modified. Outputs go to public/media/.
Requires: cwebp and ffmpeg on PATH. Standard library only.

Usage: python3 scripts/optimize-media.py assets/instagram
"""
import os
import subprocess
import sys

# slug -> source index (line number - 1 in the sorted list of *.jpg). Indexes were
# chosen by viewing contact sheets; see docs/MEDIA_INVENTORY.md for subjects.
PHOTOS = {
    "hero-glass": 59,
    "pour-peppery-twist": 58,
    "pour-pink-coupe": 71,
    "pour-naughty-30": 75,
    "golden-hour-lanterns": 49,
    "after-hours-courtyard": 36,
    "rooftop-friends": 47,
    "small-plates": 9,
    "chicken-plate": 10,
    "dessert-nest": 16,
    "dessert-panna": 8,
    "kebab-rolls": 12,
    "flatbread-seekh": 87,
    "faces-portrait-bar": 66,
    "faces-dining-trio": 5,
    "faces-toast": 21,
    "neon-crowd": 7,
    "interior-warm": 77,
    "bar-monochrome": 0,
    "lineup-poster": 85,
    "past-party-1980s": 32,
}

# slug -> (source index in sorted *.mp4 list, trim seconds)
VIDEOS = {
    "chef-plating": (13, 10),
    "kitchen-prep": (21, 10),
    "neon-night": (26, 10),
}


def sorted_files(folder, ext):
    return sorted(f for f in os.listdir(folder) if f.lower().endswith(ext))


def run(cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    src = os.path.abspath(sys.argv[1])
    out = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "media")
    os.makedirs(os.path.join(out, "photo"), exist_ok=True)
    os.makedirs(os.path.join(out, "video"), exist_ok=True)
    jpgs = sorted_files(src, ".jpg")
    mp4s = sorted_files(src, ".mp4")

    for slug, idx in PHOTOS.items():
        srcfile = os.path.join(src, jpgs[idx])
        run(["cwebp", "-quiet", "-q", "80", "-resize", "1080", "0", srcfile,
             "-o", os.path.join(out, "photo", f"{slug}.webp")])
        run(["cwebp", "-quiet", "-q", "78", "-resize", "640", "0", srcfile,
             "-o", os.path.join(out, "photo", f"{slug}-640.webp")])

    for slug, (idx, seconds) in VIDEOS.items():
        srcfile = os.path.join(src, mp4s[idx])
        target = os.path.join(out, "video", f"{slug}.mp4")
        # Decorative loops: no audio track, muted H.264, faststart, 540x960, keyframe every 0.5s.
        run(["ffmpeg", "-v", "error", "-y", "-i", srcfile, "-t", str(seconds), "-an",
             "-vf", "scale=540:960:force_original_aspect_ratio=increase,crop=540:960",
             "-c:v", "libx264", "-preset", "slow", "-crf", "28", "-pix_fmt", "yuv420p",
             "-g", "15", "-movflags", "+faststart", target])
        run(["ffmpeg", "-v", "error", "-y", "-i", target, "-frames:v", "1", "-ss", "0.5",
             "-vf", "scale=540:-2", "-q:v", "4", os.path.join(out, "video", f"{slug}-poster.jpg")])

    print(f"photos: {len(PHOTOS)} (x2 sizes), videos: {len(VIDEOS)} -> {out}")


if __name__ == "__main__":
    main()
