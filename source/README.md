# Optional source files

**You do not need anything in this folder to publish the website.** The `index.html` file at
the repository root is the complete, working site.

This folder is kept only for developers who would prefer to maintain the glossary as a
component-based app rather than a single HTML file.

## What is here

| File | Description |
|---|---|
| `data/glossary.ts` | The 59 glossary terms as a typed array. |
| `components/glossary-client.tsx` | The React component: search, filter tabs, and the table. |
| `app/page.tsx` | Page entry point that renders the component. |
| `app/globals.css` | Design tokens and the Moss palette as CSS variables. |
| `tailwind.config.ts` | Tailwind theme mapped to the Moss palette. |
| `postcss.config.js` | PostCSS/Tailwind configuration. |

## Rebuilding from these files

These files target **React 18 with Tailwind CSS**, and the component uses `framer-motion`
for row transitions and `lucide-react` for icons. To use them you would need to create a
React project, install those two packages plus Tailwind, and copy these files in.

Note that this route requires a build step, and a failing build is the usual reason a
GitHub Pages site does not appear. If your goal is simply to publish the glossary, use the
root `index.html` instead — the two produce the same site.
