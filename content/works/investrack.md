---
title: "Investrack"
tagline: "Building the Command Center for Construction Teams"
slug: "investrack"
order: 17
filters: ["products"]
tags: ["ERP", "Web App", "Mobile App", "Construction", "Field Operations"]
link: "https://treonstudio.com"
aspect: 1.0
preview: "/work/database-build/database-build-preview.png"
images:
  - "/work/database-build/database-build.png"
  - "/work/supabase-lw12/supabase01.png"
  - "/work/supabase-lw12/supabase02.png"
  - "/work/supabase-lw12/supabase03.png"
description: "An ERP system purpose-built for construction management — reporting, record management, and real-time project-linked communication across web and mobile for field and office teams."
hidden: false
---

### The Origin

Most software is built to solve someone else's problem. Investrack was built because we saw the problem ourselves — up close, repeatedly, across multiple projects in the construction and field operations sector.

Construction is one of the most coordination-intensive industries on earth. At any given moment, a project manager is juggling material deliveries, subcontractor schedules, daily progress reports, budget reconciliation, and a dozen conversations happening simultaneously across WhatsApp groups, spreadsheets, and handwritten notes on clipboards. Nothing talks to anything else. Information lives in silos. And when something goes wrong — and something always goes wrong — finding out what happened, when, and who knew is a detective exercise, not a dashboard view.

We built Investrack to change that.

---

### The Product Vision

Investrack is an ERP system purpose-built for construction management — not a generic enterprise platform retrofitted for the sector, but a product designed from the ground up around how construction teams actually work.

Three pillars define what Investrack does:

**Reporting** — structured daily, weekly, and milestone reports that field teams can submit from the site, and managers can review from anywhere. No email chains. No lost attachments. One place, one record.

**Record Management** — every material, every cost line, every subcontractor agreement, every document — organized, searchable, and traceable from project initiation to handover.

**Real-Time Communication** — built-in messaging tied directly to projects, tasks, and reports. Not a separate app. Not a WhatsApp group. Conversations that live next to the work they're about.

---

### The Challenge

Building a product for construction teams means designing for two very different kinds of users in the same system.

In the office, a project manager needs deep visibility — budget vs. actuals, progress timelines, document trails, team performance. They need to see the full picture without hunting for it.

On the field, a site supervisor needs something that works on a phone, often with a weak signal, often with dirty hands, often in the middle of something else. They need to file a report or flag an issue in under two minutes or they won't do it at all.

These two users have opposite needs, and both have to be served excellently by the same product. A system that works beautifully for the project manager but frustrates the site supervisor will have incomplete, unreliable data — which defeats the entire purpose.

The real-time communication layer added another layer of complexity: communications had to be contextual. A message about a concrete pour issue should live next to that day's progress report, not in a generic inbox. Connecting conversations to records, reports, and tasks — without making the system feel heavy — required architectural decisions that ran through the entire product.

---

### The Process

We started by spending time with the people Investrack would need to serve. Conversations with project managers, site supervisors, and contractors revealed a consistent pattern: the tools they use aren't failing because the tools are bad — they're failing because no tool was ever built for them.

From that research, we mapped the two core user journeys — office and field — and designed the product to serve each with the appropriate level of depth and simplicity. The web application was built for breadth: full project visibility, reporting dashboards, document management, financial tracking. The mobile application was built for immediacy: fast report submission, quick issue flagging, real-time notifications, offline-capable inputs.

The communication system was architected as a thread-based model tied to project entities — a conversation about a material delay lives on the material record, not in a general chat. This made information retrievable, not just received.

Each feature was validated iteratively — built, shown to real construction professionals, revised based on what felt wrong in their hands, and rebuilt until it felt right.

---

### The Outcome

Investrack is our answer to a sector that has been underserved by software for too long. A product that connects the field to the office in real time — not through improvised workarounds, but through a system designed specifically for that connection.

As a product we're actively bringing to construction companies and field operation teams, Investrack represents something larger than a client project: it's proof that deep understanding of an industry, combined with careful product design, can produce something that the market genuinely needs.

The development continues — every conversation with a new construction team reveals another pattern, another friction point, another opportunity to make the product more useful.

| Feature | Platform |
|---|---|
| Project reporting (daily, weekly, milestone) | Web + Mobile |
| Record & document management | Web |
| Budget & cost tracking | Web |
| Real-time project-linked communication | Web + Mobile |
| Field report submission | Mobile (offline-capable) |
| Issue flagging & escalation | Mobile + Web |
