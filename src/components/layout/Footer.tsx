"use client";
import {
  Instagram,
  Facebook,
  Cpu,
  ArrowRight,
  MapPin,
  Phone,
  Zap,
  Globe,
} from "lucide-react";
import { useLenis } from "lenis/react";
import { sections } from "@/lib/sections";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site/siteConfig";

export function FooterSection() {
  const lenis = useLenis();

  return (
    <footer className="bg-zinc-100 border-t border-zinc-900 pb-12 relative overflow-hidden">
      {/* Luz de fondo sutil (Azul Compudemo) */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full pt-20  px-6 lg:px-12 relative z-10">
        {/* 1. CAJA CTA SUPERIOR - Hardware de Confianza */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-24 shadow-2xl relative overflow-hidden group">
          <div className="text-center md:text-left max-w-xl relative z-10 space-y-3">
            <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
              ¿Tu equipo necesita un{" "}
              <span className="text-primary font-light italic">upgrade?</span>
            </h3>
            <p className="text-zinc-400 font-medium text-sm md:text-base">
              Visítanos en nuestro local oficial y recibe asesoramiento técnico
              especializado para potenciar tu productividad.
            </p>
          </div>
          <button
            onClick={() => lenis?.scrollTo("#contacto", { offset: -80 })}
            className="relative z-10 whitespace-nowrap px-8 py-5 bg-white text-primary font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-blue-500 transition-all flex items-center gap-3 active:scale-95 w-full md:w-auto justify-center shadow-lg shadow-blue-600/20"
          >
            <Zap className="size-4 fill-current" />
            Contactar Asesor
            <ArrowRight className="size-4" />
          </button>
        </div>

        {/* 2. GRILLA DE NAVEGACIÓN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Columna 1: Marca */}
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="flex items-center gap-3 group w-full "
              onClick={() => lenis?.scrollTo(0)}
            >
              <div className="relative w-full h-20">
                <Image
                  src="/logo.png"
                  alt="Compudemo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-zinc-400 font-medium leading-relaxed">
              20 años liderando la provisión de hardware y servicio técnico
              oficial en la región. Calidad certificada y respaldo garantizado.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="size-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-blue-600 transition-all"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">
              Secciones
            </h4>
            <ul className="flex flex-col gap-4">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() =>
                      lenis?.scrollTo(`#${section.id}`, { offset: -80 })
                    }
                    className="text-sm text-zinc-400 font-bold hover:text-white transition-colors text-left uppercase tracking-[0.15em]"
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Especialidades */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">
              Servicios
            </h4>
            <ul className="flex flex-col gap-4 text-xs text-zinc-400 font-bold uppercase tracking-[0.15em]">
              <li className="hover:text-zinc-200 transition-colors">
                Armado de PC Gamer
              </li>
              <li className="hover:text-zinc-200 transition-colors">
                Servicio Técnico Mac
              </li>
              <li className="hover:text-zinc-200 transition-colors">
                Infraestructura IT
              </li>
              <li className="hover:text-zinc-200 transition-colors">
                Garantía Oficial
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">
              Ubicación
            </h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-3 text-sm text-zinc-400 font-medium">
                <Phone className="size-4 text-primary shrink-0 mt-0.5" />
                <span>
                  +54 9 3446 00-0000
                  <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-1 block">
                    Gualeguaychú, Entre Ríos
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-400 font-medium">
                <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
                <span>
                  Urquiza 1234
                  <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-1 block">
                    Sede Central
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. COPYRIGHT */}
        <div className="border-t border-zinc-900 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            © {new Date().getFullYear()} {siteConfig.brand.name}. Todos los
            derechos reservados.
          </p>
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            <span>Powered by</span>
            <a
              href="https://tuwebhoy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors"
            >
              TUWEBHOY
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
