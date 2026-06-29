import React, { useState } from 'react';
import { ShieldCheck, Search, ShieldAlert, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

interface HomepageProps {
  onCheck: (input: string) => void;
}

const Homepage: React.FC<HomepageProps> = ({ onCheck }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCheck(input);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/7585018d-9e89-4369-b765-defe11237fff/scamshield-ng-logo-ff468258-1782699238317.webp" 
          alt="ScamShield NG Logo" 
          className="w-32 h-32 mx-auto mb-6 rounded-2xl shadow-lg"
        />
        <h1 className="text-4xl font-bold text-primary mb-3">ScamShield NG</h1>
        <p className="text-xl text-muted-foreground max-w-md mx-auto">
          Protecting Nigerians from scams. Check any link, phone number, or message before you trust it.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-4"
      >
        <div className="relative group">
          <Input
            type="text"
            placeholder="Paste link, number, or message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-16 pl-12 pr-4 text-lg rounded-2xl border-2 border-primary/20 focus:border-primary transition-all shadow-sm"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-6 h-6 group-focus-within:text-primary transition-colors" />
        </div>
        
        <Button 
          type="submit" 
          className="w-full h-14 text-lg font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all"
          disabled={!input.trim()}
        >
          Check Now
        </Button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl"
      >
        <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-2xl">
          <ShieldCheck className="w-10 h-10 text-primary mb-2" />
          <h3 className="font-bold text-primary">Trust First</h3>
          <p className="text-sm text-muted-foreground">Verify links before clicking.</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-2xl">
          <ShieldAlert className="w-10 h-10 text-amber-600 mb-2" />
          <h3 className="font-bold text-amber-700">Stay Safe</h3>
          <p className="text-sm text-muted-foreground">Detect suspicious messages instantly.</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-2xl">
          <AlertCircle className="w-10 h-10 text-destructive mb-2" />
          <h3 className="font-bold text-destructive">Report Scams</h3>
          <p className="text-sm text-muted-foreground">Join the community in flagging bad actors.</p>
        </div>
      </motion.div>

      <footer className="mt-auto pt-12 pb-4 text-sm text-muted-foreground">
        <p>© 2025 ScamShield NG • Made for Nigeria</p>
      </footer>
    </div>
  );
};

export default Homepage;
