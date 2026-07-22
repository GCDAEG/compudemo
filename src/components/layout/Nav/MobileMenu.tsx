"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Phone, Cpu } from "lucide-react";
import { useLenis } from "lenis/react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { NavSection } from "@/lib/sections";

interface MobileMenuProps {
  sections: NavSection[];
  activeSection: string | null;
  isScrolled: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  sections,
  activeSection,
  isScrolled,
}) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  // Aseguramos que el portal solo se cree en el cliente
  useEffect(() => {
    const isMounted = () => {
      setMounted(true);
    };
    isMounted();
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "unset";
      lenis?.start();
    }
  }, [open, lenis]);

  const handleScroll = (id: string) => {
    setOpen(false);
    // Pequeño delay para que la animación de cierre no interrumpa el scroll
    setTimeout(() => {
      lenis?.scrollTo(`#${id}`, { offset: -80, duration: 1.2 });
    }, 300);
  };

  const menuContent = (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay - Fondo desenfocado estilo Apple */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[999] bg-zinc-900/20 backdrop-blur-md h-screen w-screen"
          />

          {/* Sheet - El Menú Lateral */}
          <div className="fixed top-0 right-0 h-dvh w-[85%] max-w-[320px] z-[1000] bg-white shadow-[-20px_0_40px_rgba(0,0,0,0.1)] flex flex-col">
            {/* Header del Sheet */}
            <div className="p-6 flex items-center justify-between border-b border-zinc-100">
              <div className="flex flex-col items-start gap-2">
                <div className=" rounded-lg flex items-center justify-center">
                  <Link
                    href="/"
                    className="relative w-40 h-10 block transition-opacity hover:opacity-80"
                  >
                    <Image
                      src="/logo.png"
                      alt="Compudemo"
                      fill
                      priority
                      className="object-contain "
                    />
                  </Link>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="size-10 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links de Navegación */}
            <nav className="flex-1 px-4 py-8 overflow-y-auto no-scrollbar">
              <p className="px-4 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4">
                Secciones
              </p>
              <ul className="space-y-2">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <button
                      onClick={() => handleScroll(sec.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all ${
                        activeSection === sec.id
                          ? "bg-blue-50 text-red-600"
                          : "text-zinc-500 hover:bg-zinc-50"
                      }`}
                    >
                      {sec.label}
                      <ChevronRight
                        size={16}
                        className={
                          activeSection === sec.id
                            ? "text-red-600"
                            : "text-zinc-300"
                        }
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer del Sheet */}
            <div className="p-6 bg-zinc-50 border-t border-zinc-100 space-y-4">
              <button
                onClick={() => handleScroll("contacto")}
                className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-zinc-900/10"
              >
                <Phone size={14} /> Contactar Ahora
              </button>
              <p className="text-[10px] text-center text-zinc-400 font-medium italic">
                Compudemo — 15 años de trayectoria
              </p>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Botón Trigger (El que se queda en el Nav) */}
      <div className="w-full h-full flex items-center px-6 lg:hidden">
        <div className="w-full flex justify-between items-center">
          <div className="font-bold text-zinc-900 uppercase tracking-tighter">
            <Link
              href="/"
              className="relative w-40 h-10 block transition-opacity hover:opacity-80"
            >
              <Image
                src="/logo.png"
                alt="Compudemo"
                fill
                priority
                className="object-contain "
              />
            </Link>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="size-10 bg-white border border-zinc-200 rounded-xl flex items-center justify-center text-zinc-900 shadow-sm active:scale-90 transition-transform"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {/* Renderizamos el contenido en un Portal al body */}
      {mounted && createPortal(menuContent, document.body)}
    </>
  );
};

export default MobileMenu;
