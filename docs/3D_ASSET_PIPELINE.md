# 3D asset pipeline — decision: no real-time 3D

## Decision
Real-time glass (three.js, React Three Fiber, drei) was **not installed**. The hero and the pour sequence use authentic photographs. This is the brief's own fallback in §24 and §25.

## Why
- No glass or bottle geometry was supplied, and no multi-angle product photography exists in the media. A believable glass model would need reconstruction or purchased assets, and the brief forbids buying assets without permission.
- No clean slow-motion pour footage was supplied. The reels carry promotional text.
- The brief says not to force real-time 3D when authentic photography looks better. The supplied drink photography is strong.
- Keeping WebGL out means no GPU budget, no context-loss handling and no shader bundle. The site works without WebGL by default.

## Options compared
| Option | Visual quality | Brand accuracy | Asset availability | Decision |
|---|---|---|---|---|
| A — real-time 3D glass | Would need strong modelling | Would be reconstructed | None supplied | Not built |
| B — layered photography | Good, authentic | Exact | Yes | **Used (pinned sequence)** |
| C — image sequence | Needs pour frames | — | No | Not built |
| D — scroll-scrubbed video | Needs clean pour footage | — | Only promotional reels | Not built |
| E — static hero | Good | Exact | Yes | Hero fallback |

## If 3D is revisited later
1. Source a clean, lit glass photograph set from the restaurant (multi-angle, plain background).
2. Model the glass in Blender, export GLB under 3 MB with Draco or meshopt.
3. Add `three`, `@react-three/fiber` and `@react-three/drei`, lazy-loaded behind a capability check.
4. Keep the photograph as the poster and fallback.
