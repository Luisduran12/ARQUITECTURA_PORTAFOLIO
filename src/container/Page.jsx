import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box, Flex } from "@chakra-ui/react";
import TranslationButton from '../components/TranslationButton';
import WhatsAppButton from '../components/WhatsAppButton';
import BackToTop from '../components/BackToTop';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function Page({ componente }) {
  const { t } = useTranslation();

  return (
    <Flex direction="column" minHeight="100vh">
      <Helmet>
        <title>{`SWAG Arquitectos | ${t('navbar.inicio')}`}</title>
        <meta name="description" content="SWAG Arquitectos - Visualización Arquitectónica Premium. Renders fotorrealistas, animaciones 3D y recorridos virtuales." />
      </Helmet>
      <NavBar />
      <TranslationButton />
      <Box flex="1">
        {componente || <Outlet />}
      </Box>
      <Footer />
      {/* Botones flotantes globales */}
      <WhatsAppButton />
      <BackToTop />
    </Flex>
  );
}
