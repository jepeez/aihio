import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BRAND_GREEN = "#00A344";

function RotatingObject({ children }) {
    const ref = useRef();
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.5; // Slow rotation
        }
    });
    return <group ref={ref}>{children}</group>;
}

function Lightning() {
    const shape = React.useMemo(() => {
        const s = new THREE.Shape();
        s.moveTo(0, 1.5);
        s.lineTo(-0.8, -0.2);
        s.lineTo(-0.2, -0.2);
        s.lineTo(-0.5, -1.5);
        s.lineTo(0.8, 0.2);
        s.lineTo(0.2, 0.2);
        s.lineTo(0.5, 1.5);
        s.lineTo(0, 1.5);
        return s;
    }, []);

    const extrudeSettings = {
        steps: 1,
        depth: 0.2,
        bevelEnabled: false,
    };

    return (
        <mesh>
            <extrudeGeometry args={[shape, extrudeSettings]} />
            <meshBasicMaterial color={BRAND_GREEN} wireframe={true} />
        </mesh>
    );
}

function Phone() {
    return (
        <group>
            {/* Body */}
            <mesh>
                <boxGeometry args={[1.2, 2.4, 0.1]} />
                <meshBasicMaterial color={BRAND_GREEN} wireframe={true} />
            </mesh>
            {/* Screen */}
            <mesh position={[0, 0.15, 0]}>
                <boxGeometry args={[1.0, 1.8, 0.12]} />
                <meshBasicMaterial color={BRAND_GREEN} wireframe={true} />
            </mesh>
            {/* Home Button */}
            <mesh position={[0, -0.9, 0.06]}>
                <circleGeometry args={[0.1, 16]} />
                <meshBasicMaterial color={BRAND_GREEN} wireframe={true} />
            </mesh>
        </group>
    );
}

function Globe() {
    return (
        <mesh>
            <icosahedronGeometry args={[1.3, 1]} />
            <meshBasicMaterial color={BRAND_GREEN} wireframe={true} />
        </mesh>
    );
}

function Chart() {
    return (
        <group position={[-0.2, -0.5, 0]}>
            {/* Bar 1 */}
            <mesh position={[-0.6, 0.5, 0]}>
                <boxGeometry args={[0.4, 1, 0.4]} />
                <meshBasicMaterial color={BRAND_GREEN} wireframe={true} />
            </mesh>
            {/* Bar 2 */}
            <mesh position={[0, 0.8, 0]}>
                <boxGeometry args={[0.4, 1.6, 0.4]} />
                <meshBasicMaterial color={BRAND_GREEN} wireframe={true} />
            </mesh>
            {/* Bar 3 */}
            <mesh position={[0.6, 1.1, 0]}>
                <boxGeometry args={[0.4, 2.2, 0.4]} />
                <meshBasicMaterial color={BRAND_GREEN} wireframe={true} />
            </mesh>
        </group>
    );
}

const IconMap = {
    lightning: Lightning,
    phone: Phone,
    globe: Globe,
    chart: Chart,
};

export default function WireframeIcon({ icon }) {
    const SelectedIcon = IconMap[icon];

    if (!SelectedIcon) return null;

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <RotatingObject>
                    <SelectedIcon />
                </RotatingObject>
            </Canvas>
        </div>
    );
}
