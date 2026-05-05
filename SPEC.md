# Scrollytelling Portfolio — Spec

**Author:** Brandon Leon-Flores
**Course:** IT — Web Design (Williams)
**Goal:** Apply Williams' spec-driven scrollytelling process to a small portion of my portfolio (`bleonflores1.com`) as a learning exercise.

---

## 1. Project Goal

Rebuild **3 pages** of my portfolio using scrollytelling — a technique where the page tells a sequential story tied to scroll position, with sticky visuals and animated reveals.

The deliverable is not a redesign of my whole portfolio. It's a focused test to learn the spec-driven workflow that compresses a week of senior-engineer planning into ~1 hour of structured AI prompting.

## 2. Scope (what I'm building)

| # | Page | Purpose | Path |
|---|------|---------|------|
| 1 | **Home** | Scroll-driven intro: who I am → what I do → what I'm building toward | `/index.html` |
| 2 | **Why Cloud/Infra** | Career narrative page reached from home, scroll-revealed sections | `/why-cloud.html` |
| 3 | **Projects** | Sticky-image scrollytelling case study of one production project | `/projects.html` |

Anything else (contact, full project list, blog) is **out of scope** for this exercise.

## 3. Audience & Tone

- **Audience:** Hiring managers and recruiters for cloud / networking / infrastructure roles.
- **Voice:** Honest, technical, no overclaiming. Systems student transitioning toward cloud — not a "cloud engineer" yet.
- **Tone:** Confident but not flashy. Functional aesthetic. Reads like ops console output, not a marketing site.

## 4. Brand & Aesthetic

- **Archetype:** Guardian × Sage (reliable + analytical).
- **Mode:** Dark terminal / ops console.
- **Typography:**
  - Body / mono: **JetBrains Mono** (Google Fonts)
  - Display headings: **Space Grotesk** for contrast (sans-serif, geometric)
- **Color tokens:**
  - `--bg`: `#0b0f0e` (near-black, slightly green-tinted)
  - `--surface`: `#11171a`
  - `--text`: `#e6edf3`
  - `--text-dim`: `#8b949e`
  - `--accent`: `#39d353` (terminal green)
  - `--accent-dim`: `#1f6f3a`
  - `--border`: `#1f2428`
- **Motifs:** Monospace UI labels (`> section_01`), thin rules, small-caps metadata, subtle grid background.

## 5. Scrollytelling Pattern

Use the **sticky-graphic + scrolling-text** pattern (the standard scrollama pattern):

```
+--------------------------+--------------------------+
|                          |                          |
|     [STICKY VISUAL]      |   step 1 text...         |
|     (changes per step)   |                          |
|                          |   step 2 text...         |
|                          |                          |
|                          |   step 3 text...         |
+--------------------------+--------------------------+
```

- Left column: sticky element (`position: sticky; top: 0; height: 100vh`).
- Right column: vertically stacked "steps." Each step is ~80vh tall.
- As each step enters the viewport, it triggers a state change in the sticky visual.
- Implementation: **vanilla JS + IntersectionObserver** (no scrollama library — keeping the dep tree to zero so this is pure HTML/CSS/JS deployable on GitHub Pages with no build step).

### Trigger rules
- An element is "active" when its top crosses 50% of the viewport.
- On activation: add `.is-active` class to the step, dispatch a `step-enter` event with the step's `data-step` value.
- The sticky visual listens for `step-enter` and updates accordingly.
- Reduce-motion: respect `prefers-reduced-motion: reduce` — no animations, just instant state changes.

## 6. Page-by-Page Spec

### 6.1 Home (`index.html`)

5 scroll steps. Sticky visual is a single SVG that morphs/swaps content per step.

| Step | Sticky visual | Text content |
|---|---|---|
| 1 | Terminal prompt: `> whoami` blinking | Brandon Leon-Flores. Senior at NJIT studying Information Technology. Web developer transitioning toward cloud and networking infrastructure. |
| 2 | ASCII-style "stack" graphic showing layers: `Frontend → Backend → OS → Network → Cloud` with current focus highlighted on bottom three | Currently working in the upper layers. Building toward the lower layers — the parts that hold everything else up. |
| 3 | Diagram: production server with SSH session, showing `cron`, `dns`, `permissions` annotations | Real production exposure: SSH access, DNS configuration, cron jobs, file permissions on live client servers. Not a tutorial — actual work. |
| 4 | Two cert badges side by side: AWS SAA + CCNA, with "in progress" status meters | The next two milestones: AWS Solutions Architect Associate and CCNA. Both before December 2026 graduation. |
| 5 | CTA card with two links | Two ways forward: read the career narrative, or see one project in detail. **[Why cloud →]** **[Projects →]** |

