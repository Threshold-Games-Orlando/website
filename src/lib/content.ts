import { z } from 'zod';
import raw from '../content/site.json';

const text = z.string().trim().min(1);
const httpsUrl = z
  .url()
  .refine((value) => new URL(value).protocol === 'https:', 'Use an https:// URL');
const schema = z.object({
  name: text,
  description: text,
  eyebrow: text,
  heroTitle: text,
  heroAccent: text,
  heroBody: text,
  shopLabel: text,
  shopUrl: httpsUrl,
  aboutLabel: text,
  aboutTitle: text,
  aboutBody: text,
  values: z
    .array(z.object({ title: text, body: text }))
    .min(1)
    .max(6),
  shopHeading: text,
  shopBody: text,
  contactTitle: text,
  contactBody: text,
  contactEmail: z.union([z.email(), z.literal('')]).default(''),
  contactFormEnabled: z.boolean().default(false),
  socials: z.array(z.object({ label: text, url: httpsUrl })).default([]),
  footerNote: text,
});
export const site = schema.parse(raw);
