// components/LevelTransition.tsx
import { motion } from 'framer-motion';

interface LevelTransitionProps {
  level: number;
}

const LevelTransition: React.FC<LevelTransitionProps> = ({ level }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-white">Day {level}</h1>
      </motion.div>
    </div>
  );
};

export default LevelTransition;