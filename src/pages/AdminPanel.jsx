// src/pages/AdminPanel.jsx
// Panel de administración para subir imágenes a Cloudinary
// El cliente accede a /admin para gestionar su portafolio

import { useState, useRef } from "react";
import {
    Box,
    Button,
    Text,
    Input,
    Select,
    VStack,
    HStack,
    Image,
    Grid,
    GridItem,
    Spinner,
    Badge,
    Flex,
    Divider,
    IconButton,
    useToast,
    Heading,
} from "@chakra-ui/react";
import { FiUpload, FiLogOut, FiTrash2 } from "react-icons/fi";

// ─── CONFIGURACIÓN ────────────────────────────────────────────────────────────
// 1. Crea cuenta gratis en https://cloudinary.com
// 2. En Settings > Upload > Add upload preset → modo "Unsigned" → copia el nombre
// 3. Reemplaza los valores de abajo con los tuyos
const CLOUDINARY_CLOUD_NAME = "dba6au6s5";
const CLOUDINARY_UPLOAD_PRESET = "portafolio_swag";

// Contraseña simple para proteger el panel (cámbiala)
const ADMIN_PASSWORD = "swag2024";

// Carpetas disponibles en el portafolio
const CARPETAS = [
    "EDIFICIO",
    "ING_ECU",
    "HABI_NIÑA",
    "COCINA_INTERIOR",
    "HABITACION",
    "HABITACION2",
    "MAQUETA1",
    "FACHADA",
    "ZONA_TVs",
    "SALA",
    "BBQ",
];
// ─────────────────────────────────────────────────────────────────────────────

