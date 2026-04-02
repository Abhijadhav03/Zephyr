import { Globe, UserIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { useUser } from "../../hooks/useUser";
import { motion, AnimatePresence } from 'motion/react';
import React from "react";

interface NavbarProps {
    onLogoClick: () => void;
    onHistoryClick: () => void;
    onBusinessClick: () => void;
    currentView: string;
}

export function Navbar({ onLogoClick, onHistoryClick, onBusinessClick, currentView }: NavbarProps) {
    const { user, loading } = useUser("1");
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const handleNavClick = (callback: () => void) => {
        callback();
        setIsMenuOpen(false);
    };
    return (
        <nav className="sticky  z-50 w-full bg-transparent backdrop-blur-xl">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
                <div
                    onClick={onLogoClick}
                    className=" text-xl sm:text-2xl font-black text-primary font-headline tracking-tight cursor-pointer"
                >
                    Zephyr
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <button
                        onClick={onLogoClick}
                        className={cn(
                            "font-headline text-sm transition-colors",
                            currentView === 'home' ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
                        )}
                    >
                        Home
                    </button>
                    <button
                        onClick={onHistoryClick}
                        className={cn(
                            "font-headline text-sm transition-colors",
                            currentView === 'history' ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
                        )}
                    >
                        History
                    </button>
                    <button
                        onClick={onBusinessClick}
                        className={cn(
                            "font-headline text-sm transition-colors",
                            currentView === 'business' ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
                        )}
                    >
                        Business
                    </button>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <button className="hidden sm:block p-2 rounded-full hover:bg-slate-100 transition-colors text-on-surface-variant">
                        <Globe size={20} />
                    </button>

                    {loading ? (
                        <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse"></div>
                    ) : user ? (
                        <div className="flex items-center gap-3 sm:pl-2 sm:border-l border-slate-100">
                            <div className="hidden lg:block text-right">
                                <div className="text-xs font-bold text-primary leading-none">{user.name}</div>
                                <div className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-1">{user.tier}</div>
                            </div>
                            <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white shadow-sm hover:shadow-md transition-all">
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </button>
                        </div>
                    ) : (
                        <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-on-surface-variant">
                            <UserIcon size={20} />
                        </button>
                    )}

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors text-primary"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span className={cn("h-0.5 w-full bg-current transition-all duration-300", isMenuOpen && "rotate-45 translate-y-2")} />
                            <span className={cn("h-0.5 w-full bg-current transition-opacity duration-300", isMenuOpen && "opacity-0")} />
                            <span className={cn("h-0.5 w-full bg-current transition-all duration-300", isMenuOpen && "-rotate-45 -translate-y-2.5")} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
                    >
                        <div className="px-6 py-8 space-y-6">
                            <button
                                onClick={() => handleNavClick(onLogoClick)}
                                className={cn(
                                    "block w-full text-left font-headline text-lg transition-colors",
                                    currentView === 'home' ? "text-primary font-bold" : "text-on-surface-variant"
                                )}
                            >
                                Home
                            </button>
                            <button
                                onClick={() => handleNavClick(onHistoryClick)}
                                className={cn(
                                    "block w-full text-left font-headline text-lg transition-colors",
                                    currentView === 'history' ? "text-primary font-bold" : "text-on-surface-variant"
                                )}
                            >
                                History
                            </button>
                            <button
                                onClick={() => handleNavClick(onBusinessClick)}
                                className={cn(
                                    "block w-full text-left font-headline text-lg transition-colors",
                                    currentView === 'business' ? "text-primary font-bold" : "text-on-surface-variant"
                                )}
                            >
                                Business
                            </button>
                            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Globe size={20} className="text-secondary" />
                                    <span className="text-sm font-bold text-primary">Language: English</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}