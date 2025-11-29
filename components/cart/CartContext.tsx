"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { productos, type Producto } from "../../data/productos";

type CartLine = {
  id: number;
  quantity: number;
};

type CartItem = CartLine & {
  product: Producto;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  // Cargar carrito desde localStorage SOLO en el cliente
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("zamir-cart");
      if (raw) {
        setLines(JSON.parse(raw) as CartLine[]);
      }
    } catch {
      // ignore
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    try {
      window.localStorage.setItem("zamir-cart", JSON.stringify(lines));
    } catch {
      // ignore
    }
  }, [lines]);

  const addToCart = (id: number) => {
    const product = productos.find((p) => p.id === id);
    if (!product || !product.activo || product.stock <= 0) return;

    setLines((current) => {
      const existing = current.find((i) => i.id === id);
      const currentQty = existing?.quantity ?? 0;

      if (currentQty >= product.stock) return current;

      if (existing) {
        return current.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...current, { id, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    const product = productos.find((p) => p.id === id);
    if (!product || !product.activo) return;

    const clamped = Math.max(0, Math.min(quantity, product.stock));

    setLines((current) => {
      if (clamped === 0) {
        return current.filter((i) => i.id !== id);
      }
      const existing = current.find((i) => i.id === id);
      if (!existing) {
        return [...current, { id, quantity: clamped }];
      }
      return current.map((i) =>
        i.id === id ? { ...i, quantity: clamped } : i
      );
    });
  };

  const removeFromCart = (id: number) => {
    setLines((current) => current.filter((i) => i.id !== id));
  };

  const clearCart = () => setLines([]);

  const items: CartItem[] = lines
    .map((line) => {
      const product = productos.find(
        (p) => p.id === line.id && p.activo && p.stock > 0
      );
      if (!product) return null;
      const clampedQty = Math.min(line.quantity, product.stock);
      return { ...line, quantity: clampedQty, product };
    })
    .filter(Boolean) as CartItem[];

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextType = {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return ctx;
}
