---
title: "Sozo Skin Clinic"
tagline: "When WordPress Isn't Enough — So You Build What's Missing"
slug: "sozo-skin-clinic"
order: 3
filters: ["products"]
tags: ["WordPress", "React", "Google Maps API", "Custom Plugin"]
link: "https://sozoskinclinic.com"
aspect: 1.0
preview: "/work/supabase-homepage/preview.png"
images:
  - "/work/supabase-homepage/supabase01.png"
  - "/work/supabase-homepage/supabase02.png"
  - "/work/supabase-homepage/supabase03.png"
  - "/work/high-roads/highroads_01.jpg"
  - "/work/high-roads/highroads_02.jpg"
  - "/work/high-roads/highroads_03.jpg"
description: "A content-rich WordPress website for a multi-branch aesthetic clinic — with a custom React plugin for in-page treatment search and interactive Google Maps integration, delivered in 30 days."
hidden: false
---

### The Context

Sozo Skin Clinic isn't a single-service clinic. It's a full-spectrum aesthetic destination — hair treatment, hair removal, acne & scar solutions, facial and laser procedures, cosmetic injectables, slimming therapies. The treatment menu alone spans over 15 distinct service categories, spread across multiple clinic locations.

Their digital presence needed to carry the same weight as the clinic itself: trustworthy, navigable, and fast. A visitor landing on the website should feel like they're already being guided — not left to scroll through a wall of content wondering where to start.

---

### The Brief

The ask was to build a company profile website. But "company profile" here was a generous simplification. What was really needed was a content-rich, feature-complete digital brochure that could:

- Present dozens of treatments with clarity and structure
- Let users find what they're looking for instantly — without leaving the page
- Show clinic locations on an interactive map
- All of this — delivered in **30 days.**

The stack was decided upfront: WordPress, for content management ease. The design was already prepared — handed to us as a finished visual reference. On paper, that should have made things faster.

It didn't.

---

### The Challenge

There were two distinct layers of challenge on this project, and both arrived at the same time.

**The first was the design itself.** Having a pre-made design sounds like a head start — the decisions are made, the aesthetic is locked. In practice, it added a different kind of pressure: the obligation of faithfulness. Every spacing decision, every color gradient, every hover state had to match the intent of a design that was built in a tool with no WordPress limitations in mind. WordPress — with its block editor, theme constraints, and plugin rendering — doesn't naturally bend to arbitrary design specifications. Making it do so required deliberate, methodical theme work and a willingness to override the platform's defaults at every turn.

**The second was the feature gap.** Once the full requirements were laid out — an in-page search that filters treatment content without reloading, and an interactive multi-location map that felt native to the brand — the plugin ecosystem offered nothing close enough. The available solutions were either too heavy, too generic, or too rigid to match the specificity of what the design demanded.

The options were simple: compromise the vision, or build what's missing.

We built what was missing.

The real weight of the project was holding both challenges simultaneously — pixel-perfect design implementation and custom feature development — inside a 30-day window where neither could wait for the other.

---

### The Process

We split the work into three parallel tracks from day one.

**Track 1 — Design Implementation.** The design file became the north star and the first source of friction. Every section — the hero, treatment cards, promotional banners, footer — had to be translated from a static visual into a living WordPress environment. We approached this methodically: breaking the design into components, identifying where WordPress theme defaults would conflict, and resolving each conflict at the child theme level rather than through shortcuts that would cause maintenance debt. The result had to look like the design — not *inspired by* it.

**Track 2 — Content & Theme Architecture.** Beyond matching the design, the theme structure had to be sustainable. Every treatment page was templated so the clinic's team could add new services without touching a single line of code.

**Track 3 — Custom React Plugin Development.** This was the engineering core of the project.

For the **in-page search**, we built a SPA-style filtering system embedded directly into WordPress. Rather than triggering a page reload each time a user searches or filters, the component dynamically renders results in real time from a pre-indexed content layer. The experience feels native — the page breathes, the results appear, no flash, no reload.

For the **clinic location map**, we built a custom React component integrated with the Google Maps API. Each pin is tied to clinic data — address, operating hours, contact — with a clean info panel that activates on selection. Multiple branches, one coherent map experience.

Both components were packaged as a custom WordPress plugin, registering their own blocks and interacting cleanly with the existing theme layer.

---

### The Outcome

The website went live within the 30-day window.

Visitors can now browse over 15 treatment categories, search across all content without leaving the page, and locate the nearest Sozo branch — all from a single, fast, cohesive experience. The clinic's team manages all content updates directly from the WordPress dashboard with no technical dependency.

What made this project meaningful wasn't just the delivery speed. It was the proof that when the right tools don't exist, the right team builds them. The custom plugin became a reusable foundation — a pattern we've since applied to other WordPress projects requiring the same level of interactivity.

| Feature | Approach |
|---|---|
| Design implementation | Pixel-faithful translation from design file to WordPress |
| In-page treatment search | Custom React SPA component |
| Multi-location interactive map | React + Google Maps API |
| Content management | WordPress CMS — editor-friendly |
| Plugin architecture | Custom WordPress plugin (React blocks) |
| Timeline | Delivered in 30 days |

What made this project meaningful wasn't just the delivery speed. It was the proof that two hard things can be done at once — and that fidelity to a design is not a given, it's an earned outcome. The custom plugin became a reusable foundation we've since applied to other WordPress projects requiring the same level of interactivity.
