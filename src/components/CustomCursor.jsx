import React, { useEffect, useState, useRef, memo } from 'react';
import { Box } from '@chakra-ui/react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = memo(() => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const isVisibleRef = useRef(false);

    // Springs para movimiento suave
    const cursorX = useSpring(0, { damping: 20, stiffness: 250 });
    const cursorY = useSpring(0, { damping: 20, stiffness: 250 });

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisibleRef.current) {
                setIsVisible(true);
                isVisibleRef.current = true;
            }
        };

        const handleHoverStart = (e) => {
            const target = e.target;
            if (!target) return;

            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('button') ||
                target.getAttribute('role') === 'button' ||
                target.tagName === 'SELECT' ||
                target.style.cursor === 'pointer';

            setIsHovering(!!isClickable);
        };

        window.addEventListener('mousemove', moveCursor, { passive: true });
        window.addEventListener('mouseover', handleHoverStart, { passive: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleHoverStart);
        };
    }, [cursorX, cursorY]);

    if (!isVisible) return null;

    return (
        <>
            {/* Círculo exterior (Mira) */}
            <motion.div
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    translateX: cursorX,
                    translateY: cursorY,
                    pointerEvents: 'none',
                    zIndex: 10000,
                    x: '-50%',
                    y: '-50%',
                }}
            >
                <Box
                    width={isHovering ? "60px" : "40px"}
                    height={isHovering ? "60px" : "40px"}
                    border="1px solid"
                    borderColor="blue.400"
                    borderRadius="50%"
                    transition="all 0.2s ease-out"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                >
                    {/* Pequeñas líneas de mira */}
                    <Box position="absolute" top="-4px" left="50%" w="1px" h="8px" bg="blue.400" transform="translateX(-50%)" />
                    <Box position="absolute" bottom="-4px" left="50%" w="1px" h="8px" bg="blue.400" transform="translateX(-50%)" />
                    <Box position="absolute" left="-4px" top="50%" w="8px" h="1px" bg="blue.400" transform="translateY(-50%)" />
                    <Box position="absolute" right="-4px" top="50%" w="8px" h="1px" bg="blue.400" transform="translateY(-50%)" />
                </Box>
            </motion.div>

            {/* Punto central */}
            <motion.div
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    translateX: cursorX,
                    translateY: cursorY,
                    pointerEvents: 'none',
                    zIndex: 10001,
                    x: '-50%',
                    y: '-50%',
                }}
            >
                <Box
                    width="4px"
                    height="4px"
                    bg="blue.300"
                    borderRadius="50%"
                    boxShadow="0 0 10px #00d2ff"
                />
            </motion.div>
        </>
    );
};

export default CustomCursor;