### 6.2 Why Cloud (`why-cloud.html`)

4 scroll steps. Sticky visual is a vertical timeline that fills/highlights as user scrolls.

| Step | Timeline state | Text content |
|---|---|---|
| 1 | Highlight: "2020 — Web dev start" | Started with HTML/CSS/PHP/WordPress. Building marketing sites for clients pays the bills, but it's the surface layer. |
| 2 | Highlight: "2023 — Systems coursework" | Networking (CS 356), Wireless Networks (IT 220), Operating Systems (CS 332), System Administration (IT 340). The classes that make production servers stop being a black box. |
| 3 | Highlight: "2025 — Production sysadmin" | At Industry Media, the work crossed over into real ops: SSH into client servers, fix the DNS, restart the cron, audit permissions. The systems coursework stopped being abstract. |
| 4 | Highlight: "2026 — Cloud transition" | AWS SAA + CCNA before graduation. Career target: cloud / networking / infrastructure roles. Web dev was the on-ramp, not the destination. |

Add a "← back to home" link at the top that uses a query param (`?returnTo=#step-N`) so navigation feels continuous, matching Williams' example.

### 6.3 Projects (`projects.html`)

Single project case study, 4 scroll steps. Sticky visual swaps between screenshots/diagrams of the project.

Project to feature: **Industry Media production sysadmin work** (honest framing — real production exposure, no overclaiming).

| Step | Sticky visual | Text content |
|---|---|---|
| 1 | Terminal screenshot mockup: `ssh user@client-server` | The work: maintain production WordPress sites for marketing agency clients. Not just code — the servers they run on. |
| 2 | Diagram: DNS records (A, CNAME, MX) | When a client's email broke, the fix was in the MX records, not the codebase. Systems class made this five-minute problem instead of a four-hour one. |
| 3 | Code block: cron job setup | Scheduled backups via cron, scoped file permissions correctly so the web user couldn't touch what it shouldn't. Small things, real consequences. |
| 4 | Summary card: "What this taught me" | Production servers don't care about your tutorials. The systems coursework + this job is what's pushing me toward cloud — same skills, larger scale. |

## 7. File Structure

```
scrollytelling-demo/
├── README.md           # live link + summary
├── SPEC.md             # this file
├── index.html          # home page
├── why-cloud.html      # narrative page
├── projects.html       # case study page
├── assets/
│   ├── styles.css      # shared styles + tokens
│   └── scrolly.js      # IntersectionObserver logic, shared across pages
└── .nojekyll           # GitHub Pages: skip Jekyll processing
```

No build step. No npm. No framework. Open `index.html` in a browser, it works.

## 8. Acceptance Criteria

The project is "done" when:

- [ ] All 3 pages exist and link to each other coherently.
- [ ] Each page has working scroll-triggered state changes on the sticky visual.
- [ ] Cross-links carry a `?returnTo=#step-N` param and the destination page scrolls to that step on load.
- [ ] All 3 pages render correctly on mobile (steps stack vertically below the visual, no horizontal scroll).
- [ ] `prefers-reduced-motion: reduce` disables transitions.
- [ ] The site deploys to GitHub Pages with no build step.
- [ ] README has the live URL at the top.
- [ ] Nothing in the content overclaims AWS depth, security depth, or fabricates projects. Honest student-transitioning-to-cloud framing throughout.

## 9. Non-Goals

- This is not a redesign of `bleonflores1.com`. It's a 3-page experiment.
- Not adding analytics, contact forms, blog, or CMS.
- Not using React, Next.js, GSAP, or any JS framework. Vanilla only.
- Not pixel-perfect copy of Williams' `bseai_degree` site — this is *my* application of the technique, not a clone.

## 10. The Process This Spec Represents

Williams' point: senior engineers spend a meaningful chunk of their week writing exactly this kind of document — scope, constraints, acceptance criteria — *before* writing code. With AI, that document becomes the prompt. The clearer the spec, the better the AI output, the less rework.

This spec was written first. The HTML/CSS/JS in this repo is the implementation of this spec, not the other way around.
