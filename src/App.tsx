import './App.css'
import { Navbar } from './components/layout/navbar'
import { Hero } from './components/layout/features/Hero'
import { motion } from 'framer-motion'
import { useTransferFlow } from './hooks/useTransferFlow'
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
      </motion.div>
    </div>
  )
}

export default App
