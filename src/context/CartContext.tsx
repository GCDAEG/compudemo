"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  id: string;
  title: string;
  price: string;
  category: string;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // 1. Inicializamos el estado con una función de inicialización perezosa (Lazy Initializer)
  // Esto evita el error de setState dentro del useEffect y problemas de hidratación.
  const [cart, setCart] = useState<CartItem[]>([]);

  // 2. Efecto para CARGAR: Se ejecuta solo una vez al montar en el cliente
  useEffect(() => {
    const savedCart = localStorage.getItem("ts-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart", e);
      }
    }
  }, []);

  // 3. Efecto para GUARDAR: Solo guarda si el carrito tiene algo o si ya existía algo previo
  useEffect(() => {
    // Evitamos guardar un array vacío sobre algo que ya existía durante el primer render
    if (cart.length > 0) {
      localStorage.setItem("ts-cart", JSON.stringify(cart));
    } else if (cart.length === 0 && localStorage.getItem("ts-cart")) {
      // Si el carrito se vació intencionalmente (botón vaciar), ahí sí actualizamos
      localStorage.setItem("ts-cart", JSON.stringify([]));
    }
  }, [cart]);

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("ts-cart");
  };

  const totalPrice = cart.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
    return acc + priceNum * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
