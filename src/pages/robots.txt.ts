import type { APIRoute } from 'astro';
import { absolute, asset } from '../utils/paths';

// Generated so the sitemap URL always matches the configured site and base.
export const GET: APIRoute = ({ site }) => {
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${absolute(asset('/sitemap-index.xml'), site)}`, ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
