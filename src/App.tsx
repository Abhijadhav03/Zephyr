import './App.css'
import { Navbar } from './components/layout/navbar'
import { Hero } from './components/layout/features/Hero'

function App() {

  return (
    <div className="min-h-screen flex flex-col bg-surface-container-low">
      <Navbar />

      <Hero onStartTransfer={() => { }} />
    </div>
  )
}

export default App
