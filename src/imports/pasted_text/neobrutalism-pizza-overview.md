web application/stitch/projects/5950253829540974784/screens/63ebde585c284d10aaa7f307b442b02c
# Необрутализм (Bold & Graphic)

## Product Overview

**The Pitch:** High-margin frozen Roman pizza for B2B. Zero prep, maximum profit, delivered frozen and baked in 3 minutes.

**For:** Cafe owners, bar managers, and catering businesses needing a premium food offering without a full kitchen setup.

**Device:** desktop

**Design Direction:** Unapologetic Neo-Brutalism. Hard black borders, solid stark shadows, screaming primary colors, and massive utilitarian typography. 

**Inspired by:** Figma's original rebrand, Gumroad, brutalist web architecture.

---

## Screens

- **Hero & Capture:** Screaming value proposition with immediate lead capture for a 15% discount.
- **The Receipt (Unit Economy):** Utilitarian breakdown of costs, margins, and profit disguised as a massive store receipt.
- **The Arsenal (Assortment):** High-contrast grid showcasing Margarita, Pepperoni, and Pear-Gorgonzola.
- **The Manual (Ops & FAQ):** Monospaced, brutally simple 3-step cooking instructions and stark accordion FAQs.

---

## Key Flows

**Get Price List:** Convert visitor to B2B lead.

1. User is on Hero -> sees giant yellow CTA `GET WHOLESALE PRICES + 15% OFF`
2. User clicks CTA -> screen auto-scrolls to anchor form / opens stark modal.
3. User enters email and clicks `SEND IT` -> Form replaces with a giant green `✓ CHECK INBOX` block.

---

<details>
<summary>Design System</summary>

## Color Palette

- **Primary:** `#FF2A2A` - Signal Red (CTAs, urgent accents)
- **Background:** `#FFFFFF` - Pure White (Maximum contrast)
- **Surface:** `#FFD700` - Industrial Yellow (Secondary cards, highlighting)
- **Text:** `#000000` - Pure Black (All typography, borders, shadows)
- **Muted:** `#E0E0E0` - Concrete Gray (Disabled states, secondary surfaces)
- **Accent:** `#00E5FF` - Cyan (Unexpected hover states)

## Typography

- **Headings:** Space Grotesk, 700, 64-120px, uppercase, tight tracking.
- **Body:** IBM Plex Mono, 500, 18px.
- **Small text:** IBM Plex Mono, 400, 14px.
- **Buttons:** Space Grotesk, 700, 24px, uppercase.

**Style notes:** Every container requires a `4px solid #000000` border. Shadows are absolute: `box-shadow: 8px 8px 0px #000000`. Zero border-radius anywhere (`0px`). Transitions are abrupt, no easing.

## Design Tokens

```css
:root {
  --color-primary: #FF2A2A;
  --color-background: #FFFFFF;
  --color-surface: #FFD700;
  --color-text: #000000;
  --color-accent: #00E5FF;
  --font-heading: 'Space Grotesk', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
  --border-thick: 4px solid #000000;
  --border-thin: 2px solid #000000;
  --shadow-brutal: 8px 8px 0px #000000;
  --shadow-hover: 12px 12px 0px #000000;
  --radius: 0px;
  --spacing-sm: 16px;
  --spacing-md: 32px;
  --spacing-lg: 64px;
}
```

</details>

---

<details>
<summary>Screen Specifications</summary>

### Hero & Capture

**Purpose:** Hit the user with raw profitability and grab their contact info instantly.

**Layout:** 50/50 vertical split. Left: Massive typography. Right: Lead capture form block.

**Key Elements:**
- **Headline:** 120px `Space Grotesk`, `#000000`, text "BAKE. SERVE. PROFIT."
- **Subheadline:** 24px `IBM Plex Mono`, `#000000`, text "Frozen Roman Pizza for B2B. 3 minutes to plate."
- **Form Box:** `#FFD700` background, `--border-thick`, `--shadow-brutal`, 40px padding.
- **Email Input:** `#FFFFFF` background, `--border-thick`, 64px height, 24px padding.
- **Submit CTA:** `#FF2A2A` background, `--border-thick`, `GET 15% OFF PRICELIST`, full width.

