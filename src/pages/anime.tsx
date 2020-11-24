import { motion } from 'framer-motion';
import useAnime from '../component/Game/Animes/animations';

const Anime = () => {
  const { scale, rotate, opacity, rotateX, rotateY } = useAnime();

  return <motion.div style={{ display: 'inline-block', rotateY }}>Default</motion.div>;
};

export default Anime;
