import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  es: {
    translation: {
      /* NAVBAR */
      navbar: {
        inicio: "Inicio",
        servicios: "Servicios",
        portafolio: "Portafolio",
        nosotros: "Nosotros",
        contacto: "Contacto",
      },
      /* WELCOME */
      welcome: {
        entrar: "Entrar",
        subtitulo: "VISUALIZACIÓN ARQUITECTÓNICA PREMIUM",
        ciudad: "Cúcuta, Colombia"
      },
      /* INICIO */
      carrusel: {
        bienvenido: "BIENVENIDO",
        visualizacion: "Visualización",
        inspiracion: "Inspiración",
        transformacion: "Transformación",
        innovacion: "Innovación",
      },
      servicios: {
        titulo: "Nuestros Servicios",
        renderizado: "Renderizado Fotorrealista",
        animaciones: "Animaciones 3D",
        recorridos: "Recorridos Virtuales",
        visualizacion: "Visualización de Interiores",
        boton: "Servicios",
      },
      /* INICIO NOSOTROS */
      inicioNos: {
        titulo: "En SWAG Arquitectos",
        lineaDos: "Nos centramos en:",
        parametros:
          "Innovación, Detalle, Experiencia, Calidad, Inspiración, Transformación.",
        boton: "Conoce más",
      },
      /* INICIO TRABAJO*/
      inicioTra: {
        titulo: "PROYECTOS",
        boton: "Más",
      },
      /* FOOTER */
      footer: {
        derechos: "Todos los derechos reservados",
        empresa: "SWAG ARQUITECTOS",
      },
      /* SERVICIOS */
      servicioPage: {
        portada: "SERVICIOS",
        renderTitulo: "Renderizado Fotorrealista:",
        renderParrafo:
          "Transformamos tus ideas en imágenes impactantes y detalladas, capturando cada matiz y textura para ofrecer una visión precisa y realista de tus proyectos.",
        visualTitulo: "Visualización de Interiores:",
        visualParrafo:
          "Creamos representaciones detalladas y estilizadas de espacios interiores, ayudando a visualizar la disposición, iluminación y atmósfera para una planificación precisa y efectiva.",
        animaTitulo: "Animaciones 3D:",
        animaParrafo:
          "Llevamos tus diseños a la vida con animaciones fluidas que muestran cada ángulo y detalle, permitiéndote explorar y presentar tus proyectos de manera dinámica y envolvente.",
        recorTitulo: "Recorridos Virtuales:",
        recorParrafo:
          "Ofrecemos experiencias inmersivas mediante tours virtuales, permitiendo a los clientes caminar virtualmente por sus espacios futuros y experimentar el diseño antes de la construcción.",
      },
      /* PORTAFOLIO */
      portafolio: {
        portada: "PORTAFOLIO",
        edificio_ceiba_central: "EDIFICIO CEIBA CENTRAL",
        casa_rg: "CASA RG",
        habitacion_nina: "HABITACIÓN DE NIÑA",
        cocina_interior: "COCINA INTERIOR",
        habitacion_principal: "HABITACIÓN PRINCIPAL",
        dormitorio: "DORMITORIO",
        render_maqueta: "RENDER MAQUETA",
        fachada_proyecto_f24: "FACHADA PROYECTO F24",
        zona_tv: "ZONA TV",
        sala: "SALA",
        zona_bbq: "ZONA BBQ",
      },
      /* CARPETA IMAGENES */
      carpetaImagen: {
        volver: "Volver al portafolio",
      },
      /* NOSOTROS */
      nosotros: {
        portada: "SWAG - Arquitectos",
        portadaParrafo:
          "En Swag Arquitectos, nos enfocamos en la visualización arquitectónica para crear espacios que inspiren y transformen. Utilizamos tecnología avanzada en renders 3D, animaciones y realidad virtual para materializar las visiones de nuestros clientes con detalle y precisión.",
        motorTitulo: "MOTOR DE RENDERIZADO",
        motorParrafo:
          "Swag Arquitectos utiliza motores de renderizado avanzados para transformar modelos 3D en imágenes fotorrealistas, garantizando precisión y calidad en cada proyecto.",
      },
      /* PAGE NOT FOUND */
      pageNotFound: {
        parrafo: "La página que buscas no se ha encontrado"
      },
      /* CONTACTO */
      contacto: {
        alertaTitulo: "Mensaje enviado",
        alertaDescripcion: "Tu mensaje ha sido enviado exitosamente.",
        alertaProblema: "Hubo un problema al enviar tu mensaje. Intenta nuevamente.",
        parrafo: "Gracias por tu visita, esperamos que haya sido de tu agrado. Si deseas, puedes enviarnos tu solicitud y nuestro equipo se pondrá en contacto contigo.",
        nombres: "Nombres",
        apellidos: "Apellidos",
        correo: "Correo Electrónico",
        mensaje: "Mensaje",
        boton: "Enviar"
      }
      // otras secciones
    },
  },
  en: {
    translation: {
      navbar: {
        inicio: "Home",
        servicios: "Services",
        portafolio: "Portfolio",
        nosotros: "About Us",
        contacto: "Contact Us",
      },
      /* WELCOME */
      welcome: {
        entrar: "Enter",
        subtitulo: "PREMIUM ARCHITECTURAL VISUALIZATION",
        ciudad: "Cúcuta, Colombia"
      },
      carrusel: {
        bienvenido: "WELCOME",
        visualizacion: "Visualization",
        inspiracion: "Inspiration",
        transformacion: "Transformation",
        innovacion: "Innovation",
      },
      servicios: {
        titulo: "Our Services",
        renderizado: "Photorealistic Rendering",
        animaciones: "3D Animations",
        recorridos: "Virtual Tours",
        visualizacion: "Visualization of Interiors",
        boton: "Services",
      },
      inicioNos: {
        titulo: "At SWAG Architects",
        lineaDos: "We focus on:",
        parametros:
          "Innovation, Detail, Experience, Quality, Inspiration, Transformation.",
        boton: "Learn more",
      },
      inicioTra: {
        titulo: "PROJECTS",
        boton: "More",
      },
      footer: {
        derechos: "All rights reserved",
        empresa: "SWAG ARCHITECTS",
      },
      servicioPage: {
        portada: "SERVICES",
        renderTitulo: "Photorealistic rendering:",
        renderParrafo:
          "We transform your ideas into stunning, detailed images, capturing every nuance and texture to deliver an accurate and realistic view of your projects.",
        visualTitulo: "Visualization of Interiors:",
        visualParrafo:
          "We create detailed and stylized renderings of interior spaces, helping to visualize layout, lighting and atmosphere for accurate and effective planning.",
        animaTitulo: "3D animations:",
        animaParrafo:
          "We bring your designs to life with fluid animations that show every angle and detail, allowing you to explore and present your projects in a dynamic and immersive way.",
        recorTitulo: "Virtual Tours:",
        recorParrafo:
          "We offer immersive experiences through virtual tours, allowing clients to virtually walk through their future spaces and experience the design before construction.",
      },
      portafolio: {
        portada: "PORTFOLIO",
        edificio_ceiba_central: "CEIBA CENTRAL BUILDING",
        casa_rg: "RG HOUSE",
        habitacion_nina: "GIRL'S ROOM",
        cocina_interior: "INDOOR KITCHEN",
        habitacion_principal: "MASTER BEDROOM",
        dormitorio: "BEDROOM",
        render_maqueta: "MODEL RENDER",
        fachada_proyecto_f24: "F24 PROJECT FACADE",
        zona_tv: "TV AREA",
        sala: "LIVING ROOM",
        zona_bbq: "BBQ AREA",
      },
      carpetaImagen: {
        volver: "Back to portfolio",
      },
      nosotros: {
        portada: "SWAG - Architects",
        portadaParrafo:
          "At Swag Arquitectos, we focus on architectural visualization to create spaces that inspire and transform. We use advanced technology in 3D renderings, animations and virtual reality to materialize our clients' visions with detail and precision.",
        motorTitulo: "RENDERING ENGINE",
        motorParrafo:
          "Swag Arquitectos uses advanced rendering engines to transform 3D models into photorealistic images, ensuring accuracy and quality in every project.",
      },
      pageNotFound: {
        parrafo: "The page you are looking for was not found."
      },
      contacto: {
        alertaTitulo: "Message sent",
        alertaDescripcion: "Your message has been sent successfully.",
        alertaProblema: "There was a problem sending your message. Please try again.",
        parrafo: "Thank you for your visit, we hope you enjoyed it. If you wish, you can send us your request and our team will contact you.",
        nombres: "Names",
        apellidos: "Surnames",
        correo: "Email",
        mensaje: "Message",
        boton: "Send"
      },
      // otras secciones
    },
  },
};

// Obtener el idioma guardado en el localStorage o usar 'es' por defecto
const savedLanguage = localStorage.getItem("language") || "es";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage, // Usar el idioma guardado
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
