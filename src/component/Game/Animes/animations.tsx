import { animate, useMotionValue } from 'framer-motion';

const useAnim = () => {
  const scale = useMotionValue(0.5);
  const rotate = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const opacity = useMotionValue(0);

  animate(scale, 1.5, { repeat: Infinity, repeatType: 'mirror', duration: 1 });
  animate(rotate, 360, { repeat: Infinity, repeatType: 'mirror', duration: 1 });
  animate(rotateX, 360, { repeat: Infinity, repeatType: 'loop', duration: 1, ease: 'linear' });
  animate(rotateY, 360, { repeat: Infinity, repeatType: 'loop', duration: 1, ease: 'linear' });
  animate(opacity, 1, { repeat: Infinity, repeatType: 'mirror', duration: 0.1 });

  return { scale, rotate, opacity, rotateX, rotateY };
};

export default useAnim;
