# Scrollytelling Portfolio Demo

> 🔗 **Live site:** _add your GitHub Pages URL here once deployed_
> e.g. `https://YOUR-USERNAME.github.io/scrollytelling-demo/`

A small 3-page test project applying Professor Williams' **spec-driven scrollytelling** process to my portfolio. Built for IT class, Spring 2026.

## What this is

A focused experiment — not a redesign of my full portfolio. The point is to practice the workflow:

1. Write a clear **spec** that defines scope, audience, content, and acceptance criteria *before* writing code.
2. Use that spec to guide implementation.
3. Compare the result to vibe-prompting and notice the difference.

The spec is in [`SPEC.md`](./SPEC.md). Read that first if you want to see what was planned. The HTML/CSS/JS in this repo is the implementation of it.

## Pages

| Page | Purpose |
|---|---|
| [`index.html`](./index.html) | Home — 5-step intro: who I am, what I do, where I'm going |
| [`why-cloud.html`](./why-cloud.html) | Career narrative — timeline-based 4-step story |
| [`projects.html`](./projects.html) | Case study — production sysadmin work, 4 steps |

## Technique

Standard sticky-graphic + scrolling-text scrollytelling pattern:

- Left column: sticky visual, swaps content as you scroll
- Right column: stacked text "steps"
- An IntersectionObserver activates the step that crosses the middle of the viewport, which dispatches a state change to the sticky visual

## Stack

Zero dependencies. No build step. Vanilla HTML / CSS / JS only.

- HTML / CSS / vanilla JS
- IntersectionObserver for scroll detection
- Google Fonts: JetBrains Mono + Space Grotesk
- Hosted on GitHub Pages

## Running locally

Just open `index.html` in a browser. Or with Python's built-in server:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. Repo → Settings → Pages → Source: Deploy from branch → `main` / `(root)`.
3. Wait ~30 seconds, then update the live link at the top of this README.

## Process notes

- Time spent on the spec: ~30 minutes.
- Time spent on implementation: ~1 hour.
- Total: under 2 hours from blank repo to deployed site.

That's the whole point of the assignment — see what's possible when the planning is structured up front.

---

**Author:** Brandon Leon-Flores
**Course:** IT — Web Design (Williams), NJIT
# ScrollyTelling
