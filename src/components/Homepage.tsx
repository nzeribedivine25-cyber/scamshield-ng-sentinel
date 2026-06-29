import React, { useState } from 'react';
import { ShieldCheck, Search, ShieldAlert, AlertCircle, Loader2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

interface HomepageProps {
  onCheck: (input: string) => void;
  isLoading: boolean;
}

const Homepage: React.FC<HomepageProps> = ({ onCheck, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onCheck(input.trim());
    }
  };

  const exampleChecks = [
    'https://jamb.gov.ng',
    'Enter your BVN to claim CBN grant',
    'bit.ly/free-money-ng',
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center">

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <img
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/7585018d-9e89-4369-b765-defe11237fff/scamshield-ng-logo-ff468258-1782699238317.webp"
          alt="ScamShield NG Logo"
          className="w-28 h-28 mx-auto mb-5 rounded-2xl shadow-lg"
        />
        <h1 className="text-4xl font-bold text-primary mb-2">ScamShield NG</h1>
        <p className="text-lg text-muted-foreground max-w-sm mx-auto leading-relaxed">
          Protecting Nigerians from scams. Paste any link, phone number, or message — we'll tell you if it's safe.
        </p>
      </motion.div>

      {/* Input form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-3"
      >
        <div className="relative group">
          <Input
            type="text"
            placeholder="Paste link, phone number, or message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-16 pl-12 pr-4 text-base rounded-2xl border-2 border-primary/20 focus:border-primary transition-all shadow-sm"
            disabled={isLoading}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
        </div>

        <Button
          type="submit"
          className="w-full h-14 text-lg font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all"
          disabled={!input.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Shield className="mr-2 w-5 h-5" />
              Check Now
            </>
          )}
        </Button>
      </motion.form>

      {/* Example checks */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-5 flex flex-wrap justify-center gap-2"
      >
        <p className="w-full text-xs text-muted-foreground mb-1">Try an example:</p>
        {exampleChecks.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setInput(example)}
            className="text-xs bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-full transition-all border border-border/40 truncate max-w-[180px]"
            disabled={isLoading}
          >
            {example}
          </button>
        ))}
      </motion.div>

      {/* Feature cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl"
      >
        <div className="flex flex-col items-center p-5 bg-secondary/50 rounded-2xl">
          <ShieldCheck className="w-9 h-9 text-primary mb-2" />
          <h3 className="font-bold text-primary text-sm">Verify First</h3>
          <p className="text-xs text-muted-foreground mt-1">Check links before clicking — takes 3 seconds.</p>
        </div>
        <div className="flex flex-col items-center p-5 bg-secondary/50 rounded-2xl">
          <ShieldAlert className="w-9 h-9 text-amber-600 mb-2" />
          <h3 className="font-bold text-amber-700 text-sm">Detect Scams</h3>
          <p className="text-xs text-muted-foreground mt-1">AI trained on Nigerian fraud patterns flags threats instantly.</p>
        </div>
        <div className="flex flex-col items-center p-5 bg-secondary/50 rounded-2xl">
          <AlertCircle className="w-9 h-9 text-destructive mb-2" />
          <h3 className="font-bold text-destructive text-sm">Block & Report</h3>
          <p className="text-xs text-muted-foreground mt-1">Scam links get blocked. Your reports protect others.</p>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-12 pb-4 text-xs text-muted-foreground space-y-1">
        <p>© 2026 ScamShield NG • Made for Nigeria 🇳🇬</p>
        <p>Powered by multi-layer AI detection + verified Nigerian domain database</p>
      </footer>
    </div>
  );
};

export default Homepage;
  
