import { useState } from 'react';
import Homepage from '@/components/Homepage';
import VerdictView from '@/components/VerdictView';
import WarningPage from '@/components/WarningPage';
import { CheckResult } from '@/types';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { detectScam, submitCommunityReport } from '@/lib/detector';

type Screen = 'home' | 'verdict' | 'warning';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [result, setResult] = useState<CheckResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scamUrl, setScamUrl] = useState<string>('');
  const [reportedItems, setReportedItems] = useState<string[]>([]);

  const handleCheck = async (input: string) => {
    setIsLoading(true);
    try {
      const detection = await detectScam(input);
      setResult({ verdict: detection.verdict, explanation: detection.explanation, originalInput: input });
      setScamUrl(input);
      setCurrentScreen('verdict');
    } catch {
      toast.error('Something went wrong. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => { setCurrentScreen('home'); setResult(null); setScamUrl(''); };
  const handleProceedAnyway = () => { setCurrentScreen('warning'); };
  const handleGoBack = () => { setCurrentScreen('verdict'); };

  const handleFinalProceed = () => {
    if (scamUrl) {
      const url = scamUrl.startsWith('http') ? scamUrl : `https://${scamUrl}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    toast.error('You chose to proceed. Do NOT enter any personal details on that site.', { duration: 6000 });
    setCurrentScreen('home');
    setResult(null);
  };

  const handleReport = async () => {
    if (!result) return;
    const input = result.originalInput;
    if (reportedItems.includes(input)) { toast.info('You already reported this. Thank you!'); return; }
    const success = await submitCommunityReport(input);
    if (success) {
      setReportedItems(prev => [...prev, input]);
      toast.success('Report submitted! This helps protect other Nigerians.', { duration: 4000 });
    } else {
      toast.error('Could not submit report right now. Try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <main className="container mx-auto max-w-4xl min-h-screen">
        {currentScreen === 'home' && <Homepage onCheck={handleCheck} isLoading={isLoading} />}
        {currentScreen === 'verdict' && result && (
          <VerdictView result={result} onReset={handleReset} onProceedAnyway={handleProceedAnyway} onReport={handleReport} />
        )}
        {currentScreen === 'warning' && (
          <div className="fixed inset-0 z-50 overflow-auto bg-background">
            <WarningPage onGoBack={handleGoBack} onProceed={handleFinalProceed} />
          </div>
        )}
      </main>
      <Toaster position="top-center" toastOptions={{ className: 'rounded-2xl border-2', style: { background: 'white', color: 'black' } }} />
    </div>
  );
}

export default App;
