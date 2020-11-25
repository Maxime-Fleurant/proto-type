import { useRef, useState, Suspense, useEffect, lazy } from 'react';
import { Canvas, useLoader } from 'react-three-fiber';
import { OrbitControls, Box } from 'drei';
import { FontLoader } from 'three';
import dynamic from 'next/dynamic';
import BoxesPage from '../component/three';

const Scene = dynamic(() => import('../component/three'), { ssr: false });

const three = () => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <div>
      {mount && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}
    </div>
  );
};

export default three;
