import React, { useEffect, useState, memo } from 'react';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const sequences = [
    "ESTABLISHING SECURE CONNECTION...",
    "GEOLOCATING ASSETS...",
    "SYNCING INTERFACE...",
    "SYSTEM READY."
];

const Preloader = memo(({ onComplete }) => {
    const [logs, setLogs] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let currentLog = 0;
        const logInterval = setInterval(() => {
            if (currentLog < sequences.length) {
                setLogs(prev => [...prev, sequences[currentLog]]);
                currentLog++;
            } else {
                clearInterval(logInterval);
            }
        }, 400);

        const progInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progInterval);
                    setTimeout(() => onComplete(), 500);
                    return 100;
                }
                return prev + 5;
            });
        }, 30);

        return () => {
            clearInterval(logInterval);
            clearInterval(progInterval);
        };
    }, [onComplete]);

    return (
        <Box
            as={motion.div}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            position="fixed"
            top={0}
            left={0}
            w="100vw"
            h="100vh"
            bg="#050505"
            zIndex={20000}
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontFamily="monospace"
            overflow="hidden"
            onClick={onComplete} // Clic para saltar
            cursor="pointer"
        >
            {/* Grid de Fondo sutil */}
            <Box
                position="absolute"
                top={0}
                left={0}
                w="100%"
                h="100%"
                opacity={0.05}
                backgroundImage="linear-gradient(#00d2ff 1px, transparent 1px), linear-gradient(90deg, #00d2ff 1px, transparent 1px)"
                backgroundSize="50px 50px"
            />

            <VStack spacing={8} w="90%" maxW="500px" alignItems="flex-start" zIndex={1}>
                {/* Logo / Header */}
                <Flex w="100%" justify="space-between" align="center">
                    <Text color="blue.400" fontWeight="bold" fontSize="xs" letterSpacing="widest">
                        SWAG // NEURAL LINK
                    </Text>
                    <Text color="blue.400" fontSize="xs" opacity={0.5}>
                        COORD: 4.60° N, 74.08° W
                    </Text>
                </Flex>

                {/* Terminal Logs */}
                <Box
                    w="100%"
                    h="150px"
                    bg="rgba(0, 210, 255, 0.02)"
                    p={4}
                    borderRadius="md"
                    border="1px solid"
                    borderColor="blue.900"
                    position="relative"
                >
                    <VStack align="flex-start" spacing={1}>
                        {logs.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <Text color="blue.300" fontSize="xs" fontWeight="bold">
                                    <Text as="span" color="blue.600" mr={2}>&gt;</Text>
                                    {log}
                                </Text>
                            </motion.div>
                        ))}
                    </VStack>
                </Box>

                {/* Barra de Progreso */}
                <VStack w="100%" spacing={2}>
                    <Flex w="100%" justify="space-between">
                        <Text color="blue.500" fontSize="10px" letterSpacing="2px">INITIALIZING SEQUENCE</Text>
                        <Text color="blue.500" fontSize="10px">{progress}%</Text>
                    </Flex>
                    <Box w="100%" h="2px" bg="blue.900" borderRadius="full" overflow="hidden">
                        <motion.div
                            style={{
                                height: '100%',
                                background: '#00d2ff',
                                boxShadow: '0 0 10px #00d2ff',
                                width: `${progress}%`
                            }}
                        />
                    </Box>
                </VStack>

                <Text color="gray.600" fontSize="9px" w="100%" textAlign="center">
                    PRESIONA CUALQUIER LUGAR PARA SALTAR
                </Text>
            </VStack>
        </Box>
    );
};

export default Preloader;
