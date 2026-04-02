import { useEffect, useRef, useState, memo } from "react";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import { motion, useInView, animate } from "framer-motion";

// ─────────────────────────────────
// Contador numérico animado
// ─────────────────────────────────
const AnimatedCounter = memo(({ target, suffix = "", duration = 1.8 }) => {
    const [display, setDisplay] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    useEffect(() => {
        if (!isInView) return;
        const controls = animate(0, target, {
            duration,
            ease: "easeOut",
            onUpdate: (v) => setDisplay(Math.round(v)),
        });
        return () => controls.stop();
    }, [isInView, target, duration]);

    return (
        <Text
            ref={ref}
            fontSize={{ base: "5xl", md: "6xl", lg: "7xl" }}
            fontWeight="900"
            lineHeight="1"
            bgGradient="linear(to-r, white, rgba(0,210,255,0.8))"
            bgClip="text"
        >
            {display}{suffix}
        </Text>
    );
});

// ─────────────────────────────────
// Componente principal
// ─────────────────────────────────
const stats = [
    { target: 50, suffix: "+", label: "Proyectos Realizados", desc: "Residenciales, comerciales y urbanos" },
    { target: 5, suffix: "+", label: "Años de Experiencia", desc: "Visualizando arquitectura premium" },
    { target: 100, suffix: "%", label: "Clientes Satisfechos", desc: "Calidad que habla por sí sola" },
];

const StatsSection = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <Box
            ref={containerRef}
            py={{ base: "60px", md: "100px" }}
            px={{ base: "24px", md: "48px" }}
            position="relative"
            overflow="hidden"
        >
            {/* Glow de fondo */}
            <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%,-50%)"
                w="600px"
                h="300px"
                bg="rgba(0,210,255,0.04)"
                filter="blur(80px)"
                borderRadius="full"
                pointerEvents="none"
            />

            {/* Separador decorativo superior */}
            <Box
                h="1px"
                bg="linear-gradient(to right, transparent, rgba(0,210,255,0.3), transparent)"
                mb={{ base: "40px", md: "70px" }}
            />

            <Flex
                direction={{ base: "column", md: "row" }}
                justify="space-around"
                align="center"
                gap={{ base: 12, md: 6 }}
            >
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: i * 0.15 }}
                        style={{ textAlign: "center", flex: 1 }}
                    >
                        <AnimatedCounter
                            target={stat.target}
                            suffix={stat.suffix}
                            duration={1.6 + i * 0.2}
                        />
                        <Heading
                            as="h3"
                            size="md"
                            color="white"
                            fontWeight="600"
                            mt={3}
                            mb={1}
                            letterSpacing="0.05em"
                        >
                            {stat.label}
                        </Heading>
                        <Text color="gray.500" fontSize="sm">
                            {stat.desc}
                        </Text>
                    </motion.div>
                ))}
            </Flex>

            {/* Separador decorativo inferior */}
            <Box
                h="1px"
                bg="linear-gradient(to right, transparent, rgba(0,210,255,0.3), transparent)"
                mt={{ base: "40px", md: "70px" }}
            />
        </Box>
    );
};

export default memo(StatsSection);
