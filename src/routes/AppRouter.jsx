import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Page from "../container/Page";
import Inicio from "../pages/Inicio";
import Nosotros from "../pages/Nosotros";
import Servicios from "../pages/Servicios";
import Portafolio from "../pages/Portafolio";
import Contacto from "../pages/Contacto";
import PageNotFound from "../pages/PageNotFound";
import AdminPanel from "../pages/AdminPanel";
import ServicioDetalle from "../pages/ServicioDetalle";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";

// Componente interno para tener acceso a useLocation dentro de BrowserRouter
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page />}>
          <Route index element={<PageTransition><Inicio /></PageTransition>} />
          <Route path="nosotros" element={<PageTransition><Nosotros /></PageTransition>} />
          <Route path="servicios" element={<PageTransition><Servicios /></PageTransition>} />
          <Route path="portafolio" element={<PageTransition><Portafolio /></PageTransition>} />
          <Route path="servicios/:id" element={<PageTransition><ServicioDetalle /></PageTransition>} />
          <Route path="contacto" element={<PageTransition><Contacto /></PageTransition>} />
          <Route path="*" element={<PageTransition><PageNotFound /></PageTransition>} />
        </Route>
        {/* Ruta admin fuera del layout principal (sin navbar/footer) */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </AnimatePresence>
  );
}

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default AppRouter;
