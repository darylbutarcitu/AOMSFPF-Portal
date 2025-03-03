import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 3, ease: 'easeInOut' }}
    >
      
      <div className="spinner"></div>
      <style>{`
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 9999;
        }
        
        .spinner {
          border: 20px solid #f3f3f3;
          border-top: 20px solid rgb(219, 177, 52);
          border-radius: 50%;
          width: 100px;
          height: 100px;
          animation: spin 0.5s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
};

export default LoadingScreen;
