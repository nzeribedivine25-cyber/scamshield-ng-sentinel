import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = 'https://wtslnanmrijcmgabnpgg.supabase.co';

// Simple in-memory rate limiting per IP
const reportCounts = new Map<string, { count: number; resetAt: number }>();
const MAX_REPORTS_PER_HOUR = 10;

function getRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = reportCounts.get(ip);
  if (!record || now > record.resetAt) {
    reportCounts.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }
  if (record.count >= MAX_REPORTS_PER_HOUR) return false;
  record.count++;
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url } = req.body;
  if (!url || typeof url !== 'string' || url.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  // Rate limiting
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 'unknown';
  if (!getRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many reports. Try again later.' });
  }

  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
  const trimmedUrl = url.trim();

  try {
    // Check if URL already exists
    const existing = await fetch(
      `${SUPABASE_URL}/rest/v1/reported_urls?url=eq.${encodeURIComponent(trimmedUrl)}&select=id,report_count`,
      { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
    );
    const rows = await existing.json();

    if (rows && rows.length > 0) {
      const { id, report_count } = rows[0];
      await fetch(`${SUPABASE_URL}/rest/v1/reported_urls?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ report_count: report_count + 1, last_reported_at: new Date().toISOString() }),
      });
    } else {
      await fetch(`${SUPABASE_URL}/rest/v1/reported_urls`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ url: trimmedUrl, report_count: 1, last_reported_at: new Date().toISOString() }),
      });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error('Report error:', err);
    return res.status(500).json({ error: 'Failed to submit report' });
  }
}
