# COBRA deck — scope decisions

Rules for `public/my-work/cobra-eligibility/index.html`. These are decisions, not gaps.
Read this before editing that deck.

## The deck is evergreen on purpose

It carries no theorem counts, model-check bounds, property names, or tool versions. Ty
decided against that level of detail (2026-09-16): it's too granular and it rots, which would
turn the deck into a maintenance burden every time the client work moves.

**Their absence is a design choice, not an incomplete draft.** Do not "finish" the deck by
adding numbers to it.

## Confidentiality boundary

- Client named as **HoggWood Health** only. Never the real name.
- No code, schema, field names, table names, or business rules from the private repository.
  No screenshots of the client product.
- COBRA's statutory structure is public law and fine to describe. The client's particular
  rules are not described at all.
- No record counts, user counts, or dates tied to client releases.

## Methodology: structure, never callsigns

The deck describes the nine phases and three rigor tiers **by what they do**. It must never
print the internal phase or tier names. The full list and the reasoning behind this rule live
in `plaintext_resume/memory/aidlc.md`; keep the names there.

Use Ty's own phrase outbound: "an AI development life cycle of my own design."

## Lineage: the wrong-spec problem, not Orbital Shifting

Orbital Shifting is superseded and is **not** what's under the hood here. The footer on every
slide links the wrong-spec slides, matching the kimmy deck. Orbital appears once on the
closing slide, as an earlier project among several. Don't restore it as the deck's foundation.

An earlier draft gave Prolog its own slide on an Orbital-era assumption. Ty cut it. Prolog is
not a phase in the life cycle. Don't reintroduce it.

## One standing offer

A "what I'd do differently" slide was drafted and cut, because the regrets in it were inferred
rather than Ty's own. It goes back in between the tier-justification slide and the closing
principle slide whenever he supplies the real ones.
