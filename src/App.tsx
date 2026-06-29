import { useState } from 'react';
import Homepage from '@/components/Homepage';
import VerdictView from '@/components/VerdictView';
import WarningPage from '@/components/WarningPage';
import { CheckResult, Verdict } from '@/types';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

type Screen = 'home' | 'verdict' | 'warning';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [result, setResult] = useState<CheckResult | null>(null);

  const handleCheck = (input: string) => {
    // Mocking the detection logic as requested
    const verdicts: Verdict[] = ['safe', 'suspicious', 'scam'];
    const randomVerdict = verdicts[Math.floor(Math.random() * verdicts.length)];
    
    let explanation = '';
    if (randomVerdict === 'safe') {
      explanation = "This content doesn't match any known scam patterns in Nigeria.";
    } else if (randomVerdict === 'suspicious') {
      explanation = 'The wording in this message is similar to common "Opay/Palmpay" scam messages. Proceed with caution.';
    } else {
      explanation = 'This link is a confirmed "Phishing" site designed to steal your bank login details.';
    }

    setResult({
      verdict: randomVerdict,
      explanation,
      originalInput: input
    });
    
    setCurrentScreen('verdict');
    toast.success('Check complete!');
  };

  const handleReset = () => {
    setCurrentScreen('home');
    setResult(null);
  };

  const handleProceedAnyway = () => {
    setCurrentScreen('warning');
  };

  const handleGoBack = () => {
    setCurrentScreen('verdict');
  };

  const handleFinalProceed = () => {
    toast.error('Access blocked for your safety.', {
      description: 'In a real app, this would redirect you, but we highly discourage it.'
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <main className="container mx-auto max-w-4xl min-h-screen">
        {currentScreen === 'home' && (
          <Homepage onCheck={handleCheck} />
        )}
        
        {currentScreen === 'verdict' && result && (
          <VerdictView 
            result={result} 
            onReset={handleReset} 
            onProceedAnyway={handleProceedAnyway} 
          />
        )}

        {currentScreen === 'warning' && (
          <div className="fixed inset-0 z-50 overflow-auto bg-background">
            <WarningPage 
              onGoBack={handleGoBack} 
              onProceed={handleFinalProceed} 
            />
          </div>
        )}
      </main>
      <Toaster 
        position="top-center" 
        toastOptions={{
          className: 'rounded-2xl border-2',
          style: { background: 'white', color: 'black' }
        }} 
      />
    </div>
  );
}

export default App;
