# Media inventory

Originals live in `assets/instagram/` (88 JPG, 28 MP4). They are ignored by `.gitignore` because they are third-party-owned content that must not be republished without permission. Optimised copies are created by `scripts/optimize-media.py` into `public/media/`. Originals are never modified.

Every photo is 4:5 (1080×1350 or 1088×1344). Each has a WebP at 1080 px and at 640 px wide.

## Photographs used on the site (21)
| Output slug | Source file (in `assets/instagram/`) | Source size | Subject (as seen) | Category |
|---|---|---|---|---|
| `hero-glass` | `klinqpune_2026-10-16_17-00-08_4009059588502347927_69447051068_1.jpg` | 1080×1350 | see alt text in `src/data/media.ts` | Drinks |
| `pour-peppery-twist` | `klinqpune_2026-10-16_17-00-08_4009059588493964283_69447051068_3.jpg` | 1080×1350 | see alt text in `src/data/media.ts` | Drinks |
| `pour-pink-coupe` | `klinqpune_2026-11-05_15-00-01_4023539986108175489_69447051068_3.jpg` | 1080×1350 | see alt text in `src/data/media.ts` | Drinks |
| `pour-naughty-30` | `klinqpune_2026-11-09_17-54-35_4026590954029320062_69447051068_2.jpg` | 1080×1350 | see alt text in `src/data/media.ts` | Drinks |
| `golden-hour-lanterns` | `klinqpune_2026-09-19_14-31-23_3989525120992069242_69447051068_5.jpg` | 1088×1344 | see alt text in `src/data/media.ts` | Rooftop & Interior, Faces |
| `after-hours-courtyard` | `klinqpune_2026-09-11_13-16-17_3983686238656491224_69447051068_5.jpg` | 1080×1350 | see alt text in `src/data/media.ts` | Rooftop & Interior |
| `rooftop-friends` | `klinqpune_2026-09-19_14-31-23_3989525113408607089_69447051068_3.jpg` | 1088×1344 | see alt text in `src/data/media.ts` | Rooftop & Interior, Celebrations |
| `small-plates` | `klinqpune_2026-07-31_17-00-01_3952841991960564963_69447051068_1.jpg` | 1080×1350 | see alt text in `src/data/media.ts` | Food |
| `chicken-plate` | `klinqpune_2026-07-31_17-00-01_3952841992254151357_69447051068_2.jpg` | 1080×1350 | see alt text in `src/data/media.ts` | Food |
| `dessert-nest` | `klinqpune_2026-08-16_17-00-02_3964896202881692379_69447051068_1.jpg` | 1080×1350 | see alt text in `src/data/media.ts` | Food |
| `dessert-panna` | `klinqpune_2026-07-31_17-00-01_3952841991910224453_69447051068_3.jpg` | 1080×1350 | see alt text in `src/data/media.ts` | Food |
| `kebab-rolls` | `klinqpune_2026-08-10_17-00-02_3960462956437606266_69447051068_2.jpg` | 1080×1350 | see alt text in `src/data/media.ts` | Food |
| `flatbread-seekh` | `klinqpune_2026-11-25_17-00-01_4038019353181850485_69447051068_2.jpg` | 1080×1350 | see alt text in `src/data/media.ts` | Food |
| `faces-portrait-bar` | `klinqpune_2026-10-29_19-52-12_4018677643234736112_69447051068_4.jpg` | 1080×1350 | see alt text in `src/data/media.ts` | Faces |
| `faces-dining-trio` | `klinqpune_2026-07-29_17-00-01_3951824446243608272_69447051068_4.jpg` | 1080×1350 | see alt text in `src/data/media.ts` | Faces, Celebrations |
| `faces-toast` | `klinqpune_2026-08-24_14-00-02_3970616839466044845_69447051068_3.jpg` | 1080×1350 | see alt text in `src/data/media.ts` | Faces, Celebrations |
| `neon-crowd` | `klinqpune_2026-07-29_17-00-01_3951824446587570656_69447051068_2.jpg` | 1080×1350 | see alt text in `src/data/media.ts` | Events, Rooftop & Interior |
| `interior-warm` | `klinqpune_2026-11-14_16-00-01_4030039647937525843_69447051068_1.jpg` | 1080×1350 | see alt text in `src/data/media.ts` | Rooftop & Interior |
| `bar-monochrome` | `klinqpune_2026-07-26_14-37-04_3949665217474805908_69447051068_1.jpg` | 1080×1350 | see alt text in `src/data/media.ts` | Drinks |
| `lineup-poster` | `klinqpune_2026-11-24_16-44-02_4037427073889470075_69447051068.jpg` | 1088×1344 | see alt text in `src/data/media.ts` | Events |
| `past-party-1980s` | `klinqpune_2026-09-11_13-16-17_3983686233916831781_69447051068_1.jpg` | 1080×1350 | see alt text in `src/data/media.ts` | Events, Celebrations |
Subjects are described in the alt text in `src/data/media.ts`. Several frames carry overlaid promotional text from KLINQ's own graphics (for example "FINAL CHILL", "Faces of Kling", "Naughty 30" recipe text). This is left as published. Replace with clean frames when the restaurant supplies them.

## Videos used on the site (3)
| Output | Source file | Trim | Audio |
|---|---|---|---|
| `chef-plating.mp4` | `klinqpune_2026-09-08_16-00-08_3981597299824414995_69447051068.mp4` | first 10 s | none (stripped) |
| `kitchen-prep.mp4` | `klinqpune_2026-10-14_17-09-08_4007723594217944503_69447051068.mp4` | first 10 s | none (stripped) |
| `neon-night.mp4` | `klinqpune_2026-11-22_17-00-05_4035985650074012415_69447051068.mp4` | first 10 s | none (stripped) |
Videos are 540×960 H.264, muted, no audio track, keyframe every 15 frames, faststart. Posters are generated from the first half-second.

## Brand
- `public/brand/klinq-lockup-cropped-from-poster.png`: cropped from the weekend lineup poster (`klinqpune_2026-11-24_…_69447051068.jpg`). It is the green "KLINQ · Cocktails & Cuisine" lockup, 270×110. **Replace with the official logo file when supplied.**

## Excluded
- The "Side Quest. One more round" illustration (2026-11-20). It looks illustrated or AI-generated and its provenance is unknown.
- Text-led promotional graphics without a photograph (quote cards, "WTF is…" series, "A recent study found…" series). Their copy is not used as site copy.
- The Instagram interface and profile screenshots. None were supplied.
- Any frame that identifies a guest in a way the brief prohibits. Guest photographs are used with names withheld, and publication needs permission (see below).

## Rights and permission
- Owned by KLINQ, as published on its Instagram account. Use in a public website needs the owner's permission. This concept site is **noindex** and not linked from anywhere until that is granted.
- Guest photographs (Faces, celebrations) need guest consent before publication. No names, occupations or stories are stated.
- The site must not imply KLINQ commissioned or approved the concept (see footer).
