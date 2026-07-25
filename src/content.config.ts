import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Every .mdx file placed under src/content/pages becomes a page on the site.
// The file's location (including any subfolders) becomes its URL and its
// spot in the left-hand navigation - no extra wiring needed.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/pages' }),
  schema: z.object({
    // Shown as the browser tab title and page heading.
    title: z.string(),
    // Shown in the sidebar navigation. Falls back to `title` if not set.
    navTitle: z.string().optional(),
    // Controls sidebar order (lower numbers appear first). Pages without an
    // order are sorted alphabetically after any ordered pages.
    order: z.number().optional(),
    // Set to true to keep a page out of the sidebar without deleting it.
    hidden: z.boolean().optional(),
  }),
});

export const collections = { pages };
