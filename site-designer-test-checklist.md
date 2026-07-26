# Site Designer — Frontend Test Checklist

Step-by-step browser tests. Tick each box. If something fails, note it under
[Failures / notes](#failures--notes) at the bottom.

## Prerequisites
- [ ] Frontend running (dev: `npm run dev`, **or** rebuilt production `npm run build` + redeploy)
- [ ] Backend API running and `tblsite_design` table exists
- [ ] Logged in as `kanha` → **Designer** link visible in the admin navbar
- [ ] `/admin/builder` opens without console errors (F12 → Console)

---

## 1. Style & colors tab
- [ ] **Start from a look** — click each preset (Ocean, Forest, Sunset, Royal, Coral, Slate) → colors + fonts + radius all change together
- [ ] **Color theme** — click the 6 theme swatches → primary color updates
- [ ] **Individual colors** — change Primary / Primary dark / Background / Text / Header bg / Footer bg / Card bg → each updates; hex text field matches the picker
- [ ] **Typography** — change Heading font, Body font, Base size slider
- [ ] **Shape** — drag Corner radius + Section spacing sliders
- [ ] **Reset to theme** button → reverts to theme defaults
- [ ] After any change → **Save design** button **enables** → click → "Saved ✓" badge appears

## 2. Build page tab
- [ ] Click a palette block (Card, Stats, Gallery, Columns…) → it appears in the section list
- [ ] **Drag a row** to reorder → order changes
- [ ] **↑ / ↓** arrows move a section up/down
- [ ] **✎ edit** → block dialog opens → change content → Save → list updates
- [ ] **⧉ duplicate** → copy appears just below the original
- [ ] **🗑 delete** → section removed
- [ ] **Set as homepage** → saves the design + activates the designer on the homepage

## 3. Header tab
- [ ] Add items (Logo, Menu, Social, Language, Text, Image) into Left / Center / Right
- [ ] Select target region, click a palette item → adds to that region
- [ ] Drag a palette tile onto a region to add it
- [ ] Reorder (↑/↓) and remove (✕) items within a region
- [ ] Edit a **Text** item inline; edit an **Image** item's URL inline
Problem: 1. menu not support in mobile view it should collape ,2 .On the left side: logo on top then text then menu. but logo not display and text display in the same row as menu.
## 4. Footer tab
- [ ] Change column count (1–4) → columns add/remove correctly
- [ ] Add items (Text, Social, Quick links, Contact, Image) per column
- [ ] Edit **Text** / **Contact** (phone/email/address) / **Image** inline

## 5. Preview tab
- [ ] Page renders with your current design (colors + sections + header + footer)
- [ ] **Desktop / Tablet / Mobile** toggle resizes the preview
- [ ] Edit something in another tab, return to Preview → preview reflects the change

## 6. Undo / Redo
- [ ] Make several edits → **↶ Undo** steps back; **↷ Redo** steps forward
- [ ] **Ctrl+Z** (undo) and **Ctrl+Shift+Z** (redo) keyboard shortcuts work
- [ ] After **Save** → undo history resets (cannot undo past the saved state)

---

## 7. Public site (the core flow — most important)
- [ ] Change a color in the Designer → **Save** → open public site → **hard reload (Cmd+Shift+R)** → color matches
- [ ] Add / reorder blocks → Save → public homepage shows them in the saved order
- [ ] Composed **header** renders on the public site (logo, menu, social…)
- [ ] Composed **footer** renders on the public site (columns, text, contact…)
- [ ] Open **F12 → Console** on the public page → **no red errors**

## 8. Edge cases
- [ ] **Mobile view** of the public site → header wraps, footer stacks to 1 column
- [ ] **Switch language** (if the site is multi-language) → layout stays, content changes
- [ ] **Revert**: in **Settings** pick a template (0–3) → public site goes back to the classic template

---

## Priority
If these three pass, the rest is polish:
1. **§1** — Save button enables + persists
2. **§2** — Set as homepage
3. **§7** — Public site reflects the saved design after reload

## Failures / notes
> Write any failure here (what you did, what you expected, what happened, and a screenshot if possible):

-
-
-
