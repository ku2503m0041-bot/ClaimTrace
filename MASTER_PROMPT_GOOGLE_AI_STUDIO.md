# CLAIMTRACE — MASTER PROMPT FOR GOOGLE AI STUDIO

## Project
Build a polished, interactive data-storytelling website called **ClaimTrace** using the supplied health-insurance CSV and JSON datasets.

The website is not a generic insurance dashboard. It should feel like a **digital editorial/data story** that helps an ordinary user understand how health-insurance claims, bills, deductions, journeys, anomalies and policy context connect.

Use the supplied **JSON files as the primary web data source**. CSV files are retained for reference, validation and analysis.

---

# 1. PRIMARY GOAL

Turn the supplied datasets into an intuitive visual story.

The user should be able to enter the website without knowing:
- insurance terminology
- data analysis
- claim-processing systems
- how hospital bills are structured

The interface must explain the story progressively.

Do NOT overwhelm the user with a dashboard full of charts.

Every major visual should answer a simple question.

Examples:
- What is a claim?
- What happens to a claim?
- Where does the money go?
- What gets deducted?
- Where does friction occur?
- Which patterns appear in the data?
- What anomalies can we observe?
- What does the wider Indian health-insurance context tell us?

Only use questions and findings that are actually supported by the supplied data.

---

# 2. IMPORTANT DATA RULES

First inspect all supplied JSON files and build a data map.

Likely data categories include:
- claim records
- claim journey
- hospital bill components
- claim deductions
- anomaly patterns
- government health schemes
- Indian health-insurance indicators
- state/reference data
- policy glossary
- source register
- data dictionary
- qualitative coding
- policyholder questions
- claim pain points

Do NOT assume column names, values, sample sizes or findings.

Before designing the final visualizations:
1. Read every JSON file.
2. Identify its schema.
3. Count records.
4. Identify important fields.
5. Check missing values.
6. Check duplicates.
7. Identify relationships between datasets.
8. Distinguish synthetic data from external/reference data.
9. Identify statistically meaningful patterns.
10. Record limitations.

If two datasets cannot legitimately be joined, keep them separate.

Never invent statistics.

Never fabricate a claim, person, hospital, amount, policy or outcome.

If a dataset is synthetic, clearly label the relevant visualization or section as **synthetic / illustrative data**.

---

# 3. WEBSITE FORMAT

Build a **multi-page interactive website**.

Recommended structure:

### Page 01 — THE OPENING
Purpose: create curiosity.

Possible opening idea:

**“A hospital bill is only the beginning of the story.”**

Use one powerful number or data point only after verifying it from the data.

Visual:
- editorial composition
- large typography
- subtle data movement
- paper/document-inspired elements
- restrained motion

CTA:
**FOLLOW A CLAIM →**

---

### Page 02 — MEET THE DATA
Introduce the dataset in human language.

Explain:
- what the data contains
- number of records
- types of claims/data
- time or geographic coverage where available
- what is synthetic/reference/real
- what the website can and cannot conclude

Use animated counters and small visual data cards.

CTA:
**SEE HOW A CLAIM MOVES →**

---

### Page 03 — THE CLAIM JOURNEY
Visualize the claim lifecycle using the supplied claim journey data.

Possible stages:
- hospital/bill
- claim submission
- document/verification
- assessment
- deductions
- approval/rejection
- settlement

ONLY use stages that exist in the supplied data.

Interaction:
Click a stage.

Open a modal containing:
- stage name
- what happens here
- relevant data
- time/amount/records if available
- qualitative pain points if supported
- short plain-language explanation

Make the journey feel like a moving timeline rather than a conventional flowchart.

---

### Page 04 — FOLLOW THE MONEY
Use hospital bill and deduction data.

Show how a bill can change as it moves through the claim process.

Potential visualization:
A large animated financial flow:

HOSPITAL BILL
↓
ELIGIBLE AMOUNT
↓
DEDUCTIONS
↓
APPROVED / SETTLED AMOUNT

Use actual fields from the JSON.

Allow the user to click individual components.

Modal:
- component name
- amount
- percentage
- explanation
- supporting records

If the data does not contain one of these stages, do not create it artificially.

---

