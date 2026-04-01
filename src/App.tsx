import './App.css'
import { Navbar } from './components/layout/navbar'
import { Hero } from './components/layout/features/Hero'
import { motion } from 'framer-motion'
import { useTransferFlow } from './hooks/useTransferFlow'
import { ChevronLeft } from 'lucide-react'
import { Reciepientdetails } from './components/layout/features/transfer/Reciepientdetails'
import { Paymentmethod } from './components/layout/features/transfer/Paymentmethod'
import { ReviewTransfer } from './components/layout/features/transfer/ReviewTransfer'
function App() {

  const {
    view,
    step,
    transferData,
    handleBack,
    handleNext,
    handleReset

  } = useTransferFlow();


  return (
    <div className="min-h-screen flex flex-col bg-surface-container-low">
      <Navbar />

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {step === 1 && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero onStartTransfer={handleNext} />

          </motion.div>
        )}
        {step > 1 && step < 6 && (
          <div className="py-12 px-6">
            <div className="max-w-7xl mx-auto">
              {step < 5 && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-primary font-bold mb-8 hover:gap-3 transition-all"
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
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default App
