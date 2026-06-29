export type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
  subcaption: string;
};

export type FaqItem = {
  title: string;
  body: string;
};

export type DetailItem = {
  label: string;
  value: string;
  accent: string;
};

export type CouplePerson = {
  name: string;
  photo: string;
  description: string;
  accent: string;
};

export type NavLink = {
  href: string;
  label: string;
};

export type SiteContent = {
  header: {
    logoLeft: string;
    logoRight: string;
    links: NavLink[];
  };
  hero: {
    dateLine: string;
    name1: string;
    name2: string;
    tagline: string;
    ctaText: string;
  };
  countdown: {
    label: string;
    weddingDateIso: string;
  };
  story: {
    eyebrow: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    quote: string;
    photoCaption: string;
  };
  couple: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    people: CouplePerson[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    photos: GalleryPhoto[];
  };
  details: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    items: DetailItem[];
  };
  dressCode: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    womenTitle: string;
    womenBody: string;
    menTitle: string;
    menBody: string;
  };
  gift: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body: string;
    buttonText: string;
    mercadoPagoUrl: string;
    linkLabel: string;
  };
  rsvp: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
  };
  guestbook: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    namePlaceholder: string;
    messagePlaceholder: string;
    buttonText: string;
    successTitle: string;
    successBody: string;
    emptyText: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    items: FaqItem[];
    lodgingTitle: string;
    lodgingBody: string;
    lodgingInstagram: string;
    lodgingPhone: string;
  };
  footer: {
    quote: string;
    quoteAccent: string;
    name1: string;
    name2: string;
    dateLine: string;
  };
};
