import * as React from "react";
import { Download, Share, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = React.useState<BeforeInstallPromptEvent | null>(null);
    const [showIOSPrompt, setShowIOSPrompt] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        // Check if app is already installed
        if (window.matchMedia("(display-mode: standalone)").matches) {
            return;
        }

        // Handle Android/Desktop install prompt
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setIsVisible(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        // Handle iOS detection
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        if (isIOS) {
            setIsVisible(true);
            setShowIOSPrompt(true);
        }

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const result = await deferredPrompt.userChoice;

        if (result.outcome === "accepted") {
            setIsVisible(false);
        }
        setDeferredPrompt(null);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md md:left-auto md:right-4"
            >
                <div className="relative flex flex-col gap-3 rounded-2xl border-2 border-yellow-400 bg-yellow-50 p-4 shadow-xl">
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute right-2 top-2 rounded-full p-1 text-amber-900/40 hover:bg-black/5 hover:text-amber-900"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    <div className="flex items-start gap-4">
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-yellow-400 text-yellow-950">
                            <Download className="h-6 w-6" />
                        </div>

                        <div className="flex-1">
                            <h3 className="font-bold text-amber-950">Install App</h3>

                            {showIOSPrompt ? (
                                <div className="text-sm text-amber-900/80">
                                    <p className="mb-2">To install on iOS:</p>
                                    <ol className="list-inside list-decimal space-y-1 text-xs">
                                        <li className="flex items-center gap-1">
                                            Tap the share button <Share className="h-3 w-3" />
                                        </li>
                                        <li>Select "Add to Home Screen"</li>
                                    </ol>
                                </div>
                            ) : (
                                <p className="text-sm text-amber-900/80">
                                    Install the app to play offline and in full screen.
                                </p>
                            )}
                        </div>
                    </div>

                    {!showIOSPrompt && (
                        <Button
                            onClick={handleInstallClick}
                            className="w-full bg-yellow-400 text-yellow-950 hover:bg-yellow-500"
                        >
                            Install now
                        </Button>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
