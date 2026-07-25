# Free To Set Free Foundation — Website

A simple website built with [Astro](https://astro.build) and MDX. You don't
need to know how to code to update the words or photos — just edit the
`.mdx` files described below.

## How the site is organized

- Every page lives in `src/content/pages/` as a `.mdx` file (a Word-doc-like
  file that's mostly plain text with a little formatting).
- **The left sidebar menu is built automatically from these files.** Add a
  new `.mdx` file and it shows up in the menu on its own — you never have to
  edit a separate "menu" file.
- Photos go in `public/images/`. Anywhere a page says "photo coming soon,"
  that's a placeholder — swap it out once you have the real picture (see
  below).

```
src/content/pages/
  home.mdx        -> the homepage ("/")
  about-us.mdx     -> the About Us page ("/about-us")
  donate.mdx       -> the Donate page ("/donate")
public/images/
  logo.png         -> the foundation logo used in the header
  donate-qr.png     -> the donation QR code shown on the Donate page
```

## Editing text on an existing page

1. Open the `.mdx` file for that page in `src/content/pages/`.
2. At the top of the file, between the `---` lines, is the page's settings
   (its title, its label in the menu, and its order in the menu). Leave
   those alone unless you want to rename the page or reorder the menu.
3. Below that is the actual page content, written in plain text. Lines
   starting with `#`, `##`, or `###` are headings. Everything else is a
   normal paragraph. Just edit the words directly and save.

## Adding a photo

Each spot reserved for a photo looks like this in the file:

```
<PhotoPlaceholder caption="Picture of Johnny and Lijah cutting boards" />
```

To add the real photo:

1. Put the image file in `public/images/` (for example
   `public/images/johnny-and-lijah.jpg`).
2. Replace that whole line with:

```
<img src="/images/johnny-and-lijah.jpg" alt="Johnny and Lijah cutting boards" />
```

## Adding a brand-new page

1. Create a new `.mdx` file in `src/content/pages/`, e.g.
   `src/content/pages/events.mdx`.
2. Give it the same kind of settings block as the other pages:

```
---
title: 'Events'
navTitle: 'Events'
order: 4
---

Your page content goes here.
```

3. Save it. It will automatically appear in the sidebar menu (sorted by the
   `order` number) and be reachable at `/events`.

To group related pages together in a subfolder (for example, several pages
under an "Events" section), create a folder inside `src/content/pages/` —
the menu will nest them automatically to match.

## Things that live outside the page files

- **Header text** ("Free To Set Free / Foundation" and the tagline "Set
  Free. Live Free. Help Others Do the Same.") is set once in
  `src/site.config.ts` and shown on every page.
- **The legal disclaimer** at the bottom of every page is set once in
  `src/components/Disclaimer.astro`, per the organization's requirement
  that it appear in full, unedited, on every page.
- **Colors** (the navy header, light blue sidebar, and green Donate button)
  are set in `src/styles/global.css` under `:root` at the top of the file.

## Running the site locally

```
npm install
npm run dev
```

Then open the address it prints (usually `http://localhost:4321`).

## Building for deployment

```
npm run build
```

This creates a `dist/` folder of plain HTML/CSS/JS that can be uploaded to
any static web host (Netlify, Vercel, GitHub Pages, etc.).
