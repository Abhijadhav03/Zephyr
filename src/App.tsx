import './App.css';
import { Navbar } from './components/layout/navbar';
import { Hero } from './components/layout/features/Hero';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransferFlow } from './hooks/useTransferFlow';
import { ChevronLeft } from 'lucide-react';

import { Reciepientdetails } from './components/layout/features/transfer/Reciepientdetails';
import { Paymentmethod } from './components/layout/features/transfer/Paymentmethod';
import { ReviewTransfer } from './components/layout/features/transfer/ReviewTransfer';
import { SuccessScreen } from './components/layout/features/transfer/SuccessScreen';
import TransferHistory from './components/history/TransferHistory';

function App() {
  const {
    view,
    step,
    transferData,
    handleBack,
    handleNext,
    handleReset,
    handleViewHistory
  } = useTransferFlow();

  return (
    <div className="min-h-screen flex flex-col bg-surface-container-low">
      <Navbar
        onLogoClick={handleReset}
        onHistoryClick={handleViewHistory}
        onBusinessClick={() => { }}
        currentView={view}
      />

      <AnimatePresence mode="wait">
        {/* History View */}
        {view === 'history' ? (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <TransferHistory />
          </motion.div>
        ) : (
          /* Main Transfer Flow */
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            {/* Step 1: Landing / Hero */}
            {step === 1 && (
              <Hero onStartTransfer={handleNext} />
            )}

            {/* Steps 2 to 5: Transfer Form Flow */}
            {step > 1 && step < 6 && (
              <div className="py-8 sm:py-12 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto">
                  {/* Back Button (hide on success screen) */}
                  {step < 5 && (
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 text-primary font-bold mb-6 sm:mb-8 hover:gap-3 transition-all text-sm sm:text-base"
                    >
                      <ChevronLeft size={20} />
                      Back
                    </button>
                  )}

                  {step === 2 && (
                    <Reciepientdetails
                      data={transferData}
                      onNext={handleNext}
                      onBack={handleBack}
                    />
                  )}

                  {step === 3 && (
                    <Paymentmethod
                      data={transferData}
                      onNext={handleNext}
                      onBack={handleBack}
                    />
                  )}

                  {step === 4 && (
                    <ReviewTransfer
                      data={transferData}
                      onNext={() => handleNext({})}
                      onBack={handleBack}
                    />
                  )}

                  {step === 5 && (
                    <SuccessScreen
                      data={transferData}
                      onReset={handleReset}
                    />
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;