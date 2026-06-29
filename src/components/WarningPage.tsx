import React from 'react';
import { AlertTriangle, ShieldCheck, ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface WarningPageProps {
  onGoBack: () => void;
  onProceed: () => void;
}

const WarningPage: React.FC<WarningPageProps> = ({ onGoBack, onProceed }) => {
  return (
    <div className="min-h-screen bg-destructive flex flex-col items-center justify-center p-6 text-white text-center">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="bg-white p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto shadow-2xl animate-pulse">
          <AlertTriangle className="w-16 h-16 text-destructive" />
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tighter">STOP!</h1>
          <h2 className="text-2xl font-bold">This link is dangerous</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            ScamShield NG has confirmed that this link belongs to scammers. 
            Proceeding may lead to your bank account being hacked or your identity stolen.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-left space-y-4">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 shrink-0 text-white" />
            <p className="text-sm">We blocked this to keep your money and data safe.</p>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 shrink-0 text-white" />
            <p className="text-sm">Most Nigerians who saw this warning avoided losing money.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <Button 
            size="lg"
            className="w-full h-16 text-xl font-bold bg-white text-destructive hover:bg-white/90 rounded-2xl shadow-xl transition-all"
            onClick={onGoBack}
          >
            <ArrowLeft className="mr-2 w-6 h-6" /> Go back to safety
          </Button>
          
          <button 
            className="text-white/70 hover:text-white text-sm font-medium underline underline-offset-4 transition-all"
            onClick={onProceed}
          >
            I understand the risk, let me proceed anyway
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default WarningPage;
