import './App.css';
import { Navbar } from './components/layout/navbar';
import { Hero } from './components/layout/features/Hero';
import { AnimatePresence, motion } from 'framer-motion';
import { useTransferFlow } from './hooks/useTransferFlow';

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
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#008080',
        fontFamily: "'Tahoma', 'MS Sans Serif', 'Arial', sans-serif",
        fontSize: '11px',
      }}
    >
      <Navbar
        onLogoClick={handleReset}
        onHistoryClick={handleViewHistory}
        onBusinessClick={() => { }}
        currentView={view}
      />

      <AnimatePresence mode="wait">
        {view === 'history' ? (
          <motion.div
            key="history"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ flex: 1 }}
          >
            <TransferHistory />
          </motion.div>
        ) : (
          <motion.div
            key={step}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ flex: 1 }}
          >
            {step === 1 && (
              <Hero onStartTransfer={handleNext} />
            )}

            {step > 1 && step < 6 && (
              <div
                style={{
                  padding: '16px',
                  paddingBottom: '40px',
                  backgroundColor: '#008080',
                  minHeight: 'calc(100vh - 80px)',
                }}
              >
                {/* Back button — Win2k style */}
                {step < 5 && (
                  <div style={{ maxWidth: '780px', margin: '0 auto 10px auto' }}>
                    <button
                      onClick={handleBack}
                      className="win-btn"
                      style={{ fontSize: '11px' }}
                    >
                      &#8592; Back
                    </button>
                  </div>
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
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Windows 2000 Taskbar */}
      <div className="win-taskbar" role="toolbar" aria-label="Taskbar">
        {/* Start button */}
        <button className="win-start-btn" aria-label="Start">
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <rect width="6" height="6" fill="#ff0000" />
            <rect x="8" width="6" height="6" fill="#00aa00" />
            <rect y="8" width="6" height="6" fill="#0000ff" />
            <rect x="8" y="8" width="6" height="6" fill="#ffd700" />
          </svg>
          <strong>Start</strong>
        </button>

        <div className="win-toolbar-sep" aria-hidden="true" />

        {/* Active window button */}
        <button
          className="win-btn"
          style={{ minWidth: '160px', textAlign: 'left', padding: '2px 8px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}
          aria-label="Current window"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <rect width="10" height="10" rx="1" fill="#3a6ea5" />
            <text x="1.5" y="9" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial">Z</text>
          </svg>
          Zephyr Money Transfer
        </button>

        <div style={{ flex: 1 }} />

        {/* System tray */}
        <div
          style={{
            borderTop: '1px solid #808080',
            borderLeft: '1px solid #808080',
            borderRight: '1px solid #ffffff',
            borderBottom: '1px solid #ffffff',
            padding: '2px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
          }}
          role="status"
          aria-label="System tray"
        >
          {/* Network icon */}
          <svg width="14" height="14" viewBox="0 0 14 14" aria-label="Network connected" role="img">
            <rect x="4" y="8" width="6" height="4" fill="#3a6ea5" stroke="#000" strokeWidth="0.5" />
            <rect x="5" y="6" width="4" height="3" fill="#3a6ea5" />
            <path d="M2 5 Q7 0 12 5" fill="none" stroke="#3a6ea5" strokeWidth="1" />
            <path d="M4 7 Q7 3 10 7" fill="none" stroke="#3a6ea5" strokeWidth="1" />
          </svg>
          {/* Clock */}
          <span style={{ fontSize: '11px', fontWeight: 'bold' }}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
