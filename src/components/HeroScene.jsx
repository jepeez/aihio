import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, OrbitControls } from '@react-three/drei'
import { AV_logo3d } from './AV_logo3d'

export default function HeroScene() {
    const [isMobile, setIsMobile] = useState(false)

    const [eventSource, setEventSource] = useState(null)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        // Set event source to the hero section to ensure correct coordinate mapping
        setEventSource(document.getElementById('hero'))

        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}>
            <Canvas
                dpr={isMobile ? [1, 1] : [1, 1.5]} // Optimization: Lower DPR on mobile for performance
                camera={{ position: [0, 0, 8], fov: 45 }}
                style={{ pointerEvents: 'none' }} // Allow clicks to pass through
                eventSource={eventSource || undefined}
                eventPrefix="client"
                gl={{ antialias: false, toneMappingExposure: 1.0, powerPreference: "high-performance" }} // Optimization: Turn off AA (DPR handles it), increase brightness
            >
                <Suspense fallback={null}>
                    <Environment preset="warehouse" environmentIntensity={0.5} />

                    {/* Lighting Setup */}
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
                    <spotLight position={[-5, 5, 5]} intensity={1.0} angle={0.5} penumbra={1} />

                    {/* 
            Float wrapper for the idle bobbing animation.
            The AV_logo3d component itself handles the mouse proximity explosion.
          */}
                    <Float
                        speed={3} // Animation speed
                        rotationIntensity={isMobile ? 0.2 : 0.6} // XYZ rotation intensity
                        floatIntensity={isMobile ? 0.0 : 0.1} // Up/down float intensity
                    >
                        <AV_logo3d
                            scale={isMobile ? 0.4 : 0.65}
                            position={isMobile ? [0, 2.1, 0] : [2.2, 0.2, 0]}
                            rotation={[0, -2, 0]}
                            isMobile={isMobile}
                        />
                    </Float>

                    {/* Optional: Ambient light to ensure visibility if environment is dark */}
                    <ambientLight intensity={0.7} />
                </Suspense>
            </Canvas>
        </div>
    )
}
