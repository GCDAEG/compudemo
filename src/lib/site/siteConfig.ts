// /src/lib/config/marmoles-gchu-config.ts

export const siteConfig = {
  // 1. Identidad Visual y Marca
  brand: {
    name: "COMPUDEMO",
    suffix: "Gualeguaychú", 
    logo: "/logos/marmoles-logo.png",
    theme: "monolithic-elegant", 
    colors: {
      primary: "#1F2937",   // Gris Grafito: Sólido, elegante y técnico (como el granito Negro Absoluto)
      secondary: "#F3F4F6", // Gris Piedra: Un fondo neutro que resalta las vetas de los materiales
      accent: "#B45309"     // Bronce/Óxido: Da un toque de lujo y contrasta perfecto con los grises
    }
  },

  // 2. Textos Principales (Landing Page)
  hero: {
    badge: "Tecnología & sistemas",
    title: "Todo en informática y tecnología",
    subtitle: "Computadoras, componentes, periféricos y servicio técnico especializado. Asesoramiento real para que compres lo que necesitás.",
    buttonText: "Ver catalogo",
    // Foto de una cocina moderna con una gran isla de mármol/cuarzo
    // bgImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80", 
  },

  // Filtros dinámicos orientados al rubro de la piedra
  // categories: [
  //   "Todos", 
  //   "Granitos Nacionales", 
  //   "Granitos Importados", 
  //   "Mármoles", 
  //   "Cuarzos y Sintéticos"
  // ],

  // 3. Funcionalidades y Datos Comerciales
  features: {
    hasFilters: true,
    hasCart: true, // Funciona como un "Armador de Presupuestos"
    whatsappNumber: "5493446123456789", // Reemplazar por el número real
    deliveryInfo: "Medición en obra e instalación en Gualeguaychú y zonas aledañas.",
    openingHours: "Lun a Vie: 08:00 a 17:00 / Sáb: 08:30 a 12:30"
  },

  // 4. CONEXIÓN A LA BASE DE DATOS (Google Sheets)
  // URL específica del Apps Script para este proyecto
  // databaseUrl: "https://script.google.com/macros/s/AKfycbwUm-Wb2BDf8ltibLk4mqkMc2rBwAeSutjZyWbkGfm85hjZcICG_u6yYAw3bG37bDZJ/exec",
};