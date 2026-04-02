import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Globe, Zap, TrendingUp } from 'lucide-react';
import { Calculator } from './transfer/calculator';
// import { Calculator } from './Calculator';
// import { TransferData } from '../../../types';

interface HeroProps {
    //   onStartTransfer: (data: Partial<TransferData>) => void;
    onStartTransfer: (data: any) => void;

}

export function Hero({ onStartTransfer }: HeroProps) {
    return (
        <section className="relative pt-16 pb-32 px-6 overflow-hidden bg-surface-container-low">
            {/* Aesthetic Background Illustrations */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                {/* Dot Grid */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
                </div>

                {/* Abstract Geometric Shapes */}
                <div className="absolute top-20 right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-secondary/5 rounded-full blur-3xl opacity-40"></div>

                {/* Large Faint Icons as Illustrations */}
                <div className="absolute top-40 left-[15%] text-primary/5 -rotate-12">
                    <Globe size={320} strokeWidth={0.5} />
                </div>
                <div className="absolute bottom-10 right-[20%] text-secondary/5 rotate-12">
                    <Zap size={240} strokeWidth={0.5} />
                </div>

                {/* Floating Elements (Static) */}
                <div className="absolute top-[15%] right-[35%] p-4 bg-white rounded-2xl shadow-xl shadow-primary/5 border border-primary/5 flex items-center gap-3 rotate-6">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <TrendingUp size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Live Rate</div>
                        <div className="text-sm font-bold text-primary">GBP/INR +0.42%</div>
                    </div>
                </div>

                <div className="absolute bottom-[25%] left-[30%] p-4 bg-white rounded-2xl shadow-xl shadow-secondary/5 border border-secondary/5 flex items-center gap-3 -rotate-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Security</div>
                        <div className="text-sm font-bold text-primary">AES-256 Verified</div>
                    </div>
                </div>

                {/* Decorative Lines */}
                <svg className="absolute top-0 left-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-100 100 Q 200 300 500 100 T 1100 300" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M-100 400 Q 300 200 600 400 T 1200 200" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
                <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 border border-primary/10">
                            <span className="relative flex h-2 w-2">
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Next Generation Remittance
                        </div>

                        <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-fuchsia-700 leading-[1.1]">
                            Institutional Grade <span className="text-secondary">Money Movement.</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-lg sm:text-xl text-on-surface-variant max-w-lg leading-relaxed"
                    >
                        Experience the gold standard in international transfers. Fast, secure, and completely transparent conversions from GBP to INR and 40+ other currencies.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4"
                    >
                        <div className="flex items-center gap-2 bg-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-sm border border-outline-variant/10">
                            <CheckCircle2 className="text-secondary w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-on-surface-variant">FCA Regulated</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-sm border border-outline-variant/10">
                            <ShieldCheck className="text-secondary w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-on-surface-variant">Bank-Grade Security</span>
                        </div>
                    </motion.div>
                </div>

                <div className="lg:col-span-6 flex justify-center lg:justify-end w-full max-w-lg mx-auto lg:max-w-none">
                    <Calculator onNext={onStartTransfer} />
                </div>
            </div>
        </section>
    );
}