# Design research — limitations first

**What was done:** the three business listings, the Urbanly article and the KLINQ Instagram profile were read as text (see `BUSINESS_RESEARCH.md`). The supplied Instagram media (88 photos, 28 videos) was rendered and inspected as contact sheets and at full size.

**What was not done:** the reference sites in the brief were **not visually inspected** in this session, and no screenshots of them were captured. That includes MotionSites, Trona, D'YAVOL, Brassclub, Dr. Stravinsky, Velvet Pour, React Bits, Aceternity, the award galleries and the Codrops pages. The brief's list of required per-reference findings is therefore not met. Nothing below claims a reference was studied in depth.

## Principles taken from the brief's own descriptions (not verified against the sites)
- Editorial hero: typography on one side, the subject on the other, legible overlay. Implemented on `/`.
- Pinned, scroll-scrubbed photo sequence with captions, reversible, with a static fallback. Implemented for "golden hour to after hours" and "the art of the pour".
- Accessible tabs for venue spaces and the menu, with arrow-key support.
- Native `<dialog>` for the mobile menu and the lightbox, for focus trapping and Escape.

## Section mapping (brief §13) — what was actually built
| Section | Brief reference (not studied) | Built as |
|---|---|---|
| Hero | D'YAVOL, MotionSites | Photographic hero; no 3D |
| Pour | MotionSites, luxury beverage | Pinned four-photo sequence |
| Golden → night | Hospitality/lifestyle | Pinned two-photo crossfade |
| Food | Editorial culinary | Asymmetric photo grid with named dishes |
| Beverage explorer | Dr. Stravinsky | Category filter only; no flavour data |
| Menu | Brassclub | Accessible tabs, grouped lists, source links, no prices |
| Faces | Fashion editorials, React Bits | Horizontal snap strip with buttons and arrow keys |
| Events | Music venues | Status-driven list plus the published poster |
| Venue | Trona, rooftop hospitality | Tabbed explorer |
| Footer | Original KLINQ design | Oversized wordmark, four-column grid, legal line |
