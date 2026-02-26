---
title: "Internal Chat App"
tagline: "Building Their Own WhatsApp, in 90 Days"
slug: "internal-chat-app"
order: 2
filters: ["products"]
tags: ["Flutter", "React", "Firebase", "Real-time", "Enterprise"]
link: "https://treonstudio.com"
aspect: 1.0
preview: "/work/livekit/livekit_preview.png"
images:
  - "/work/livekit/livekit_1.png"
  - "/work/livekit/livekit_2.png"
  - "/work/livekit/livekit_3.png"
  - "/work/livekit/livekit_4.png"
description: "A fully-owned enterprise communication platform built in 90 days — 1-on-1 chat, group chat, file sharing, push notifications, and role-based access across Android and web."
hidden: false
---

### Why Not Just Use WhatsApp?

That question comes up immediately whenever someone hears this brief.

The answer is simple but carries real weight: data ownership and control. For an enterprise company with hundreds of employees, letting internal communication flow through a third-party platform isn't just a privacy concern — it's about compliance, access control, and full ownership of every conversation that happens inside the organization.

They didn't want to rent a house. They wanted to build their own.

---

### The Brief

Three months. Two platforms: web and mobile. Full-scope features — 1-on-1 chat, group chat, file sharing, push notifications, role-based access. Agreed stack: Flutter for Android, React for web, Firebase as the backbone.

On paper, aggressive. On the ground, a marathon sprint.

---

### The Challenge

Building a chat platform isn't about beautiful UI or a clean database schema. Our biggest enemy on this project had a name: latency.

When hundreds of users send messages simultaneously, open active group chats, or receive mass push notifications — every millisecond of delay is felt. And in a chat application, feeling slow is the same as losing trust.

Managing real-time sync between Flutter on Android and React on web — both reading and writing to Firebase simultaneously, with consistency maintained across both — this wasn't a problem we could solve with generic patterns. We had to go deep into architecture: how data flows, when to cache, where the hidden bottlenecks lived.

---

### The Process

We divided the team clearly by platform: Flutter owned the native Android experience — familiar, responsive, fast. React owned the web client — performant even on unstable connections. Both spoke to Firebase, but we architected how each platform listened and wrote data differently, tuned to the strengths and limits of each.

Latency issues weren't something we waited to encounter in production. We simulated user load from the start — deliberately creating worst-case conditions in our test environment. Hundreds of concurrent users, fluctuating connections, bursts of mass notifications. Every bottleneck we found became a ticket that had to be closed before the next phase could open.

Three months ran with friction. But every friction point had a resolution path mapped before we hit it.

---

### The Outcome

The application launched on time. Hundreds of employees now communicate on a platform fully owned and controlled by the company — with data that never leaves their ecosystem.

1-on-1 and group chat runs smoothly at scale. File sharing is in active daily use. Push notifications fire reliably on both platforms. And most critically: the company holds full control — who can access what, when, and how.

| Feature | Status |
|---|---|
| 1-on-1 Chat | Live |
| Group Chat | Live |
| File Sharing | Live |
| Push Notifications (Android + Web) | Live |
| Role-Based Access Control | Live |
| Data stays in-house | Fully owned |

But the biggest lesson from this project wasn't about code, Firebase, or latency optimization. It was this: trust is built through small consistencies. Every message delivered in milliseconds. Every notification arriving on time. Every file downloaded without a hitch. Each one a small proof that stacks into something larger.

And that's what made them stop asking, "why didn't we just use WhatsApp?"
