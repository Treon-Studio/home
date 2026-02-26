---
title: "PLN UIP3BB"
tagline: "Making Surveys Feel Human — Enterprise Feedback at Scale"
slug: "pln-uip3bb"
order: 5
filters: ["products"]
tags: ["Next.js", "NocoDB", "Web App", "Enterprise", "Analytics"]
link: "https://treonstudio.com"
aspect: 1.0
preview: "/work/elizabeths-flowers/preview.png"
images:
  - "/work/elizabeths-flowers/elizabethsflowers_01.png"
  - "/work/elizabeths-flowers/elizabethsflowers_02.png"
  - "/work/elizabeths-flowers/elizabethsflowers_03.png"
  - "/work/elizabeths-flowers/elizabethsflowers_04.png"
  - "/work/elizabeths-flowers/elizabethsflowers_05.png"
description: "An internal employee satisfaction survey platform for Indonesia's state electricity enterprise — intuitive form UX, real-time analytics dashboard, and NocoDB backend, delivered in 30 days."
hidden: false
---

### The Context

PLN UIP3BB — one of Indonesia's largest state-owned electricity enterprises — needed a way to measure what was harder to measure than kilowatts: how their people feel about internal services.

Employee satisfaction surveys at enterprise scale are deceptively complex. It's not just about asking the right questions. It's about making sure people actually answer them — honestly, completely, and without friction. A survey that's difficult to access, confusing to fill out, or slow to submit doesn't just fail to collect data. It sends a message that the data doesn't really matter.

That was the problem we were hired to solve.

---

### The Brief

Build an internal web survey platform for PLN UIP3BB's employee satisfaction program. The platform needed to:

- Be accessible easily — across devices, with minimal technical barrier for any employee level
- Make the survey-filling experience intuitive and fast
- Generate statistics and analytics from responses in a way that was readable and actionable for management
- Delivered in **30 days.**

The stack was chosen with purpose: Next.js for a fast, server-rendered frontend with smooth UX, and NocoDB as the backend database layer — offering structured data storage with a visual management interface that the PLN team could operate without developer dependency.

---

### The Challenge

The challenge here wasn't algorithmic. It was human.

Enterprise surveys have a well-documented problem: abandonment. Employees open them, get three questions in, and close the tab. The reasons are always the same — too long, too confusing, too slow, or simply: it doesn't feel like it was built for them.

Building for PLN meant building for a diverse workforce — different roles, different devices, different levels of tech comfort. A junior field technician and a senior manager might both need to fill out the same form. The experience had to work for both, without condescension and without friction.

On the analytics side, the data collected needed to be more than a spreadsheet export. Management needed to see trends — across departments, over time, across satisfaction dimensions — without needing a data analyst to interpret a raw table.

The 30-day timeline compressed everything: design decisions, data architecture, form logic, and analytics views all had to move simultaneously.

---

### The Process

We designed the survey experience before we wrote a single line of code. Every interaction was mapped: how a user enters, how they move through questions, how they submit, and what they see when they're done. Friction points were identified and eliminated at the design stage — not discovered later in QA.

The form itself was built with progressive disclosure in mind — only showing what's needed at each step, with a clear progress indicator so respondents always know where they are and how much is left. On mobile, touch targets were sized deliberately. On desktop, keyboard navigation was smooth. The experience felt the same regardless of device.

NocoDB handled the data layer — each survey response mapped to a structured schema, with relationships between respondent metadata, question responses, and department identifiers. This made it possible to slice analytics by any dimension management cared about.

The analytics dashboard was built in Next.js as a separate authenticated view — bar charts for satisfaction scores by category, trend lines across submission periods, and department-level breakdowns with exportable summaries. Not a data dump. A decision-support interface.

---

### The Outcome

The platform launched within the 30-day timeline and was deployed for active use across PLN UIP3BB's employee base.

Survey access required no technical setup from respondents — a link, a device, a few minutes. Completion rates improved from what traditional form-based surveys typically produce in enterprise settings, driven by a filling experience that respected the employee's time and attention.

Management gained a live analytics view that didn't require any data wrangling — satisfaction trends visible at a glance, filterable by department, exportable when needed for reporting.

| Feature | Approach |
|---|---|
| Survey UX | Progressive form — step-by-step, progress-aware |
| Accessibility | Responsive across all devices, minimal technical barrier |
| Data backend | NocoDB — structured, visual, team-manageable |
| Analytics | Custom dashboard — charts, filters, trend views |
| Timeline | Delivered in 30 days |
