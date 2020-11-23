import { motion } from 'framer-motion';

const Zoom1 = () => {
  return (
    <motion.div
      style={{ display: 'inline-block' }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1 }}
    >
      <motion.div
        style={{ display: 'inline-block' }}
        animate={{ scale: [0.5, 2] }}
        transition={{ repeat: Infinity, duration: 0.5, repeatType: 'mirror' }}
      >
        default
      </motion.div>
    </motion.div>
  );
};

export default Zoom1;
