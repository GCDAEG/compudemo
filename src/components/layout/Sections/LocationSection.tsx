"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  Clock,
  MessageCircle,
  Mail,
  ArrowUpRight,
  Navigation,
  ShieldCheck,
  Cpu,
} from "lucide-react";

const ContactSection = () => {
  const WHATSAPP_NUMBER = "5493446000000"; // Número oficial Computel

  return (
    <section
      id="location"
      className="py-24 bg-[#f5f5f7] relative overflow-hidden"
    >
      {/* Elementos decorativos sutiles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* ENCABEZADO ESTILO EDITORIAL */}
        <div className="mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-[0.3em]"
          >
            <Cpu size={14} /> Centro de Soporte & Ventas
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-semibold text-zinc-900 tracking-tight"
          >
            Estamos para{" "}
            <span className="text-zinc-400 font-light italic">ayudarte.</span>
          </motion.h3>
        </div>

        {/* GRID PRINCIPAL BENTO STYLE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* COLUMNA IZQUIERDA: Horarios y Contacto Rápido */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Tarjeta de Horarios - Computel Style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-200/50"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="size-10 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-100">
                  <Clock className="size-5 text-zinc-400" />
                </div>
                <h4 className="text-lg font-bold text-zinc-900 tracking-tight">
                  Horarios de Atención
                </h4>
              </div>

              <div className="space-y-5">
                {[
                  {
                    days: "Lunes a Viernes",
                    hours: "08:30 - 12:30 | 16:00 - 20:00",
                  },
                  { days: "Sábados", hours: "09:00 - 13:00" },
                  { days: "Domingos", hours: "Cerrado", special: true },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-1 border-b border-zinc-50 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                      {item.days}
                    </span>
                    <span
                      className={`text-sm font-semibold ${item.special ? "text-zinc-300" : "text-zinc-800"}`}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contacto Directo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-900 p-8 rounded-[2.5rem] flex flex-col gap-4 shadow-xl"
            >
              <button
                onClick={() =>
                  window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank")
                }
                className="w-full bg-primary hover:bg-blue-500 text-white p-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20"
              >
                <MessageCircle size={18} /> WhatsApp Técnico
              </button>

              <button
                onClick={() =>
                  (window.location.href = "mailto:contacto@computel.com.ar")
                }
                className="w-full bg-white/5 hover:bg-white/10 text-white p-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all border border-white/10 flex items-center justify-center gap-3"
              >
                <Mail size={16} /> Enviar Mail
              </button>
            </motion.div>
          </div>

          {/* COLUMNA DERECHA: Mapa y Ubicación */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8 relative bg-white border border-zinc-200/50 rounded-[2.5rem] overflow-hidden min-h-[450px] shadow-sm flex flex-col"
          >
            {/* Espacio para Mapa / Fachada */}
            <div className="relative flex-1 bg-zinc-100 overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop"
                alt="Computel Gualeguaychú"
                fill
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 grayscale-[50%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            </div>

            {/* Info de Ubicación */}
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 bg-white relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <MapPin className="size-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-zinc-900 tracking-tight">
                      Sede Central
                    </h4>
                    <p className="text-zinc-500 font-medium text-sm">
                      Urquiza 1234, Gualeguaychú, Entre Ríos.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto">
                <button
                  onClick={() =>
                    window.open(
                      "https://maps.google.com/?q=Computel+Gualeguaychú",
                      "_blank",
                    )
                  }
                  className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-4 rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Navigation size={14} /> Cómo Llegar{" "}
                  <ArrowUpRight size={14} />
                </button>
                <div className="flex items-center gap-2 px-2">
                  <ShieldCheck size={14} className="text-primary" />
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    Local Oficial Verificado
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
