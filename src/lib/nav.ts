import { getCollection, type CollectionEntry } from 'astro:content';

export interface NavNode {
  label: string;
  href?: string;
  order: number;
  children: NavNode[];
}

interface TreeNode {
  segment: string;
  order: number;
  entry?: CollectionEntry<'pages'>;
  children: Map<string, TreeNode>;
}

function createNode(segment: string): TreeNode {
  return { segment, order: Number.POSITIVE_INFINITY, children: new Map() };
}

function slugToHref(id: string): string {
  return id === 'home' ? '/' : `/${id}`;
}

function titleCase(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function toNavNodes(node: TreeNode, pathParts: string[]): NavNode[] {
  const list: NavNode[] = [];

  for (const child of node.children.values()) {
    const childPath = [...pathParts, child.segment];
    const id = childPath.join('/');
    const label = child.entry?.data.navTitle ?? child.entry?.data.title ?? titleCase(child.segment);
    const href = child.entry ? slugToHref(id) : undefined;

    list.push({
      label,
      href,
      order: child.order,
      children: toNavNodes(child, childPath),
    });
  }

  list.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.label.localeCompare(b.label);
  });

  return list;
}

// Reads every page under src/content/pages and turns the folder structure
// into a nested navigation tree. Add or move .mdx files there and the
// sidebar updates on its own - no manual link list to maintain.
export async function getNavTree(): Promise<NavNode[]> {
  const entries = await getCollection('pages', ({ data }) => !data.hidden);
  const root = createNode('');

  for (const entry of entries) {
    const parts = entry.id.split('/');
    let node = root;

    parts.forEach((part, i) => {
      if (!node.children.has(part)) {
        node.children.set(part, createNode(part));
      }
      node = node.children.get(part)!;

      if (i === parts.length - 1) {
        node.entry = entry;
        node.order = entry.data.order ?? Number.POSITIVE_INFINITY;
      }
    });
  }

  return toNavNodes(root, []);
}