### Page 05 — WHAT GETS DEDUCTED?
Use claim deduction data.

Create an interactive breakdown.

Possible interaction:
Click a deduction category → isolate it visually → explain it.

Show:
- category
- count
- amount
- share
- examples if available

Do not imply that a deduction is unfair unless the source explicitly establishes that.

Use neutral language such as:
- “deducted”
- “not included in settlement”
- “appears in the records”
- “the dataset shows”

---

### Page 06 — THE PEOPLE BEHIND THE CLAIM
Connect quantitative data with qualitative research.

Use:
- policyholder questions
- qualitative coding
- claim pain points

Do not present invented quotations.

If there are actual participant quotes in the data, preserve their meaning and identify the research context appropriately.

Possible design:
A layered “case file” interface.

Click a pain point:
→ modal opens
→ qualitative evidence
→ related claim stage
→ related quantitative evidence if a legitimate connection exists

---

### Page 07 — WHEN THE DATA LOOKS UNUSUAL
Use anomaly_patterns data.

Explain anomalies in simple terms.

Possible interface:
**NORMAL PATTERN → OUTLIER → WHY IT STANDS OUT**

For every anomaly:
- show the relevant value/pattern
- explain why it is unusual according to the dataset
- avoid calling it fraud unless fraud is actually established by the source
- label detection logic if available

Use visual emphasis rather than alarming graphics.

---

### Page 08 — THE WIDER PICTURE
Use:
- government health schemes
- India health-insurance indicators
- state/reference datasets
- policy glossary

Purpose:
Move from individual claim → larger system.

Use maps/charts only where geographic or comparative data supports them.

Each external/contextual number must display a source.

Provide a “WHY THIS MATTERS” modal with plain-language interpretation.

---

### Page 09 — EXPLORE THE DATA
This is the optional exploratory area.

Give users controlled freedom.

Filters should be based ONLY on actual dataset fields.

Possible controls:
- claim type
- state
- amount range
- status
- hospital category
- deduction category
- anomaly type

When a filter changes:
- charts animate smoothly
- totals update
- affected elements highlight
- inactive elements fade

Provide a **RESET VIEW** button.

---

### Page 10 — WHAT THE DATA TELLS US
End with a concise synthesis.

Use 3–5 evidence-based findings.

For each finding:
1. statement
2. visual evidence
3. exact number
4. source/dataset
5. limitation or context when needed

Do not give unsupported recommendations.

End with:
**“Explore the sources and methodology →”**

---

### Page 11 — SOURCES & METHODOLOGY
Clearly document:
- dataset sources
- synthetic datasets
- external sources
- definitions
- methodology
- limitations
- data processing
- image credits
- music credits
- technology

Include a clear distinction between:
**DATA**
**RESEARCH**
**INTERPRETATION**

---

# 4. VISUAL DIRECTION — MODERN RETRO

The aesthetic should combine:

## RETRO
- insurance forms
- stamped documents
- receipts
- medical records
- filing systems
- archival diagrams
- editorial print layouts
- subtle paper/document textures
- typewriter/document-inspired secondary typography

## MODERN
- clean responsive grid
- large contemporary typography
- smooth transitions
- animated charts
- interactive cards
- hover states
- scroll-driven storytelling
- modal exploration
- dynamic data filtering

Do NOT make it look like:
- an old website
- a generic fintech dashboard
- a hospital website
- a cliché beige vintage poster

The retro character should come from:
**composition + typography + documentation language + visual texture**

The modern character should come from:
**interaction + motion + layout + responsiveness**

---

# 5. DESIGN LANGUAGE

Create a sophisticated visual system.

Use:
- strong hierarchy
- generous whitespace
- editorial layouts
- large numbers
- restrained accent colours
- thin data lines
- grids
- labels
- stamps
- document tabs
- index numbers

Suggested naming language:
- CASE FILE
- CLAIM ID
- RECORD
- EVIDENCE
- BREAKDOWN
- TRACE
- SOURCE
- NOTE

Keep the language formal, clear and human.

Avoid excessive jargon.

---

# 6. TYPOGRAPHY

Use a contemporary display typeface paired with a highly readable body font.

Possible direction:
- Display: editorial serif or distinctive modern grotesk
- Body/UI: clean sans-serif
- Data labels: monospaced font

