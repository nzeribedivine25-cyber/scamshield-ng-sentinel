import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, ArrowLeft, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface WarningPageProps {
  onGoBack: () => void;
  onProceed: () => void;
}

const WarningPage: React.FC<WarningPageProps> = ({ onGoBack, onProceed }) => {
  const [countdown, setCountdown] = useState(5);
  const [canProceed, setCanProceed] = useState(false);

  React.useEffect(() => {
    if (countdown <= 0) {
      setCanProceed(true);
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen bg-destructive flex flex-col items-center justify-center p-6 text-white text-center">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Pulsing warning icon */}
        <div className="bg-white p-4 rounded-full w-24 h-24 flex items-center justify-center mx-auto shadow-2xl animate-pulse">
          <AlertTriangle className="w-16 h-16 text-destructive" />
        </div>

        {/* Main warning text */}
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tighter">STOP!</h1>
          <h2 className="text-2xl font-bold">ScamShield has blocked this link</h2>
          <p className="text-lg text-white/90 leading-relaxed">
            Our system confirmed this link belongs to scammers. 
            Proceeding may lead to your bank account being hacked 
            or your personal details stolen.
          </p>
        </div>

        {/* Info cards */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-left space-y-4">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 shrink-0 mt-0.5" />
            <p className="text-sm">
              ScamShield blocked this to keep your money and personal data safe.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 shrink-0 mt-0.5" />
            <p className="text-sm">
              Nigerians who saw this warning avoided losing money to this exact scam.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" />
            <p className="text-sm">
              Never enter your BVN, PIN, OTP, or bank details on any site you didn't navigate to yourself.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-4 pt-2">
          <Button
            size="lg"
            className="w-full h-16 text-xl font-bold bg-white text-destructive hover:bg-white/90 rounded-2xl shadow-xl transition-all"
            onClick={onGoBack}
          >
            <ArrowLeft className="mr-2 w-6 h-6" /> Go back to safety
          </Button>

          {/* Proceed button — delayed to force the user to pause */}
          {canProceed ? (
            <button
              className="text-white/60 hover:text-white/90 text-sm font-medium underline underline-offset-4 transition-all"
              onClick={onProceed}
            >
              I understand the risk, proceed anyway
            </button>
          ) : (
            <div className="flex items-center justify-center gap-2 text-white/40 text-sm">
              <Clock className="w-4 h-4" />
              <span>Proceed option available in {countdown}s</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default WarningPage;
      
