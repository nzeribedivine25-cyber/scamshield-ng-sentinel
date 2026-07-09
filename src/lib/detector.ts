// ============================================================
// ScamShield NG — Detection Engine v4.0
// All API calls now go through secure Vercel serverless functions
// No keys exposed in the browser
// ============================================================

export type Verdict = 'safe' | 'suspicious' | 'scam';

export interface DetectionResult {
  verdict: Verdict;
  explanation: string;
  detectedBy: 'whitelist' | 'community' | 'blacklist' | 'heuristic' | 'ai';
}

export async function detectScam(input: string): Promise<DetectionResult> {
  const trimmed = input.trim();
  if (!trimmed) throw new Error('Empty input');

  const res = await fetch('/api/detect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input: trimmed }),
  });

  if (!res.ok) throw new Error('Detection failed');
  return res.json();
}

export async function submitCommunityReport(url: string): Promise<boolean> {
  try {
    const res = await fetch('/api/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
