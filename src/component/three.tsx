import { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useLoader } from 'react-three-fiber';
import { OrbitControls, Box } from 'drei';
import { FontLoader } from 'three';

const BoxesPage = () => {
  const font = useLoader(FontLoader, '/helvetiker_regular.typeface.json');

  return (
    <Canvas camera={{ position: [0, 0, 35] }}>
      <ambientLight intensity={2} />
      <mesh>
        <Suspense fallback={null}>
          <textGeometry attach="geometry" args={['fdlklfdk', { font }]} />
        </Suspense>

        <meshNormalMaterial attach="material" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};

export default BoxesPage;
