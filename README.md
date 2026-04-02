# Zephyr 🌬️
*Institutional Grade Money Movement.*

Zephyr is a premium, client-side fin-tech application designed to provide users with a fast, secure, and completely transparent currency exchange experience. Initially built as a frontend prototype, it simulates comprehensive international money transfers and features an immersive, glassmorphism-inspired UI powered by React and Tailwind V4.

---

## 🎯 Key Features

- **Dynamic Currency Converter:** Real-time calculation of exchange rates and transparent fee structures across 40+ fiat currencies.
- **Multi-Step Transfer Flow:** A streamlined 5-step transaction wizard built with zero-friction UX principles:
  1. Amount & Currency Calculation
  2. Recipient Detailing
  3. Transfer Review
  4. Payment Method Selection
  5. Success & Receipt Generation
- **Client-Side Persistence:** A resilient `localStorage` backend that saves completed transactions seamlessly, allowing users to track their transfer histories across sessions without a live database.
- **Micro-Animations & Fluid UIs:** Extensive use of layout animations, staggered loading states, and exit sequences to make the app feel alive and responsive.
- **Responsive Navigation:** A mobile-first dynamic navbar that transitions smoothly across viewports.

---

## 🏗️ Architecture & Technical Decisions

### Core Tech Stack
- **Library & Bundler:** React 19 + TypeScript + **Vite**. Chosen for its lightning-fast HMR, exceptional developer experience, and modern module resolution.
- **Styling Engine:** **Tailwind CSS v4**. Utilized for rapid, utility-first styling. We leverage `tailwind-merge` and `clsx` via local utilities to build complex, collision-free component variants.
- **Icons & Graphics:** `lucide-react` for crisp, consistent, and highly customizable SVG icons.
- **Animations:** `motion/react` (Framer Motion). Adopted over pure CSS transitions to easily sequence complex entrance animations, handle exiting DOM nodes (`AnimatePresence`), and choreograph sophisticated multi-stage component loads.

### State Management Strategy
Rather than relying on a heavy global store (e.g., Redux or Zustand), Zephyr utilizes encapsulated state via custom hooks and top-level component orchestration:
- **`useTransferFlow`**: Manages the state machine of the 5-step transaction sequence.
- **`useExchangeRate`**: Handles the fetching/mocking of variable exchange rates.
- **`useUser`**: Simulates authenticated user interactions.
Data flows predictably downwards via props, while critical transaction state is uplifted to the main `App.tsx` router.

### Persistence Strategy
To make the app completely independent of a live API server for mock demonstrations, we implemented a mock backend in `src/lib/storage.ts`. This acts as an API proxy, converting JavaScript objects into robust `localStorage` stores, complete with artificial latency to mimic real-world network requests.

---

## 📂 Project Structure

```text
Zephyr/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── history/        # Transfer history data tables & cards
│   │   └── layout/         # High-level layouts: Header, Nav, and structural containers
│   │       └── features/   # Feature-specific implementations
│   │           └── transfer/# The 5-step transfer UI components
│   ├── hooks/              # Custom React hooks encapsulating business logic
│   ├── lib/                # Utilities, local storage API proxy, and mock data generators
│   ├── App.tsx             # Root logical router and view orchestrator
│   ├── index.css           # Global typography and base Tailwind imports
│   ├── main.tsx            # React DOM entry point
│   └── types.ts            # Global TypeScript definitions & interfaces
├── package.json            # Project manifests & dependencies
├── tsconfig.json           # TypeScript compilation settings
└── vite.config.ts          # Vite bundler configurations
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd Zephyr
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:5173`.

### Building for Production
To build the project for production, run:
```bash
npm run build
```
This generates an optimized static bundle in the `dist` directory. You can preview it using `npm run preview`.

---

## 🎨 Design System Principles
Zephyr adopts a pristine, fin-tech aesthetic relying heavily on structural minimalism:
- **Depth & Elevation**: Uses subtle backdrop blurs (glassmorphism) and colored drop-shadows to signify interactive layers.
- **Typography:** Custom font pairing emphasizing high legibility and numeric clarity (especially critical for currency displays).
- **Branding:** Uses vibrant fuchsia as its primary accent against muted slate/gray surface backgrounds, enforcing a sense of modern prestige and reliability.
