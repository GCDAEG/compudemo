"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import DesktopMenu from "./Nav/DesktopMenu"; // Ajustá esta ruta si es necesario
import MobileMenu from "./Nav/MobileMenu";
import { motion } from "framer-motion";
import { useWindowScroll } from "react-use";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { sections } from "@/lib/sections";

export function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const { y } = useWindowScroll();

  // Detectamos si el usuario scrolleó más allá de la primera vista (ej. 80px)
  const isScrolled = y > 80;

  const activeSection = useScrollSpy(sections.map((s) => s.id));

  return (
    <motion.nav
      layout
      ref={ref}
      className={cn(
        "sticky top-0 left-0 w-full z-[100] transition-all duration-300 h-20",
        // Hacemos el navbar transparente arriba de todo, y le damos fondo al scrollear
        isScrolled
          ? " bg-white/90 backdrop-blur-md   shadow-sm"
          : " bg-transparent",
      )}
    >
      <DesktopMenu
        sections={sections}
        activeSection={activeSection}
        isScrolled={isScrolled}
      />
      <MobileMenu
        sections={sections}
        activeSection={activeSection}
        isScrolled={isScrolled}
      />
    </motion.nav>
  );
}
