'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AsciiRenderer } from '@react-three/drei';
import * as THREE from 'three';

// Parse SVG path d attribute into THREE.Shape
function parseSVGPath(d: string): THREE.Shape[] {
  const shapes: THREE.Shape[] = [];
  let currentShape: THREE.Shape | null = null;

  const tokens = d.match(/[a-zA-Z]|[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g) || [];

  let i = 0;
  let x = 0;
  let y = 0;

  const num = () => parseFloat(tokens[i++]);

  while (i < tokens.length) {
    const cmd = tokens[i];

    if (/^[a-zA-Z]$/.test(cmd)) {
      i++;

      switch (cmd) {
        case 'M': {
          x = num();
          y = num();
          currentShape = new THREE.Shape();
          currentShape.moveTo(x, -y);
          shapes.push(currentShape);
          while (i < tokens.length && /^[-+\d.]/.test(tokens[i])) {
            x = num();
            y = num();
            currentShape.lineTo(x, -y);
          }
          break;
        }
        case 'L': {
          while (i < tokens.length && /^[-+\d.]/.test(tokens[i])) {
            x = num();
            y = num();
            currentShape?.lineTo(x, -y);
          }
          break;
        }
        case 'H': {
          while (i < tokens.length && /^[-+\d.]/.test(tokens[i])) {
            x = num();
            currentShape?.lineTo(x, -y);
          }
          break;
        }
        case 'V': {
          while (i < tokens.length && /^[-+\d.]/.test(tokens[i])) {
            y = num();
            currentShape?.lineTo(x, -y);
          }
          break;
        }
        case 'Z':
        case 'z': {
          currentShape?.closePath();
          break;
        }
        default:
          break;
      }
    } else {
      i++;
    }
  }

  return shapes;
}

const LOGO_PATH =
  'M501.248 218.194H415.27V100H619L501.248 218.194ZM379.453 580H260.134V214.438L62 210.7L177.88 100H383.497V463.363H495.635L379.453 580Z';

function LogoMesh() {
  const meshRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const shapes = parseSVGPath(LOGO_PATH);

    const geo = new THREE.ExtrudeGeometry(shapes, {
      depth: 120,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 6,
      bevelOffset: 0,
      bevelSegments: 8,
    });
    geo.center();
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x = Math.sin(meshRef.current.rotation.y * 0.5) * 0.15;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

export default function Logo3D({
  className,
  bgColor = '#2563eb',
  fgColor = '#ffffff',
}: {
  className?: string;
  bgColor?: string;
  fgColor?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className={className} />;

  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 700], fov: 50 }}>
        <color attach="background" args={[bgColor === 'transparent' ? '#000000' : bgColor]} />
        <ambientLight intensity={0} />
        <directionalLight position={[0, 0, 5]} intensity={2} />
        <LogoMesh />
        <AsciiRenderer fgColor={fgColor} bgColor={bgColor} characters="#@%=*+:.       " invert={false} resolution={0.2} />
      </Canvas>
    </div>
  );
}
