import { Globe, UserIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { useUser } from "../../hooks/useUser";

interface NavbarProps {
    onLogoClick: () => void;
    onHistoryClick: () => void;
    onBusinessClick: () => void;
    currentView: string;
}

export function Navbar({ onLogoClick, onHistoryClick, onBusinessClick, currentView }: NavbarProps) {
    const { user, loading } = useUser("1");

    return (
        <nav className="sticky  z-50 w-full bg-transparent backdrop-blur-xl">
            <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
                <div
                    onClick={onLogoClick}
                    className="text-3xl font-black text-primary font-headline tracking-tight cursor-pointer"
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

                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-on-surface-variant">
                        <Globe size={20} />
                    </button>

                    {loading ? (
                        <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse"></div>
                    ) : user ? (
                        <div className="flex items-center gap-3 pl-2 border-l border-slate-100">
                            <div className="hidden lg:block text-right">
                                <div className="text-xs font-bold text-primary leading-none">{user.name}</div>
                                <div className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-1">{user.tier}</div>
                            </div>
                            <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm hover:shadow-md transition-all">
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </button>
                        </div>
                    ) : (
                        <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-on-surface-variant">
                            <UserIcon size={20} />
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}