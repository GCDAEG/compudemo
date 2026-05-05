"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  X,
  Trash2,
  Plus,
  Minus,
  Check,
  Truck,
  Store,
  ChevronLeft,
  ArrowRight,
  MapPin,
  FileText,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [showWSModal, setShowWSModal] = useState(false);
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">(
    "pickup",
  );
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  const WHATSAPP_NUMBER = "5493446000000"; // Número de Computel Gualeguaychú
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const generateWSMessage = (): string => {
    const productList = cart
      .map(
        (item) =>
          `• ${item.quantity}x ${item.title.toUpperCase()} ($${(Number(item.price) * item.quantity).toLocaleString("es-AR")})`,
      )
      .join("\n");

    const header = `💻 *NUEVO PEDIDO - COMPUTEL*`;
    const deliveryInfo =
      deliveryType === "delivery"
        ? `🛵 *ENVÍO A DOMICILIO*\n📍 *DIRECCIÓN:* ${address}`
        : `🏪 *RETIRO EN LOCAL (Gualeguaychú)*`;

    const notesInfo = notes ? `\n\n📝 *CONSULTAS TÉCNICAS:* ${notes}` : "";

    return `${header}\n\n${deliveryInfo}${notesInfo}\n\n*DETALLE DEL HARDWARE:*\n${productList}\n\n*TOTAL FINAL: $${totalPrice.toLocaleString("es-AR")}*\n\n_(Incluye garantía oficial escrita)_`;
  };

  const handleFinalSend = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(generateWSMessage())}`,
      "_blank",
    );
    setShowWSModal(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* --- TRIGGER FLOTANTE --- */}
      <AnimatePresence>
        {totalItems > 0 && !isOpen && (
          <motion.div
            initial={{ y: 100, x: "-50%" }}
            animate={{ y: 0, x: "-50%" }}
            exit={{ y: 100, x: "-50%" }}
            className="fixed bottom-6 left-1/2 w-[92%] max-w-md z-[500]"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="w-full h-18 bg-zinc-900 text-white rounded-2xl px-6 flex items-center justify-between shadow-2xl hover:bg-zinc-800 transition-all active:scale-95"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ShoppingBag className="size-6" />
                  <span className="absolute -top-2 -right-2 size-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-zinc-900">
                    {totalItems}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 leading-none">
                    Mi Carrito
                  </p>
                  <p className="text-sm font-semibold">Finalizar compra</p>
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight">
                ${totalPrice.toLocaleString("es-AR")}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DRAWER --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`fixed inset-0 z-[550] flex justify-end `}
          >
            <div className="bg-black/40 absolute left-0 w-full h-full inset-0" />
            <div className="flex flex-col h-full w-full max-w-2xl bg-zinc-50 lg:border-l border-zinc-200 relative z-50">
              <div className="px-6 py-6 flex items-center justify-between border-b border-zinc-200 bg-white">
                <div className="flex items-center gap-2">
                  {step === 2 && (
                    <button
                      onClick={() => setStep(1)}
                      className="p-2 -ml-2 text-primary"
                    >
                      <ChevronLeft size={24} />
                    </button>
                  )}
                  <h2 className="text-xl font-bold tracking-tight text-zinc-900">
                    {step === 1 ? "Tu Selección" : "Método de Entrega"}
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="size-10 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {step === 1 ? (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-4 rounded-2xl border border-zinc-200 flex gap-4 relative shadow-sm"
                      >
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="absolute top-4 right-4 text-zinc-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="relative size-20 rounded-xl overflow-hidden shrink-0 border border-zinc-100">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <h4 className="font-bold text-zinc-900 text-sm line-clamp-1 pr-8">
                            {item.title}
                          </h4>
                          <div className="flex items-center justify-between">
                            <p className="text-primary font-bold">
                              $
                              {(
                                Number(item.price) * item.quantity
                              ).toLocaleString("es-AR")}
                            </p>
                            <div className="flex items-center gap-3 bg-zinc-50 p-1 rounded-lg border border-zinc-100">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                                className="size-7 flex items-center justify-center text-zinc-400"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="font-bold text-xs">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="size-7 flex items-center justify-center bg-zinc-900 text-white rounded-md"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6 pt-2">
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setDeliveryType("pickup")}
                        className={cn(
                          "flex flex-col items-center gap-3 py-6 rounded-2xl border-2 transition-all",
                          deliveryType === "pickup"
                            ? "border-blue-600 bg-blue-50/50 text-primary"
                            : "border-zinc-200 bg-white",
                        )}
                      >
                        <Store size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          Retiro en Local
                        </span>
                      </button>
                      <button
                        onClick={() => setDeliveryType("delivery")}
                        className={cn(
                          "flex flex-col items-center gap-3 py-6 rounded-2xl border-2 transition-all",
                          deliveryType === "delivery"
                            ? "border-blue-600 bg-blue-50/50 text-primary"
                            : "border-zinc-200 bg-white",
                        )}
                      >
                        <Truck size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          Envío a Casa
                        </span>
                      </button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-zinc-200 space-y-4">
                      {deliveryType === "delivery" && (
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                            <MapPin size={14} className="text-primary" />{" "}
                            Dirección en Gualeguaychú
                          </label>
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Ej: Urquiza 123, entre 25 y San Martín"
                            className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl outline-none font-semibold text-sm"
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                          <FileText size={14} className="text-primary" /> Notas
                          o consultas
                        </label>
                        <textarea
                          rows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Ej: Consultar compatibilidad con motherboard B450..."
                          className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl outline-none font-semibold text-sm resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8 bg-white border-t border-zinc-100 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-zinc-900">Total</span>
                  <span className="text-3xl font-bold text-primary">
                    ${totalPrice.toLocaleString("es-AR")}
                  </span>
                </div>
                <button
                  onClick={() =>
                    step === 1 ? setStep(2) : setShowWSModal(true)
                  }
                  disabled={deliveryType === "delivery" && !address.trim()}
                  className="w-full h-16 bg-zinc-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 disabled:opacity-30 transition-all hover:bg-zinc-800"
                >
                  {step === 1
                    ? "Confirmar Selección"
                    : "Coordinar por WhatsApp"}
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PREVIEW WHATSAPP --- */}
      <AnimatePresence>
        {showWSModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl border border-zinc-200"
            >
              <div className="bg-[#075E54] p-6 text-white flex items-center gap-4">
                <div className="size-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="font-bold uppercase tracking-widest text-sm">
                    Computel Gualeguaychú
                  </p>
                  <p className="text-[10px] font-medium opacity-75 uppercase tracking-widest">
                    Canal de Ventas Oficial
                  </p>
                </div>
              </div>
              <div className="bg-[#E5DDD5] p-6 min-h-[250px] flex items-end">
                <div className="bg-[#DCF8C6] p-4 rounded-2xl rounded-tr-none text-[12px] font-medium leading-relaxed shadow-sm whitespace-pre-wrap">
                  {generateWSMessage()}
                </div>
              </div>
              <div className="p-6 flex gap-3 bg-white">
                <button
                  onClick={() => setShowWSModal(false)}
                  className="flex-1 py-4 text-xs font-bold uppercase text-zinc-400 hover:bg-zinc-50 rounded-2xl transition-colors"
                >
                  Atrás
                </button>
                <button
                  onClick={handleFinalSend}
                  className="flex-[2] py-4 bg-[#25D366] text-white rounded-2xl font-bold uppercase text-xs flex items-center justify-center gap-2 shadow-lg shadow-green-200"
                >
                  Enviar Pedido
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
