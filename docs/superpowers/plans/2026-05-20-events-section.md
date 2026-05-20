# Events Section Implementation Plan

**Goal:** Build a full-featured `/events` page with all 27 events from the 2026 Dominion Faith Annual Calendar — asymmetric bento grid, category filter tabs, animated calendar date flip, hover register button, load more with stagger, and Google Calendar API integration.

**Architecture:** `lib/events.ts` holds all 27 static events + Google Calendar API fetch (falls back to static). `app/events/page.tsx` is a server component that passes events to `EventGrid` (client). `EventCard` handles hover animations and date flip via Framer Motion + CSS keyframes.

---

## File Map

| File | Action |
|---|---|
| `styles/dominion-faith-design-system.css` | Add 6 event category color tokens |
| `app/globals.css` | Add `.cal-flip` keyframe + `.hide-scrollbar` util |
| `types/event.ts` | `ChurchEvent` interface + `EventCategory` + `CATEGORY_CONFIG` |
| `lib/events.ts` | All 27 events + Google Calendar API integration |
| `components/EventCard.tsx` | Card with gradient header, date flip, hover Register |
| `components/EventGrid.tsx` | Filter tabs + bento grid + load more |
| `app/events/page.tsx` | Server component page shell |
| `__tests__/EventCard.test.tsx` | Behavioural tests |
| `__tests__/EventGrid.test.tsx` | Behavioural tests |

---

## 2026 Calendar Events (all 27)

```
1.  2026-01-11  Services  Anionting/Communion Service
2.  2026-01-12→02-01 Special  21 Days Fasting and Prayers
3.  2026-01-16  Men      Dominion Army Retreat
4.  2026-01-30  Services  Dominion General Vigil
5.  2026-02-14  Special  Dominion Business Summit
6.  2026-03-21  Special  Dominion Deacons & Deconesses' Summit
7.  2026-04-04  Special  Dominion Elite Business Summit
8.  2026-04-05  Services  Easter Sunday with Communion  [FEATURED]
9.  2026-04-13→19 Special  Dominion One Week Fasting and Prayers
10. 2026-04-21→26 Special  Dominion Annual Convention/Anniversary  [FEATURED]
11. 2026-05-16  Women    Dominion Women's Summit  [FEATURED]
12. 2026-05-30  Children  Children of Great Destiny's Day  [FEATURED]
13. 2026-06-13  Men      Dominion Men's Summit  [FEATURED]
14. 2026-06-26  Services  Dominion General Vigil
15. 2026-06-28  Services  Special Anionting/Communion Service
16. 2026-07-25  Special  Dominion Ministers' Summit
17. 2026-08-09  Services  Dominion Love Feast  [FEATURED]
18. 2026-08-15  Women    Dominion Female Ministers' Summit
19. 2026-08-28  Services  Dominion General Vigil
20. 2026-09-11  Men      Dominion Army Retreat (Sept)
21. 2026-09-26  Youth    Dominion Students' Summit
22. 2026-10-03  Youth    Dominion Teens' Summit
23. 2026-10-24  Youth    Dominion Youths/Singles' Summit  [FEATURED]
24. 2026-11-14  Special  Dominion Couples' Dinner
25. 2026-11-21  Special  Dominion Elite Business (Nov)
26. 2026-12-13  Services  Dominion Annual Thanksgiving  [FEATURED]
27. 2026-12-17→19 Special  Dominion Annual Retreat  [FEATURED]
```

---

## Category Colors

```
services → cyan    #06b6d4
youth    → blue    #2A2FAA  (--color-primary)
women    → orange  #F9A916  (--color-live)
men      → red     #F61F27  (--color-give)
children → emerald #10b981
special  → purple  #a855f7
```
