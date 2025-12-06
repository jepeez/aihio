import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactDOM from 'react-dom';

const BRAND_CYAN = "#009FE3";
const BRAND_DARK = "#050505";
const BRAND_RED = "#ef4444";

export const TransitionManager = () => {
    const [isBooted, setIsBooted] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const hasBooted = sessionStorage.getItem('hasBooted');
        if (hasBooted) {
            setIsBooted(true);
        }
    }, []);

    const [bootText, setBootText] = useState("INITIALIZING...");

    // Remove the static loader curtain once React has mounted
    // Remove the static loader curtain once React has mounted and the component has re-rendered
    useEffect(() => {
        if (isMounted) {
            const loader = document.getElementById('initial-loader');
            if (loader) loader.remove();
        }
    }, [isMounted]);

    useEffect(() => {
        // If we haven't booted yet, run the sequence.
        if (!isBooted) {
            // Run Boot Sequence
            const sequence = async () => {
                await new Promise(r => setTimeout(r, 300));
                setBootText("LOADING CORE SYSTEMS...");

                await new Promise(r => setTimeout(r, 400));
                setBootText("OPTIMIZING SHADERS...");

                await new Promise(r => setTimeout(r, 300));
                setBootText("ACCESS GRANTED.");

                await new Promise(r => setTimeout(r, 200));
                setIsBooted(true);
                sessionStorage.setItem('hasBooted', 'true');
            };
            sequence();
        }
    }, [isBooted]);

    if (!isMounted) return null;

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
                                    transition={{ duration: 1.2, ease: "circOut" }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>,
        document.body
    );
};