Do not use too many typefaces.

Typography should make the interface feel like:
**an investigative editorial publication + digital archive + modern data interface.**

---

# 7. MOTION SYSTEM

Motion is important, but it must feel formal and purposeful.

Use:
- 200–400ms micro-interactions
- smooth easing
- staggered chart reveals
- number count-ups
- line drawing
- subtle parallax
- opacity transitions
- scale transitions
- morphing between chart states
- page-to-page continuity

Avoid:
- excessive bouncing
- flashy gaming effects
- unnecessary spinning
- distracting animations

### Page transition concept

When moving from one page to another, retain a visual element such as:
- claim ID
- line
- number
- document edge
- data point

Then transform it into the next page's primary visual.

This creates narrative continuity.

---

# 8. INTERACTIVE MODAL SYSTEM

Whenever a user clicks an insight, chart element or button that needs deeper information, use a modal/overlay.

Modal structure:

TITLE
SHORT TAKEAWAY

[DATA VISUAL]

KEY NUMBER

EXPLANATION

SOURCE / DATASET

LIMITATION (when relevant)

[CLOSE]

Modal animation:
- background gently darkens
- panel enters smoothly
- content staggers into view
- chart animates after the modal opens

Do not open a new browser page for small pieces of supporting information.

---

# 9. CHART DESIGN

Do not use charts simply because charts are available.

Select the visualization based on the question.

Examples:

Comparison → bar chart
Distribution → histogram/density
Journey → timeline
Flow → Sankey-like flow
Composition → stacked bar
Relationship → scatter plot
Geography → map
Individual case → case card
Change over stages → connected sequence

Every chart needs:
- title
- one-line takeaway
- clear units
- source
- accessible labels
- hover/focus state

Avoid 3D charts.

Avoid unnecessary pie charts.

---

# 10. DATA INTERACTION

Use the JSON files directly in the web application.

Create a clean data-loading layer.

Recommended structure:

```text
/data/
  claim_records_synthetic.json
  claim_journey_synthetic.json
  hospital_bill_components_synthetic.json
  claim_deductions_synthetic.json
  anomaly_patterns_synthetic.json
  government_health_schemes.json
  india_health_insurance_indicators.json
  states.json
  policy_glossary.json
  ...
```

Do not hard-code large datasets into components.

Create reusable functions for:
- loading JSON
- filtering
- aggregating
- calculating totals
- calculating percentages
- formatting currency
- formatting dates
- finding records
- generating chart datasets

---

# 11. CURRENCY & NUMBERS

Detect the currency represented by the dataset.

If Indian Rupees are used:
- display ₹
- use Indian number formatting where appropriate
- explain units clearly

Example:
₹1,25,000

Never change a source value merely to make the visualization look better.

---

# 12. ACCESSIBILITY

The website must be usable by a broad audience.

Include:
- sufficient contrast
- readable text
- keyboard navigation
- visible focus states
- semantic HTML
- aria labels
- reduced-motion support
- non-colour-only data communication
- accessible modal closing
- meaningful chart descriptions

If animation is disabled by the user's OS/browser, the story must still work.

---

# 13. RESPONSIVE DESIGN

Design for:
- desktop
- laptop
- tablet
- mobile

The storytelling hierarchy must remain intact on smaller screens.

Do not simply shrink desktop charts.

Recompose layouts for mobile.

---

# 14. IMAGE RESEARCH

Use imagery only where it strengthens the story.

Preferred sources:
- Wikimedia Commons
- Unsplash
- Pexels
- government/public-domain archives
- official institutional sources

For every externally sourced image, maintain:
- image URL
- source
- creator where available
- licence/usage information
- page where used

Do not download and redistribute copyrighted images without appropriate rights.

---

# 15. MUSIC / AUDIO

Music should be optional and never block the main experience.

Create a subtle audio control:

[▶ PLAY THE ATMOSPHERE]

When clicked, use a legitimate online/authorized player or embeddable source where technically and legally permitted.

Do NOT package copyrighted music files inside the project unless the music is properly licensed.

Possible audio direction:
- restrained archival/documentary atmosphere
- subtle ambient texture
- analogue/retro sonic character
- no distracting beat during data reading

