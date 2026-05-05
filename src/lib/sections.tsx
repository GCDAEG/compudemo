export type NavSection = {
  id: string;
  label: string;
  href?: string;
};

export const sections: NavSection[] = [
  {
    id: "hero",
    label: "Inicio",
  },
  {
    id: "catalog",
    label: "Productos", // O "Productos" / "Materiales"
  },
  {
    id: "location",
    label: "Ubicación",
  },
];
