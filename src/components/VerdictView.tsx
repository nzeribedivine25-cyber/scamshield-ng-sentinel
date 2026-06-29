import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, ChevronRight, RotateCcw, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckResult } from '@/types';

interface VerdictViewProps {
  result: CheckResult;
  onReset: () => void;
  onProceedAnyway: () => void;
}

const VerdictView: React.FC<VerdictViewProps> = ({ result, onReset, onProceedAnyway }) => {
  const { verdict, explanation, originalInput } = result;

  const config = {
    safe: {
      icon: <ShieldCheck className="w-24 h-24 text-primary" />,
      title: '✅ This is Safe',
      color: 'text-primary',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-primary',
      description: "We haven't found any record of scams for this. It looks good to go!"
    },
    suspicious: {
      icon: <ShieldAlert className="w-24 h-24 text-amber-500" />,
      title: '⚠️ Suspicious',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20',
      borderColor: 'border-amber-400',
      description: "Something doesn't feel right. Be very careful before you share any details."
    },
    scam: {
      icon: <AlertTriangle className="w-24 h-24 text-destructive" />,
      title: '🚨 Scam Detected',
      color: 'text-destructive',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      borderColor: 'border-destructive',
      description: 'DANGER! Our systems flagged this as a known scam. Do NOT click or reply.'
    }
  };

  const current = config[verdict];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 max-w-md mx-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`w-full p-8 rounded-3xl border-2 ${current.borderColor} ${current.bgColor} text-center space-y-6 shadow-xl`}
      >
        <div className="flex justify-center">{current.icon}</div>
        
        <h2 className={`text-3xl font-bold ${current.color}`}>{current.title}</h2>
        
        <div className="bg-white/50 dark:bg-black/20 p-4 rounded-xl text-left border border-white/20">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Checked Content</p>
          <p className="text-sm font-medium break-all line-clamp-2">{originalInput}</p>
        </div>

        <div className="space-y-2">
          <p className="text-lg font-medium leading-tight">
            {explanation || current.description}
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          {verdict === 'scam' && (
            <Button 
              variant="destructive" 
              className="w-full h-12 rounded-xl text-lg font-bold"
              onClick={onProceedAnyway}
            >
              I want to see the link <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          )}
          
          <Button 
            variant="outline" 
            className="w-full h-12 rounded-xl text-lg border-2"
            onClick={onReset}
          >
            <RotateCcw className="mr-2 w-5 h-5" /> Check Another
          </Button>

          <Button 
            variant="ghost" 
            className="w-full h-10 text-muted-foreground hover:text-primary transition-colors"
          >
            <Flag className="mr-2 w-4 h-4" /> Report this anyway
          </Button>
        </div>
      </motion.div>

      <p className="mt-8 text-sm text-center text-muted-foreground">
        Help keep Nigeria safe. Reporting scams helps protect millions of others.
      </p>
    </div>
  );
};

export default VerdictView;
