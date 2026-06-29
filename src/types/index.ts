export type Verdict = 'safe' | 'suspicious' | 'scam';

export interface CheckResult {
  verdict: Verdict;
  explanation: string;
  originalInput: string;
}
