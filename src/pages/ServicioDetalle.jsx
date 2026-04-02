import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    VStack,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Icon,
    Flex,
    Divider
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaChevronRight } from 'react-icons/fa';
import Page from '../container/Page';
import { useTranslation } from 'react-i18next';
import OptimizedImage from '../components/OptimizedImage';
import OptimizedVideo from '../components/OptimizedVideo';
import { cloudUrl, cloudVideo } from '../utils/cloudinary';

const ServicioDetalle = () => {
    const { id } = useParams();
    const { t } = useTranslation();

    // Datos completos por cada servicio
    const serviceData = {
        'animaciones-3d': {
            titulo: t('servicios.animaciones'),
            video: 'public/videos/animaciones3d.mp4',
            descripcion: 'Transformamos tus planos en experiencias cinematográficas. Nuestras animaciones permiten recorrer cada espacio antes de que sea construido, capturando la luz, los materiales y la esencia de tu proyecto.',
            proceso: [
                { paso: '01', titulo: 'Briefing', desc: 'Entendemos tu visión y los puntos clave del proyecto.' },
                { paso: '02', titulo: 'Modelado', desc: 'Construimos la geometría digital con precisión arquitectónica.' },
                { paso: '03', titulo: 'Animación', desc: 'Damos vida a la escena con cámaras y movimientos fluidos.' },
                { paso: '04', titulo: 'Renderizado', desc: 'Procesamiento de alta calidad para un acabado fotorrealista.' }
            ],
            ejemplos: [
                cloudUrl('public/RENDERS/EDIFICIO/e1.webp', { w: 1280 }),
                cloudUrl('public/RENDERS/SALA/s1.webp', { w: 1280 }),
                cloudUrl('public/RENDERS/COCINA_INTERIOR/ci1.webp', { w: 1280 }),
                cloudUrl('public/RENDERS/HABITACION/h1.webp', { w: 1280 })
            ]
        },
        'foto-realista': {
            titulo: t('servicios.renderizado'),
            video: null,
            descripcion: 'Imágenes estáticas de máxima calidad que capturan materiales, iluminación y atmósfera con precisión fotográfica. Ideales para presentaciones a clientes, brochures y marketing inmobiliario.',
            proceso: [
                { paso: '01', titulo: 'Análisis', desc: 'Revisamos planos y referencias de materiales y estilo.' },
                { paso: '02', titulo: 'Modelado', desc: 'Construimos el modelo 3D con detalle arquitectónico.' },
                { paso: '03', titulo: 'Iluminación', desc: 'Configuramos luces naturales y artificiales con precisión.' },
                { paso: '04', titulo: 'Post-Producción', desc: 'Ajustes finales para un resultado de nivel cinematográfico.' }
            ],
            ejemplos: [
                cloudUrl('public/RENDERS/ZONA_TVs/zt5.webp', { w: 1280 }),
                cloudUrl('public/RENDERS/FACHADA/f2.webp', { w: 1280 }),
                cloudUrl('public/RENDERS/BBQ/b3.webp', { w: 1280 }),
                cloudUrl('public/RENDERS/HABITACION2/hb4.webp', { w: 1280 })
            ]
        },
        'recorridos-virtuales': {
            titulo: t('servicios.recorridos'),
            video: null,
            descripcion: 'Permite a tus clientes explorar el proyecto con total libertad desde cualquier dispositivo. Una experiencia interactiva inmersiva que genera confianza y acelera la toma de decisiones.',
            proceso: [
                { paso: '01', titulo: 'Modelo 3D', desc: 'Preparamos la escena optimizada para interactividad.' },
                { paso: '02', titulo: 'Integración', desc: 'Programamos la navegación y puntos de interés.' },
                { paso: '03', titulo: 'Renderizado', desc: 'Generamos las imágenes panorámicas de alta resolución.' },
                { paso: '04', titulo: 'Publicación', desc: 'Entregamos el recorrido accesible desde cualquier dispositivo.' }
            ],
            ejemplos: [
                cloudUrl('public/RENDERS/HABITACION/h6.webp', { w: 1280 }),
                cloudUrl('public/RENDERS/HABITACION_NINA/hn4.webp', { w: 1280 }),
                cloudUrl('public/RENDERS/SALA/s4.webp', { w: 1280 }),
                cloudUrl('public/RENDERS/COCINA_INTERIOR/ci5.webp', { w: 1280 })
            ]
        },
        'visualizacion-interiores': {
            titulo: t('servicios.visualizacion'),
            video: null,
            descripcion: 'Diseño y visualización de espacios interiores con atención al detalle en materiales, mobiliario e iluminación. Ideal para arquitectos de interiores, decoradores y proyectos residenciales exclusivos.',
            proceso: [
                { paso: '01', titulo: 'Concepto', desc: 'Definimos el estilo, paleta de colores y materiales.' },
                { paso: '02', titulo: 'Diseño 3D', desc: 'Modelamos muebles, acabados y decoración con precisión.' },
                { paso: '03', titulo: 'Escenografía', desc: 'Configuramos la iluminación para transmitir la atmósfera deseada.' },
                { paso: '04', titulo: 'Render Final', desc: 'Imagen fotorrealista lista para presentar a tu cliente.' }
            ],
            ejemplos: [
                cloudUrl('public/RENDERS/COCINA_INTERIOR/ci1.webp', { w: 1280 }),
                cloudUrl('public/RENDERS/HABITACION/h6.webp', { w: 1280 }),
                cloudUrl('public/RENDERS/ZONA_TVs/zt5.webp', { w: 1280 }),
                cloudUrl('public/RENDERS/HABITACION_NINA/hn4.webp', { w: 1280 })
            ]
        }
    };

    // Usa el servicio del ID, o el primero disponible como fallback
    const currentService = serviceData[id] || serviceData['animaciones-3d'];

    return (
        <Page componente={
            <Box bg="#0a0a0a" color="white" pt="100px" pb="100px">
                <Container maxW="container.xl">
                    {/* Breadcrumb */}
                    <Breadcrumb
                        fontSize="sm"
                        color="gray.500"
                        mb={8}
                        separator={<Icon as={FaChevronRight} color="gray.700" fontSize="xs" />}
                    >
                        <BreadcrumbItem>
                            <BreadcrumbLink as={RouterLink} to="/">{t('navbar.inicio')}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <BreadcrumbLink as={RouterLink} to="/servicios">{t('navbar.servicios')}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink color="blue.400">{currentService.titulo}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>

                    {/* Header y Video/Hero */}
                    <VStack align="flex-start" spacing={6} mb={16}>
                        <Heading
                            as="h1"
                            size="2xl"
                            fontWeight="200"
                            letterSpacing="0.05em"
                            textTransform="uppercase"
                        >
                            {currentService.titulo}
                        </Heading>
                        <Text color="gray.400" fontSize="lg" maxW="800px">
                            {currentService.descripcion}
                        </Text>

                        {currentService.video && (
                            <Box
                                w="100%"
                                borderRadius="2xl"
                                overflow="hidden"
                                boxShadow="0 20px 50px rgba(0,0,0,0.5)"
                                position="relative"
                                bg="gray.900"
                                aspectRatio={16 / 9}
                            >
                                <OptimizedVideo
                                    src={currentService.video}
                                    autoPlay={true}
                                    muted={true}
                                    loop={true}
                                    borderRadius="2xl"
                                />
                            </Box>
                        )}
                    </VStack>

                    {/* Proceso de Trabajo */}
                    <Box mb={20}>
                        <Heading
                            as="h2"
                            size="xl"
                            fontWeight="300"
                            mb={12}
                            textAlign="center"
                            textTransform="uppercase"
                            letterSpacing="widest"
                        >
                            Nuestro Proceso
                        </Heading>
                        <SimpleGrid columns={[1, 2, 4]} spacing={8}>
                            {currentService.proceso.map((item, idx) => (
                                <VStack
                                    key={idx}
                                    align="flex-start"
                                    p={6}
                                    bg="rgba(255,255,255,0.02)"
                                    borderRadius="xl"
                                    border="1px solid rgba(255,255,255,0.05)"
                                    transition="all 0.3s ease"
                                    _hover={{
                                        bg: "rgba(0,210,255,0.05)",
                                        border: "1px solid rgba(0,210,255,0.2)",
                                        transform: "translateY(-4px)",
                                    }}
                                >
                                    <Text
                                        fontSize="5xl"
                                        fontWeight="900"
                                        color="blue.500"
                                        opacity={0.3}
                                        lineHeight="1"
                                    >
                                        {item.paso}
                                    </Text>
                                    <Text fontWeight="bold" fontSize="lg">{item.titulo}</Text>
                                    <Text color="gray.500" fontSize="sm">{item.desc}</Text>
                                </VStack>
                            ))}
                        </SimpleGrid>
                    </Box>

                    <Divider mb={20} borderColor="gray.800" />

                    {/* Ejemplos de Proyectos */}
                    <Box>
                        <Heading
                            as="h2"
                            size="xl"
                            fontWeight="300"
                            mb={10}
                            textTransform="uppercase"
                            letterSpacing="widest"
                        >
                            Proyectos Realizados
                        </Heading>
                        <SimpleGrid columns={[1, 2, 2]} spacing={6}>
                            {currentService.ejemplos.map((img, idx) => (
                                <Box
                                    key={idx}
                                    overflow="hidden"
                                    borderRadius="xl"
                                    as={motion.div}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <OptimizedImage
                                        src={img}
                                        alt={`Proyecto ${idx + 1} - ${currentService.titulo}`}
                                        aspectRatio="16/9"
                                    />
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Box>

                    {/* Call to Action */}
                    <Flex
                        direction="column"
                        align="center"
                        mt={20}
                        p={12}
                        borderRadius="3xl"
                        bgGradient="linear(to-r, blue.900, transparent)"
                        border="1px solid rgba(0, 210, 255, 0.2)"
                    >
                        <Heading size="lg" mb={6} fontWeight="300" textAlign="center">
                            ¿Tienes un proyecto en mente?
                        </Heading>
                        <Button
                            as={RouterLink}
                            to="/contacto"
                            size="lg"
                            colorScheme="blue"
                            borderRadius="full"
                            px={10}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: '0 10px 20px rgba(0, 210, 255, 0.3)'
                            }}
                            transition="all 0.3s ease"
                        >
                            Hablemos ahora
                        </Button>
                    </Flex>
                </Container>
            </Box>
        } />
    );
};

export default ServicioDetalle;