const AdminPanel = () => {
    const [autenticado, setAutenticado] = useState(false);
    const [password, setPassword] = useState("");
    const [carpetaSeleccionada, setCarpetaSeleccionada] = useState(CARPETAS[0]);
    const [imagenesCargadas, setImagenesCargadas] = useState([]);
    const [subiendo, setSubiendo] = useState(false);
    const [progreso, setProgreso] = useState(0);
    const inputRef = useRef();
    const toast = useToast();

    // ── Login ──
    const handleLogin = () => {
        if (password === ADMIN_PASSWORD) {
            setAutenticado(true);
            cargarImagenesExistentes(CARPETAS[0]);
        } else {
            toast({ title: "Contraseña incorrecta", status: "error", duration: 2000 });
        }
    };

    // ── Cargar imágenes existentes de Cloudinary ──
    const cargarImagenesExistentes = async (carpeta) => {
        try {
            const url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/portafolio_${carpeta}.json`;
            console.log("AdminPanel: Fetching existing images from:", url);
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                console.log("AdminPanel: Data received:", data);
                const urls = data.resources.map((r) => ({
                    url: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${r.public_id}`,
                    publicId: r.public_id,
                }));
                setImagenesCargadas(urls);
            } else {
                console.error("AdminPanel: Fetch failed with status:", res.status);
                setImagenesCargadas([]);
            }
        } catch (err) {
            console.error("AdminPanel: Error fetching images:", err);
            setImagenesCargadas([]);
        }
    };

    const handleCarpetaChange = (e) => {
        const nueva = e.target.value;
        setCarpetaSeleccionada(nueva);
        cargarImagenesExistentes(nueva);
    };

    // ── Subir imagen a Cloudinary ──
    const handleSubir = async (e) => {
        const archivos = Array.from(e.target.files);
        if (!archivos.length) return;

        setSubiendo(true);
        setProgreso(0);

        for (let i = 0; i < archivos.length; i++) {
            const archivo = archivos[i];
            const formData = new FormData();
            formData.append("file", archivo);
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
            formData.append("folder", `portafolio/${carpetaSeleccionada}`);
            formData.append("tags", `portafolio_${carpetaSeleccionada}`);

            try {
                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                    { method: "POST", body: formData }
                );
                const data = await res.json();
                if (data.secure_url) {
                    setImagenesCargadas((prev) => [
                        ...prev,
                        { url: data.secure_url, publicId: data.public_id },
                    ]);
                    toast({
                        title: `✓ ${archivo.name} subida`,
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                    });
                }
            } catch {
                toast({ title: `Error subiendo ${archivo.name}`, status: "error", duration: 3000 });
            }

            setProgreso(Math.round(((i + 1) / archivos.length) * 100));
        }

        setSubiendo(false);
        inputRef.current.value = "";
    };

    // ── Eliminar imagen ──
    const handleEliminar = async (img) => {
        if (window.confirm("¿Ocultar esta imagen del portafolio? (Nota: Se quitará visualmente, pero seguirá en Cloudinary hasta que la borres manualmente en su panel)")) {
            setImagenesCargadas((prev) => prev.filter((item) => item.publicId !== img.publicId));
            toast({
                title: "Imagen quitada",
                description: "Se ha eliminado de la lista actual.",
                status: "success",
                duration: 3000,
            });
        }
    };

    // ── Login screen ──
    if (!autenticado) {
        return (
            <Flex minH="100vh" align="center" justify="center" bg="gray.900">
                <Box bg="gray.800" p={10} borderRadius="xl" w="340px" boxShadow="2xl">
                    <VStack spacing={5}>
                        <Heading size="md" color="white">Panel SWAG Arquitectos</Heading>
                        <Input
                            placeholder="Contraseña"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            bg="gray.700"
                            border="none"
                            color="white"
                        />
                        <Button colorScheme="blue" w="100%" onClick={handleLogin}>
                            Entrar
                        </Button>
                    </VStack>
                </Box>
            </Flex>
        );
    }
    return (
        <Box minH="100vh" bg="gray.900" color="white" p={{ base: 4, md: 8 }}>
            {/* Header */}
            <Flex justify="space-between" align="center" mb={8}>
                <Heading size="lg">Panel de imágenes</Heading>
                <IconButton
                    icon={<FiLogOut />}
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => setAutenticado(false)}
                    aria-label="Salir"
                />
            </Flex>

            {/* Selector de carpeta + botón subir */}
            <Box bg="gray.800" p={6} borderRadius="xl" mb={8}>
                <VStack spacing={4} align="stretch">
                    <Text fontWeight="500" color="gray.300">Selecciona el proyecto</Text>
                    <Select
                        value={carpetaSeleccionada}
                        onChange={handleCarpetaChange}
                        bg="gray.700"
                        border="none"
                        color="white"
                    >
                        {CARPETAS.map((c) => (
                            <option key={c} value={c} style={{ background: "#2D3748" }}>
                                {c.replace(/_/g, " ")}
                            </option>
                        ))}
                    </Select>

                    <Divider borderColor="gray.600" />

                    <Input
                        type="file"
                        accept="image/*"
                        multiple
                        ref={inputRef}
                        onChange={handleSubir}
                        display="none"
                        id="file-input"
                    />
                    <label htmlFor="file-input" style={{ width: "100%" }}>
                        <Box
                            w="100%"
                            bg="blue.500"
                            color="white"
                            p={3}
                            borderRadius="md"
                            textAlign="center"
                            cursor="pointer"
                            _hover={{ bg: "blue.600" }}
                            fontSize="lg"
                        >
                            {subiendo ? `Subiendo... ${progreso}%` : "⬆ Subir imágenes"}
                        </Box>
                    </label>
                    <Text fontSize="xs" color="gray.500" textAlign="center">
                        Puedes seleccionar varias imágenes a la vez (JPG, PNG, WebP)
                    </Text>
                </VStack>
            </Box>

            {/* Galería de imágenes existentes */}
            <Box>
                <HStack mb={4}>
                    <Text fontWeight="500" color="gray.300">
                        Imágenes en {carpetaSeleccionada.replace(/_/g, " ")}
                    </Text>
                    <Badge colorScheme="blue">{imagenesCargadas.length}</Badge>
                </HStack>

                {imagenesCargadas.length === 0 ? (
                    <Box
                        border="2px dashed"
                        borderColor="gray.600"
                        borderRadius="xl"
                        p={12}
                        textAlign="center"
                    >
                        <Text color="gray.500">No hay imágenes aún en este proyecto</Text>
                    </Box>
                ) : (
                    <Grid
                        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
                        gap={3}
                    >
                        {imagenesCargadas.map((img, i) => (
                            <GridItem
                                key={i}
                                position="relative"
                                borderRadius="lg"
                                overflow="hidden"
                                role="group"
                            >
                                <Image loading="lazy" src={img.url} w="100%" h="180px" objectFit="cover" />
                                <Box
                                    position="absolute"
                                    top={0}
                                    left={0}
                                    w="100%"
                                    h="100%"
                                    bg="blackAlpha.600"
                                    opacity={0}
                                    _groupHover={{ opacity: 1 }}
                                    transition="opacity 0.2s"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <IconButton
                                        icon={<FiTrash2 />}
                                        colorScheme="red"
                                        size="sm"
                                        onClick={() => handleEliminar(img)}
                                        aria-label="Eliminar imagen"
                                        isRound
                                    />
                                </Box>
                            </GridItem>
                        ))}
                    </Grid>
                )}
            </Box>

            {/* Instrucciones para integrar */}
            <Box bg="gray.800" p={6} borderRadius="xl" mt={10}>
                <Text fontWeight="600" mb={2} color="blue.300">
                    ¿Cómo aparecen las imágenes en el portafolio?
                </Text>
                <Text fontSize="sm" color="gray.400" lineHeight={1.8}>
                    Las imágenes que subas aquí se guardan en Cloudinary bajo la carpeta{" "}
                    <code style={{ color: "#90CDF4" }}>portafolio/{carpetaSeleccionada}</code>.
                    Para que aparezcan automáticamente en el portafolio, el componente{" "}
                    <code style={{ color: "#90CDF4" }}>CarpetaImagenes.jsx</code> debe
                    obtenerlas desde Cloudinary en lugar de tenerlas hardcodeadas.
                    Revisa el archivo <code style={{ color: "#90CDF4" }}>useCarpetaImages.js</code>{" "}
                    que se incluye en esta actualización.
                </Text>
            </Box>
        </Box>
    );
};

export default AdminPanel;
