import type { SiteContent } from "./types";

export const DEFAULT_SITE_CONTENT: SiteContent = {
  header: {
    logoLeft: "G",
    logoRight: "JC",
    links: [
      { href: "#historia", label: "Nosotros" },
      { href: "#lugar", label: "Lugar" },
      { href: "#confirmacion", label: "Confirmar" },
    ],
  },
  hero: {
    dateLine: "19 · Diciembre · 2026",
    name1: "Gabriela",
    name2: "Juan Camilo",
    tagline: "¡Nos casamos!",
    ctaText: "Confirmar asistencia",
  },
  countdown: {
    label: "Cuenta regresiva",
    weddingDateIso: "2026-12-19T19:00:00-03:00",
  },
  story: {
    eyebrow: "Nuestra historia",
    title: "4 años aprendiendo a bailar la misma canción",
    paragraph1:
      "Después de 4 años juntos, hemos decidido dar el gran paso. Queremos invitarlos a celebrar y compartir nuestro amor y nuestra música.",
    paragraph2: "Esperamos contar con ustedes este día tan especial para nosotros.",
    quote:
      "El matrimonio es ese gran paso que mezcla amor, compromiso y, seamos honestos, una buena dosis de paciencia y humor.",
    photoCaption: "Mendoza, 2022",
  },
  couple: {
    eyebrow: "Los protagonistas",
    title: "Dos voces,",
    titleAccent: "una",
    people: [
      {
        name: "Gabriela",
        photo: "/fotos/gabriela-retrato.jpg",
        description:
          "La voz de la casa. Soñadora, intensa y con una risa que llena cualquier escenario.",
        accent: "Ella canta",
      },
      {
        name: "Juan Camilo",
        photo: "/fotos/juancamilo-retrato.png",
        description:
          "Las cuerdas y el ritmo. Calmado, leal y con un humor que hace todo más liviano.",
        accent: "Él toca",
      },
    ],
  },
  gallery: {
    eyebrow: "Momentos",
    title: "Antes, durante",
    titleAccent: "y",
    description: "Pequeños recuerdos que nos llevaron a este día.",
    photos: [
      {
        src: "/fotos/infancia.jpg",
        alt: "Gabriela y Juan Camilo cuando eran pequeños",
        caption: "Antes de saber",
        subcaption: "Cada uno con un sueño que todavía no tenía nombre.",
      },
      {
        src: "/fotos/mendoza.jpg",
        alt: "Gabriela y Juan Camilo en Mendoza, Argentina",
        caption: "Mendoza · 2022",
        subcaption: "El primer viaje, cruzando la cordillera tomados de la mano.",
      },
      {
        src: "/fotos/20220730_115536.jpg",
        alt: "Gabriela y Juan Camilo en las calles coloniales de Cartagena",
        caption: "Cartagena",
        subcaption: "Un beso entre balcones de colores y cielo del Caribe.",
      },
      {
        src: "/fotos/20220806_115518.jpg",
        alt: "Gabriela con sombrero vueltiao junto a Juan Camilo en Colombia",
        caption: "Tierra caribe",
        subcaption: "Sombrero vueltiao y el calor de Colombia en la piel.",
      },
      {
        src: "/fotos/20220919_135242.jpg",
        alt: "Gabriela y Juan Camilo con chupallas en el campo chileno",
        caption: "Dieciocho",
        subcaption: "De vuelta en casa, celebrando lo nuestro a lo chileno.",
      },
      {
        src: "/fotos/IMG_20221023_131056_285.jpg",
        alt: "Gabriela y Juan Camilo elegantes en una fiesta",
        caption: "De gala",
        subcaption: "Elegantes por fuera, los mismos de siempre por dentro.",
      },
      {
        src: "/fotos/viaje-palmeras.jpg",
        alt: "Gabriela y Juan Camilo entre palmeras",
        caption: "Viajando juntos",
        subcaption: "Persiguiendo el verano y los buenos recuerdos.",
      },
      {
        src: "/fotos/pareja-arbol.jpg",
        alt: "Gabriela y Juan Camilo bajo un árbol",
        caption: "Hoy",
        subcaption: "Listos para dar el gran paso.",
      },
    ],
  },
  details: {
    eyebrow: "El gran día",
    title: "Lugar",
    titleAccent: "y",
    description: "Vamos a compartir y vamos a cantar.",
    items: [
      { label: "Fecha", value: "Sábado", accent: "19 · 12 · 2026" },
      { label: "Hora", value: "19:00", accent: "Ceremonia y celebración" },
      { label: "Lugar", value: "Route G25", accent: "San José de Maipo" },
    ],
  },
  dressCode: {
    eyebrow: "Dress code",
    title: "Semi",
    titleAccent: "formal",
    description: "Queremos que se sientan cómodos y especiales.",
    womenTitle: "Mujeres",
    womenBody: "Vestidos de cualquier largo, enteritos o palazos.",
    menTitle: "Hombres",
    menBody: "Camisa y pantalón. La corbata es opcional.",
  },
  gift: {
    eyebrow: "Un detalle especial",
    title: "Tu compañía es nuestro",
    titleAccent: "mayor",
    body: "Ya tenemos lo básico para nuestro hogar, pero si desean hacernos un obsequio, recibiremos con mucho cariño un aporte para nuestra luna de miel y futuros proyectos juntos.",
    buttonText: "Contribuir vía Mercado Pago",
    mercadoPagoUrl: "https://link.mercadopago.cl/gabrielayjuancamilo",
    linkLabel: "link.mercadopago.cl/gabrielayjuancamilo",
  },
  rsvp: {
    eyebrow: "Confirmación",
    title: "¿Nos",
    titleAccent: "acompañas",
    description:
      "Recuerda confirmar aquí. Para nosotros es muy importante contar contigo y poder planificar tu asistencia.",
  },
  guestbook: {
    eyebrow: "Libro de deseos",
    title: "Déjanos tu",
    titleAccent: "deseo",
    description:
      "Firma nuestro libro y déjanos unas palabras. Tus deseos quedarán flotando aquí, acompañándonos en este nuevo capítulo.",
    namePlaceholder: "Tu nombre",
    messagePlaceholder: "Escribe tu deseo para los novios…",
    buttonText: "Firmar el libro",
    successTitle: "¡Gracias por tus palabras!",
    successBody: "Tu deseo ya forma parte de nuestro libro. Lo guardaremos con mucho cariño.",
    emptyText: "Sé la primera persona en dejar un deseo a los novios.",
  },
  faq: {
    eyebrow: "Otros datos",
    title: "Buenas",
    titleAccent: "a saber",
    items: [
      {
        title: "¿Pueden venir niños?",
        body: "Esta noche los padres disfrutan y los niños duermen en casa.",
      },
      {
        title: "¿Hasta cuándo confirmo?",
        body: "Por favor confírmanos tu asistencia hasta el 30 de noviembre de 2026.",
      },
    ],
    lodgingTitle: "¿Dónde puedo alojar?",
    lodgingBody:
      "Si necesitas alojamiento para esa noche, Route G25 tiene cabañas. Puedes tomar contacto directo con ellos.",
    lodgingInstagram: "https://www.instagram.com/routeg25/",
    lodgingPhone: "+56957661602",
  },
  footer: {
    quote:
      "Un gran matrimonio no es cuando una pareja perfecta se une, sino cuando una pareja imperfecta aprende a disfrutar de sus diferencias.",
    quoteAccent: "pareja perfecta",
    name1: "Gabriela",
    name2: "Juan Camilo",
    dateLine: "19 · 12 · 2026",
  },
};

export const ADMIN_EMAIL = "rauteh@hotmail.com";
