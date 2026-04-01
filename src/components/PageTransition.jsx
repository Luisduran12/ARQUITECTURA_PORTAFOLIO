import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] // Cubic bezier premium
            }}
        >
            <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                exit={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: '#00d2ff',
                    zIndex: 10002,
                    originX: 0
                }}
            />
            {children}
        </motion.div>
    );
};

export default PageTransition;
