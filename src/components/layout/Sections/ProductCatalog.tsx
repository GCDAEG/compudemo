"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Plus,
  X,
  ShoppingCart,
  Loader2,
  CreditCard,
  ShieldCheck,
  Send,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  const lenis = useLenis();

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "unset";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "unset";
      lenis?.start();
    };
  }, [selectedProduct, lenis]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/electronics")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation(); // Evita abrir el modal al clickear el botón
    addToCart({
      image: p.image,
      title: p.title,
      category: p.category,
      price: `${p.price}`,
      id: `${p.id}`,
    });

    // Feedback visual inmediato
    toast.success(`${p.title.substring(0, 20)}... añadido`, {
      icon: <CheckCircle2 className="text-green-500 size-5" />,
      description: "Se agregó correctamente a tu carrito.",
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [products, searchTerm]);

  if (loading)
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={32} />
        <p className="text-zinc-400 text-sm font-medium">
          Sincronizando stock...
        </p>
      </div>
    );

  return (
    <section id="catalog" className="bg-[#f5f5f7] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
            Hardware{" "}
            <span className="text-primary font-bold">Seleccionado</span>
          </h2>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar componentes..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-zinc-200 outline-none focus:ring-2 focus:ring-blue-600/10 transition-all text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* BENTO GRID CON ACCIÓN RÁPIDA */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {filteredProducts.map((p, index) => {
            const isLarge = index === 0 || index === 3;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className={`group bg-white rounded-3xl p-5 cursor-pointer border border-zinc-100 hover:border-blue-600/20 transition-all duration-300 hover:shadow-lg active:scale-[0.98] flex flex-col justify-between overflow-hidden relative ${
                  isLarge ? "col-span-2 row-span-2" : "col-span-1"
                }`}
              >
                <div className="relative z-10 flex justify-between items-start">
                  <div className="max-w-[80%]">
                    <h3
                      className={`font-bold text-zinc-900 leading-tight ${isLarge ? "text-xl md:text-2xl mb-1" : "text-[11px] md:text-sm line-clamp-2"}`}
                    >
                      {p.title}
                    </h3>
                    <span className="text-primary font-bold text-sm md:text-lg">
                      ${p.price.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>
                {/* Botón rápido de carrito en la Card */}
                <button
                  onClick={(e) => handleAddToCart(e, p)}
                  className="absolute left-3 z-50 bottom-5 size-8 md:size-10 bg-zinc-50 border border-zinc-100 text-zinc-400 active:bg-blue-600 lg:hover:bg-blue-600 active:text-white lg:hover:text-white hover:border-blue-600 rounded-xl flex items-center justify-center transition-all lg:opacity-0 lg:group-hover:opacity-100 transform translate-y-2 lg:group-hover:translate-y-0 shadow-sm"
                >
                  <ShoppingCart size={isLarge ? 20 : 16} />
                </button>
                <div className="relative flex-1 w-full p-2 transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Indicador visual de "Ver más" */}
                <div className="absolute bottom-4 right-4 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                  Detalles <Plus size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PANEL LATERAL (SIDE PANEL) */}
      <div
        className={`fixed inset-0 z-[600] transition-opacity duration-300 ${selectedProduct ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-black/10 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        />
        <div
          data-lenis-prevent
          className={`absolute top-0 right-0 h-full w-full md:w-[450px] bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${selectedProduct ? "translate-x-0" : "translate-x-full"}`}
        >
          {selectedProduct && (
            <>
              <div className="p-6 flex items-center justify-between border-b border-zinc-100 shrink-0">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
                  {selectedProduct.category}
                </span>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 overscroll-contain">
                <div className="relative w-full aspect-square bg-[#f5f5f7] rounded-[2rem] p-8 mb-8">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <h2 className="text-2xl font-bold text-zinc-900 leading-tight mb-4">
                  {selectedProduct.title}
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8 font-medium">
                  {selectedProduct.description}
                </p>

                <div className="space-y-4 pt-6 border-t border-zinc-100">
                  <div className="flex items-center gap-3 text-emerald-600">
                    <ShieldCheck size={18} />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Garantía Escrita 12 meses
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-400">
                    <CreditCard size={18} />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Cuotas fijas con tarjeta
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-zinc-50 border-t border-zinc-100 shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-zinc-400 font-medium uppercase text-[10px] tracking-widest">
                    Precio Final
                  </span>
                  <span className="text-3xl font-bold text-zinc-900">
                    ${selectedProduct.price.toLocaleString("es-AR")}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  <button
                    onClick={(e) => handleAddToCart(e, selectedProduct)}
                    className="col-span-1 bg-white border border-zinc-200 text-zinc-900 py-4 rounded-xl flex items-center justify-center transition-colors duration-400 hover:bg-zinc-100 active:scale-90 active:bg-green-500"
                  >
                    <ShoppingCart size={20} />
                  </button>
                  <button className="col-span-4 bg-zinc-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition-colors shadow-lg active:scale-[0.98]">
                    Pedir <Send size={16} />
                  </button>
                </div>
              </div>
              <Toaster
                position="top-center"
                theme="dark"
                closeButton
                duration={2000}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
