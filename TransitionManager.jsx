import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';

const BRAND_CYAN = "#009FE3";
const BRAND_DARK = "#050505";
const BRAND_RED = "#ef4444";

export const TransitionManager = () => {
    const [isBooted, setIsBooted] = useState(() => {
        const hasBooted = sessionStorage.getItem('hasBooted');
        return !!hasBooted;
    });
    
    const [bootText, setBootText] = useState("INITIALIZING...");
    const [showWipe, setShowWipe] = useState(true); // Controls the page entry wipe
    const [isExiting, setIsExiting] = useState(false); // Controls the page exit wipe
    const [exitDuration, setExitDuration] = useState(0.5); // Dynamic exit duration

    // Determine current page for Entry Wipe duration
    // If we are on Home, the entry (reveal) can be slower/grander.
    // If we are on a subpage, the entry should be snappy.
    const isHome = typeof window !== 'undefined' ? (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) : false;
    const entryDuration = isHome ? 1.2 : 0.5;

    // Remove the static loader curtain once React has mounted
    useEffect(() => {
        const loader = document.getElementById('initial-loader');
        if (loader) loader.remove();
    }, []);

    useEffect(() => {
        // If we haven't booted yet, run the sequence.
        if (!isBooted) {
            // Run Boot Sequence
            const sequence = async () => {
                await new Promise(r => setTimeout(r, 500));
                setBootText("LOADING CORE SYSTEMS...");
                
                await new Promise(r => setTimeout(r, 800));
                setBootText("OPTIMIZING SHADERS...");
                
                await new Promise(r => setTimeout(r, 600));
                setBootText("ACCESS GRANTED.");
                
                await new Promise(r => setTimeout(r, 400));
                setIsBooted(true);
                sessionStorage.setItem('hasBooted', 'true');
            };
            sequence();
        }
    }, [isBooted]);

    // Intercept Links for Page Transitions
    useEffect(() => {
        const handleLinkClick = (e) => {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            // Ignore external links, anchors, or empty links
            if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) return;

            e.preventDefault();
            if (isExiting) return; // Prevent double clicks

            // Check if target is Home
            const isHomeTarget = href === '/' || href.endsWith('index.html');
            
            // "Snappier" for subpages (0.5s), "Lengthier" for Home (1.2s)
            const duration = isHomeTarget ? 1.2 : 0.5;
            
            setExitDuration(duration);
            setIsExiting(true); // Trigger exit animation

            // Navigate after animation
            setTimeout(() => {
                window.location.href = href;
            }, duration * 1000); 
        };

        document.addEventListener('click', handleLinkClick);
        return () => document.removeEventListener('click', handleLinkClick);
    }, [isExiting]);

    // Portal to document.body to ensure it's on top of everything
    return ReactDOM.createPortal(
        <>
            {/* --- BOOT SCREEN --- */}
            <AnimatePresence>
                {!isBooted && (
                    <motion.div
                        key="boot-screen"
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-hw-black cursor-none"
                        exit={{ 
                            x: '100%', 
                            skewX: -20, 
                            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
                        }}
                    >
                        {/* Simple Dark Background (No Noise) */}
                        <div className="absolute inset-0 bg-hw-black" />

                        {/* Loading Bar Side - Made subtler */}
                        <div className="absolute top-0 left-0 h-full w-1 bg-signal-blue/30 shadow-[0_0_20px_rgba(2,153,225,0.3)]" />

                        <div className="text-center font-mono tracking-widest relative z-10 p-6">
                            <motion.div 
                                className="text-4xl md:text-6xl mb-6 font-bold text-signal-blue"
                                style={{ textShadow: `2px 0 #000, -2px 0 #0299e1` }}
                                animate={{ opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 0.15, repeat: Infinity }}
                            >
                                AIHIO_VISUALS
                            </motion.div>

                            <motion.div
                                key={bootText}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-sm md:text-base text-gray-400 mb-8"
                            >
                                {`> ${bootText}`}
                            </motion.div>

                            {/* Progress Bar */}
                            <div className="w-48 md:w-64 h-1 bg-gray-800 mx-auto overflow-hidden relative">
                                <motion.div 
                                    className="h-full absolute top-0 left-0 bg-signal-blue"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2.3, ease: "circOut" }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- PAGE ENTRY WIPE (Reveals content) --- */}
            <AnimatePresence>
                {isBooted && showWipe && !isExiting && (
                    <motion.div
                        key="entry-wipe"
                        className="fixed inset-0 z-[9998] bg-hw-black pointer-events-none"
                        style={{ 
                            width: '300%', 
                            left: '-100%',
                            skewX: '-45deg'
                        }}
                        initial={{ x: '0%', opacity: 1 }} // Starts covering center
                        animate={{ 
                            x: '100%', // Moves away to right
                            transition: { 
                                duration: entryDuration, // Dynamic based on current page
                                ease: [0.22, 1, 0.36, 1], // Custom ease
                                delay: 0.1 // Shortened delay
                            }
                        }}
                        onAnimationComplete={() => setShowWipe(false)}
                    >
                        {/* Subtle Cyan Line on the Edge */}
                        <div className="absolute top-0 left-0 h-full w-2 bg-signal-blue shadow-[0_0_20px_#0299e1] opacity-50" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- PAGE EXIT WIPE (Covers content) --- */}
            <AnimatePresence>
                {isExiting && (
                    <motion.div
                        key="exit-wipe"
                        className="fixed inset-0 z-[9998] pointer-events-none bg-hw-black flex items-center justify-center"
                        style={{ 
                            width: '400%', 
                            left: '-150%',
                            skewX: '-45deg'
                        }}
                        initial={{ x: '-100%' }} // Starts off-screen left
                        animate={{ 
                            x: '0%', // Moves to center (covering)
                            transition: { 
                                duration: exitDuration, // Dynamic based on target page
                                ease: "easeInOut" // Softer ease
                            }
                        }}
                    >
                        <div className="text-signal-blue font-mono text-2xl md:text-4xl tracking-[0.2em] font-bold flex items-center gap-4" style={{ transform: 'skewX(45deg)' }}>
                            <div className="w-3 h-3 bg-signal-blue animate-pulse"></div>
                            LOADING...
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>,
        document.body
    );
};