**States:**
- **Empty:** Input placeholder "YOUR@EMAIL.COM"
- **Loading:** CTA text changes to "UPLOADING..." with a harsh blink effect.
- **Error:** Input border turns `#FF2A2A`, harsh red text "EMAIL REQUIRED".

**Components:**
- **Marquee:** `#000000` background, `#FFFFFF` text, scrolling horizontally "NO CHEF REQUIRED • 300% MARGIN • FREEZER TO OVEN •"

**Interactions:**
- **Hover CTA:** Background shifts to `#00E5FF`, shadow extends to `--shadow-hover`, instant transition (`0ms`).

### The Receipt (Unit Economy)

**Purpose:** Prove the business model using a stark, undeniable format.

**Layout:** Centered column, constrained width (800px), styled exactly like a giant store receipt.

**Key Elements:**
- **Container:** `#FFFFFF` background, `--border-thick`, zigzag cut top/bottom via CSS clip-path, `--shadow-brutal`.
- **Header:** "UNIT ECONOMY ESTIMATE", 32px `IBM Plex Mono`, centered, dashed bottom border.
- **Line Items:** Cost of Goods ($2.50), Suggested Retail ($12.00), Labor ($0.00). 
- **Total Margin:** Giant `#FF2A2A` text, 80px size, "380% MARGIN / $9.50 PROFIT".

**Components:**
- **Data Row:** Flex container, space-between, monospaced font, dots (`....`) connecting label and value.

**Interactions:**
- **Hover Row:** Row background flashes `#FFD700`.

### The Arsenal (Assortment)

**Purpose:** Display the 3 core products with aggressive appetite appeal.

**Layout:** 3-column grid.

**Key Elements:**
- **Card - Margarita:** `#FF2A2A` background.
- **Card - Pepperoni:** `#FFD700` background.
- **Card - Pear-Gorgonzola:** `#00E5FF` background.
- **Pizza Image:** Top-down raw photography, cut out (transparent PNG), overflowing the top border of the card by 40px.
- **Title Block:** White box inside the card, `--border-thick`, 32px text.

**Components:**
- **Product Card:** 400px width, `--border-thick`, `--shadow-brutal`, 24px padding.

**Interactions:**
- **Hover Card:** Image rotates exactly 15 degrees instantly. Card lifts (translateY -8px) and shadow deepens.

### The Manual (Ops & FAQ)

**Purpose:** Kill objections about prep time and equipment.

**Layout:** Left 1/3: 3-step instructions. Right 2/3: FAQ accordions.

**Key Elements:**
- **Step 1/2/3:** Massive numbers (`1`, `2`, `3`) in 120px `Space Grotesk`, stark black. Text: "PULL FROM FREEZER", "BAKE AT 250°C FOR 3 MIN", "SLICE & SERVE".
- **FAQ Accordion:** Full width boxes, `#FFFFFF` background, `--border-thick`, `--shadow-brutal`, 24px padding.
- **FAQ Question:** 24px `Space Grotesk`, `+` icon aligned right.

**States:**
- **Accordion Open:** Background changes to `#FFD700`, content reveals instantly, `+` rotates to `x`.

**Components:**
- **Ops Block:** `#FFFFFF` box, black text, red accents.

**Interactions:**
- **Click Accordion:** Instant snap open, no smooth sliding. Height auto.

</details>

---

<details>
<summary>Build Guide</summary>

**Stack:** HTML + Tailwind CSS v3

**Build Order:**
1. **Design Tokens & Typography** - Load Space Grotesk and IBM Plex Mono. Set up `theme.extend` in Tailwind for brutalist box-shadows and borders.
2. **Hero & Capture** - Establish the massive grid, form elements, and brutalist CTA hovers.
3. **The Receipt** - Build the complex CSS clip-path for the receipt edges and the monospaced flex rows.
4. **The Arsenal** - Implement the overlapping image grid and instant-hover rotation effects.
5. **The Manual** - Structure the accordions with JS-free `<details>` and `<summary>` tags styled brutally.

</details>