MASTER GOOGLE AI STUDIO PROMPT — CLAIMTRACE

You are a senior product designer, data storyteller, UX engineer and information designer.
Build a responsive interactive infographic website called CLAIMTRACE.

PROJECT:
ClaimTrace investigates health-insurance claims by following money from hospital bill to insurer settlement and policyholder out-of-pocket cost.

CORE NARRATIVE:
“₹5 LAKH BILL. ₹3.2 LAKH INSURER PAYMENT. WHERE DID THE OTHER ₹1.8 LAKH GO?”
This is an illustrative synthetic investigation. Never present it as a universal or real observed claim.

IMPORTANT DATA RULE:
The supplied project folder contains:
1) REAL_PUBLIC_DATA — public, sourced indicators.
2) SYNTHETIC_INTERACTIVE_DATA — invented records for interaction/demo.
3) KAGGLE_REFERENCE — the user's original Kaggle states dataset and a cleaned reference copy.
Never merge these categories without displaying their status.
Every real statistic must show source and period.
Every synthetic visualization must show “Synthetic data — visualization example”.

DESIGN:
Use investigative editorial data storytelling, not a conventional insurance dashboard.
Dark structured typography, warm/light neutral canvas, restrained semantic accent colours.
Large financial numerals.
Strong hierarchy.
Smooth scroll-driven storytelling.
Subtle motion.
Accessible contrast.
Responsive desktop/tablet/mobile.

HOME EXPERIENCE:
Start with a ₹5,00,000 hospital bill.
Animate the amount through:
Hospital bill → eligible/admissible amount → deductions → insurer payment → policyholder out-of-pocket.
Allow clicking each deduction to reveal:
WHAT IT IS
WHY IT APPLIES
HOW IT CHANGES THE PAYOUT
WHETHER THE NUMBER IS SYNTHETIC OR SOURCE-DERIVED

PAGES:
1. Start Here
2. Decode Your Policy
3. Follow Every Rupee
4. Follow the Claim
5. Meet the Players
6. Zoom Out
7. Find the Pattern
8. Human Side
9. AI Claim Investigator
10. Sources & Methodology

VISUALIZATIONS:
- Sankey flow
- Waterfall chart
- Stacked deduction bars
- Claim timeline
- KPI cards
- India/state map where applicable
- Cohort comparison
- Outlier scatter
- Qualitative theme matrix

FILTERS:
Year/period
Claim status
Deduction type
Claim size
Policy type
State where available
Real vs synthetic

AI CLAIM INVESTIGATOR:
Create a controlled demo using only synthetic claims.
User chooses a claim.
AI explains:
- total bill
- admissible amount
- each deduction
- insurer amount
- policyholder amount
- processing stages
- uncertainty
- what additional information would be required for a real determination

Do NOT make legal, medical, or financial determinations from incomplete data.
Do NOT imply a synthetic example represents the insurance industry.

KAGGLE DATA:
Use the states.csv reference structure to inspire a geographic/coverage exploration, but clearly label that dataset as historical Kaggle reference data. Do not silently update it or present its 2010–2016 values as current.

SOURCE PAGE:
Create source cards with:
Source
Year
Indicator
URL
Data status
Last checked
Method/notes

UX:
Use progressive disclosure.
Never show all data at once.
Use “Explore”, “Why?”, “Where did it go?”, “Zoom out” as interaction language.
Include a persistent source/status indicator.
Include a methodology drawer.

TECHNICAL:
Use a component-based architecture.
Use CSV/JSON data files from the supplied package.
Create reusable chart components.
Handle missing values.
Use semantic HTML and accessible controls.
Use keyboard navigation.
Use responsive layouts.
Keep data and UI logic separated.
Do not hard-code statistics when they can be read from the data files.

OUTPUT:
Produce a polished, portfolio-quality interactive website.
The website should feel like a visual investigation into a claim, not an administrative insurance portal.
