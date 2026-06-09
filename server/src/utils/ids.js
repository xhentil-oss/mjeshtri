import { customAlphabet } from 'nanoid';

// URL-safe, lowercase ids. Prefix per entity for readability in logs/DB.
const nano = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 12);

export const newId = (prefix) => `${prefix}-${nano()}`;

// Build a URL slug from a name. Strips Albanian diacritics (ë -> e, ç -> c).
export const slugify = (str) =>
  String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // combining diacritical marks
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