If lyrics are relevant, do NOT reproduce large copyrighted lyrics in the website. Instead:
- link to an authorized lyrics source, or
- show only a brief permitted excerpt where appropriate.

The audio control must always include:
- play/pause
- volume
- mute
- clear track attribution

---

# 16. PERFORMANCE

The website should feel premium but remain fast.

Use:
- lazy loading
- optimized images
- lightweight animation
- reusable components
- efficient JSON processing
- minimal dependencies
- CSS transforms for animation
- avoid unnecessary re-rendering

---

# 17. TECHNICAL DIRECTION

Build with a modern web stack suitable for Google AI Studio.

Prefer:
- React
- TypeScript
- CSS / modern styling system
- SVG/canvas for custom data visualizations where appropriate

Use a charting library only when it improves the result.

Keep the code modular:

```text
src/
  components/
  pages/
  data/
  charts/
  modals/
  animations/
  utils/
  styles/
```

---

# 18. CONTENT STYLE

The writing should feel:

**formal + human + editorial + concise**

Avoid:
- corporate jargon
- sensational claims
- fake drama
- excessive technical language
- generic AI-generated filler

Good:

“₹82,400 was billed. The claim record shows ₹37,500 ultimately settled.”

Then explain why, using the actual dataset.

Bad:

“Insurance companies secretly take your money.”

Never make claims that the evidence does not support.

---

# 19. DATA STORYTELLING RULE

Use this hierarchy on every page:

### 01 — QUESTION
What should the user wonder?

### 02 — EVIDENCE
What does the dataset show?

### 03 — VISUAL
How can the user see it?

### 04 — INTERACTION
What can the user explore?

### 05 — EXPLANATION
What does it mean?

### 06 — SOURCE
Where did it come from?

This should be the core storytelling framework.

---

# 20. FINAL EXPERIENCE

The final website should feel like:

**“I am tracing a health-insurance claim through evidence.”**

Not:

**“I am looking at an insurance dashboard.”**

The user should naturally move through the story without needing instructions.

Every interaction should have a purpose.

Every animation should communicate something.

Every number should have a source.

Every conclusion should be supported by evidence.

---

# 21. GOOGLE AI STUDIO BUILD PROCESS

Before generating the final application:

### STEP 1
Inspect every JSON file.

### STEP 2
Create a data dictionary.

### STEP 3
Identify the strongest 5–8 evidence-based insights.

### STEP 4
Create the page architecture.

### STEP 5
Create the visual system.

### STEP 6
Implement data-loading functions.

### STEP 7
Build each page.

### STEP 8
Add modals.

### STEP 9
Add chart interactions.

### STEP 10
Add transitions and micro-interactions.

### STEP 11
Add responsive behavior.

### STEP 12
Add accessibility.

### STEP 13
Test every interaction against the source JSON.

### STEP 14
Check that no statistic is invented.

### STEP 15
Perform a final visual polish pass.

---

# 22. FINAL QUALITY CHECK

Before presenting the completed website, verify:

[ ] All JSON files load correctly  
[ ] No fabricated data  
[ ] Synthetic data is labelled  
[ ] Every major statistic has a source  
[ ] Every chart has a clear question  
[ ] Every page has a clear purpose  
[ ] Modals work  
[ ] Filters work  
[ ] Reset controls work  
[ ] Page transitions work  
[ ] Hover/focus states work  
[ ] Mobile layout works  
[ ] Keyboard navigation works  
[ ] Reduced-motion mode works  
[ ] Audio controls work if included  
[ ] Image credits are documented  
[ ] Music credits are documented  
[ ] Sources page is complete  
[ ] Loading/error states exist  
[ ] No broken links  
[ ] No console errors  
[ ] No unnecessary animation  
[ ] Visual style remains consistently modern-retro

---

# 23. MOST IMPORTANT INSTRUCTION

Do not blindly follow the example page titles above.

**Let the supplied data determine the final story.**

If the data reveals a stronger narrative, restructure the pages.

The final experience should prioritize:

**DATA ACCURACY → HUMAN UNDERSTANDING → STORY → INTERACTION → VISUAL POLISH**

Build something that looks like a professional data-journalism experience designed by a strong interaction/data-visualization designer.
