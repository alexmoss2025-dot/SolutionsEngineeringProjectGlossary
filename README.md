# Moss — Project Glossary

A searchable, filterable reference of project terminology used across Moss teams.
Contains **59 terms** — 50 Business Analyst terms and 9 Company-Specific terms.

---

## Publish on GitHub Pages (recommended — no build required)

The file `index.html` at the root of this repo is the **complete, self-contained website**.
All HTML, CSS, JavaScript and glossary data are inside that one file. There is nothing to
install, compile, or configure.

1. Create a new empty repository on GitHub (public, or private if your plan supports Pages).
2. Upload **all files in this folder** to the repository root (drag-and-drop works: use
   **Add file → Upload files** on the GitHub repo page).
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` and folder `/ (root)`
5. Click **Save**. Wait about 1 minute.

Your site will be live at:

```
https://<your-username>.github.io/<repository-name>/
```

If you are publishing to an organization account, the URL will use the org name instead.

### Why this approach
GitHub Pages serves static files directly. Because `index.html` needs no build step, there
is no build to fail — the most common cause of a Pages deployment not appearing.

---

## Files in this repository

| Path | Purpose |
|---|---|
| `index.html` | **The entire website.** Self-contained — open it in any browser to preview locally. |
| `.nojekyll` | Tells GitHub Pages to serve files as-is (skips Jekyll processing). Keep this file. |
| `README.md` | This document. |
| `source/` | Optional. The original component source, for developers who want to rebuild the site with a framework. Not required for publishing. |

---

## Previewing locally

Double-click `index.html`, or open it in your browser. No server needed.

---

## Editing the glossary

Open `index.html` in any text editor and find the line near the bottom that begins:

```js
const TERMS = [
```

Each entry looks like this:

```js
{
  "term": "Hypercare",
  "definition": "A period immediately following deployment where additional support and monitoring are provided.",
  "category": "Business Analyst"
}
```

To add a term, copy an existing block, edit the three values, and place it in the list.
`category` must be exactly `"Business Analyst"` or `"Company-Specific"` — those two values
drive the filter tabs, the counts, and the badge colours.

The table sorts and counts automatically, so terms do not need to be added in alphabetical
order. Save the file and commit it; GitHub Pages republishes within about a minute.

---

## Features

- Full-text search across both terms and definitions, with matches highlighted
- Category filter tabs — **All** (default), **Business Analyst**, **Company-Specific** — each showing a live count
- Live "Showing X of Y terms" counter
- Three-column table: Term, Definition, Category
- Colour-coded category badges (green for Business Analyst, gold for Company-Specific)
- Empty state when a search returns no matches
- Responsive down to mobile widths, with horizontal scroll on the table
- Print stylesheet — the table prints cleanly without the header, search bar, or footer

---

## Brand palette

| Token | Hex | Used for |
|---|---|---|
| Primary green | `#2D6A4F` | Header, table header row, term text |
| Accent green | `#52B788` | Logo mark, focus rings, counter text |
| Light green | `#D8F3DC` | Hero gradient, borders, tab hover |
| Gold | `#E9C46A` | Company-Specific badges, search highlight |
| Dark | `#1B2D2A` | Headings and primary text |
| Background | `#F8FAF9` | Page background |

---

© 2025 Moss Construction. Internal reference material.
