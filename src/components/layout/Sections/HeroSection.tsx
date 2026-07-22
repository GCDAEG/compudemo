"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Wrench, MapPin } from "lucide-react";
import { useLenis } from "lenis/react";

const HeroSection = () => {
  const lenis = useLenis();

  return (
    <section
      id="hero"
      className="bg-white relative w-full  flex items-center overflow-hidden py-12"
    >
      <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12 px-6 lg:px-12">
        {/* TEXTO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="z-10 w-full lg:w-1/2 flex flex-col gap-3 max-h-full "
        >
          {/* <div className="relative border h-20 w-1/2">
            <Image
              src="/logo.png"
              alt="Compudemo"
              fill={true}
              priority
              className=" lg:w-1/2 object-contain"
            />
          </div> */}
          <h1 className="text-4xl md:text-4xl font-semibold text-zinc-900 leading-none">
            Todo en informática y tecnología
            <span className="block text-primary">en Gualeguaychú</span>
          </h1>

          <p className="text-base md:text-sm text-zinc-600 max-w-md leading-relaxed">
            Computadoras, componentes, periféricos y servicio técnico
            especializado. Asesoramiento real para que compres lo que necesitás.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => lenis?.scrollTo("#catalog")}
              className="bg-zinc-900 text-white px-8 py-4 rounded-xl font-semibold text-sm hover:bg-zinc-800 transition-all flex items-center gap-2 group"
            >
              Ver productos
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="border border-zinc-300 px-8 py-4 rounded-xl text-sm font-semibold hover:bg-zinc-100 transition">
              Consultar por WhatsApp
            </button>
          </div>

          {/* BADGES */}
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-zinc-100">
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="size-4 text-primary" /> Garantía real
            </div>

            <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-wider">
              <Wrench className="size-4 text-primary" /> Servicio técnico
            </div>

            <div className="flex items-center gap-2 text-zinc-500 text-xs font-semibold uppercase tracking-wider">
              <MapPin className="size-4 text-primary" /> Local físico
            </div>
          </div>
        </motion.div>

        {/* IMAGEN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full lg:w-1/2 h-[420px] hidden lg:block rounded-[2rem] overflow-hidden shadow-xl border border-zinc-100"
        >
          <Image
            src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop"
            alt="Computación y hardware"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
