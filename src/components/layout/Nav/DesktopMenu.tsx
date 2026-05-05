"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { Phone, ShieldCheck } from "lucide-react";
import { NavSection } from "@/lib/sections";

interface DesktopMenuProps {
  sections: NavSection[];
  activeSection: string | null;
  isScrolled: boolean;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({
  sections,
  activeSection,
  isScrolled,
}) => {
  const lenis = useLenis();

  return (
    <div className="hidden lg:flex w-full h-full items-center px-8">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
        {/* LOGO: Aparece solo al scrollear */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: isScrolled ? 1 : 0,
            x: isScrolled ? 0 : -20,
            pointerEvents: isScrolled ? "auto" : "none",
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Link
            href="/"
            className="relative w-40 h-10 block transition-opacity hover:opacity-80"
          >
            <Image
              src="/logo.webp"
              alt="Computel"
              fill
              priority
              className="object-contain "
            />
          </Link>
        </motion.div>

        <ul className="flex items-center gap-8">
          {sections.map((s) => (
            <li key={s.id} className="relative py-2">
              <button
                onClick={() => lenis?.scrollTo(`#${s.id}`, { offset: -80 })}
                className={`text-[12px] font-semibold uppercase tracking-[0.15em] transition-colors ${
                  activeSection === s.id
                    ? "text-primary"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {s.label}
              </button>
              {activeSection === s.id && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary rounded-full"
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 pr-6 border-r border-zinc-100">
            <ShieldCheck size={18} className="text-blue-600" />
            <span className="text-[11px] font-bold text-zinc-900 uppercase tracking-tight">
              Garantía Escrita
            </span>
          </div>
          <button
            onClick={() => lenis?.scrollTo("#contacto")}
            className="bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Phone size={14} /> Contactar Asesor
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopMenu;
