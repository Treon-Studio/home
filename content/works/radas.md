---
title: "Radas"
tagline: "One Tool to Rule the Dev Floor"
slug: "radas"
order: 1
filters: ["products"]
tags: ["CLI", "Web Dashboard", "Internal Tooling", "Developer Experience"]
link: "https://treonstudio.com"
aspect: 1.2
preview: "/work/sketchbook/sketchbook_preview.png"
images:
  - "/work/sketchbook/sketchbook_1.png"
  - "/work/sketchbook/sketchbook_2.png"
  - "/work/sketchbook/sketchbook_2a.png"
  - "/work/sketchbook/sketchbook_3.png"
description: "A unified CLI + web dashboard that replaced five scattered scripts with one tool — cutting developer onboarding from days to hours and accelerating platform adoption by 30%."
hidden: false
---

### The Problem Nobody Talked About, But Everyone Felt

On the surface, the engineering team was running fine. Sprints were moving, deployments were shipping, products were delivered. But if you sat beside a developer and watched closely — you'd notice something quietly wrong.

Three terminals open at once. Bash scripts scattered in local folders, each named differently by each person. Environment variables copy-pasted from Notion, Slack, personal notes. And every time a new developer joined the team, the entire ritual started over — with half-finished guides and a frustration that had become routine.

Five engineers. Five different ways of doing the same thing.

This wasn't a technical problem. It was a toil problem — repetitive, low-value work that drained energy without producing anything meaningful.

---

### The Brief

The initial question was simple, but heavy in execution:

> "How can a developer's full daily workflow — from sitting down in the morning to the last push at night — be done from a single place? And easy enough for someone who just joined the team?"

No lengthy spec document. No thick requirement sheets. Just one vision: one tool, all workflows, zero friction.

---

### The Challenge

Building a CLI isn't hard. Building a CLI that feels right — fast responses, intuitive commands, error messages that actually help — that's the real craft.

The true challenge emerged when we decided Radas shouldn't be CLI-only. It needed a web dashboard connected in real-time — so developers could monitor running app status, check the latest releases, and manage secrets from anywhere, including the browser. Two interfaces, one source of truth, both wired into the VPS that powered our infrastructure.

Keeping the CLI and dashboard in sync, while staying lightweight and adding no friction to the user — that was the thread we couldn't afford to let snap.

---

### The Process

We started with observation, not assumptions. For several days, we sat alongside developers and mapped: what do they repeat? where do they pause and search for answers? when are they most frustrated?

From that, the architecture of Radas was born: a CLI as the primary entry point, with a web dashboard as the monitoring window. Every action through the CLI — running an app, triggering a release, fetching secrets — reflected in the dashboard in real time.

We built in small iterations, tested on the internal team itself, and refined based on what felt awkward. One guiding principle throughout: if a junior developer can't use this within the first 15 minutes, something is still wrong.

---

### The Outcome

Radas is now the daily working tool for the entire engineering team.

Developer onboarding that once stretched over days now runs smoothly from day one. The release process — previously a series of manual steps — is now streamlined end-to-end. And most measurably: platform adoption accelerated 30% faster compared to before Radas existed.

But the best metric isn't on a spreadsheet. It's when a new developer joins the team, and on their first day they spin up a local environment, check VPS status, and trigger a release — alone, without interrupting anyone.

That's what good developer experience actually looks like.

| Before Radas | After Radas |
|---|---|
| 5 separate scripts per engineer | Single unified CLI entry point |
| Manual release steps | Streamlined release flow |
| Days to onboard a new dev | Smooth first-day setup |
| Scattered secrets management | Centralized, dashboard-controlled |
| Platform adoption baseline | +30% faster early adoption |
