# COBRA deck — facts to confirm before the next pass

The deck at `public/my-work/cobra-eligibility/index.html` was written from Ty's
spoken answer to "what's the most interesting thing you've created recently?"
and from public COBRA domain knowledge. Nothing in it was invented: where a
specific number or mechanism would have made a slide land harder but wasn't
known, the slide was written to work without it.

This file lists those gaps. Each one is a place the deck would get stronger if
Ty fills it in. Until he does, nothing here ships in the HTML.

## Confidentiality boundary the deck already holds to

- Client named as **HoggWood Health** only. Never the real name.
- No code, schema, field names, table names, or business rules from the private
  repository. No screenshots of the client product.
- No record counts, user counts, or dates tied to client releases.
- COBRA's statutory structure is described as public law, which it is. The
  client's particular rules are not described at all.

Anything added from the list below has to clear the same bar.

## Gaps, by slide

**T11 (division of labor).** The four-tool table describes what each tool is
responsible for. It does not say how much of each there is. Theorem counts,
number of TLA+ properties, number of discharged SMT obligations would all
strengthen it, the way the Sagittarius "25 axiom-free Lean theorems" figure does
on the resume. Are any of those numbers shareable?

**T12 (Lean).** The deck claims totality of the model and says proofs are
kernel-checked with no unproven steps. Worth confirming: is the eligibility model
fully `sorry`-free today, or are there open obligations? If there are, the slide
should say so, the way `memory/interview-artifacts.md` handles Sagittarius.

**T13 (TLA+).** The deck names three safety properties: orphaned unreachable,
misattributed unreachable, and no silent disappearance. Are those the actual
property names and the actual set, or is the real set larger? Also: what model
sizes were checked? The slide says the results are bounded without saying by
what, which is honest but vague.

**T14 (Z3 and cvc5).** The deck says both solvers run the same obligations and
that disagreement between them is treated as a finding. Confirm that is how it
actually works. If they're split by obligation type instead, the slide is wrong
and needs rewriting.

**T16 (the matrix).** The SVG is explicitly captioned as illustrative. What are
the real axes, and are they describable without leaking client rules? If the
answer is no, the caption stays and the figure stays abstract.

**T18 (the boundary).** This is the most important one. The slide says the bridge
from verified model to deployed C# is: model written first, implementation built
to match annotation by annotation, formal obligations turned into tests against
real code, refutation done against the spec before implementation. That is the
deck's account of the mechanism and it needs to be exactly right, because it is
the claim a formal-methods interviewer will push on hardest. Correct anything
that is off.

**T21 to T22 (the AI development life cycle).** The five layers are described as
fact modeling, claim decomposition, refutation, proof obligation, and
realization. That maps onto Orbital Shifting's seven-stage pipeline but is not
identical to it. Is the eligibility work running the actual orbital pipeline, or
a variant? The deck currently implies lineage without claiming they are the same
thing, which is safe but could be more precise.

**A "what I'd do differently" slide is missing on purpose.** A draft of it
existed and was cut, because both regrets in it were inferred from the shape of
the work rather than from anything Ty said, and a slide about his own judgment is
the worst place to guess. It is a good slide to have. Tell me the real ones and
it goes back in between the compliance slide and the closing principle slide.
