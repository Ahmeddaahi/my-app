"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product } from "@/lib/data";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  total: number;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  items: [],
  total: 0,
};

// Load cart from localStorage on client side
const loadCartFromStorage = (): CartState => {
  if (typeof window === "undefined") return initialState;
  
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : initialState;
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return initialState;
  }
};

// Save cart to localStorage
const saveCartToStorage = (cart: CartState) => {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity = 1 } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        
        const newState = {
          ...state,
          items: updatedItems,
          total: calcTotal(updatedItems),
        };
        
        saveCartToStorage(newState);
        return newState;
      } else {
        // Add new item
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0] || "/placeholder-product.png",
          quantity,
        };
        
        const newState = {
          ...state,
          items: [...state.items, newItem],
          total: calcTotal([...state.items, newItem]),
        };
        
        saveCartToStorage(newState);
        return newState;
      }
    }
    
    case "REMOVE_ITEM": {
      const filteredItems = state.items.filter(item => item.id !== action.payload.id);
      
      const newState = {
        ...state,
        items: filteredItems,
        total: calcTotal(filteredItems),
      };
      
      saveCartToStorage(newState);
      return newState;
    }
    
    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        // If quantity is 0 or negative, remove the item
        return cartReducer(state, { type: "REMOVE_ITEM", payload: { id } });
      }
      
      const updatedItems = state.items.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      
      const newState = {
        ...state,
        items: updatedItems,
        total: calcTotal(updatedItems),
      };
      
      saveCartToStorage(newState);
      return newState;
    }
    
    case "CLEAR_CART": {
      saveCartToStorage(initialState);
      return initialState;
    }
    
    default:
      return state;
  }
};

// Helper function to calculate total
const calcTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

// Create context
type CartContextType = {
  state: CartState;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Initialize cart from localStorage on first render
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    if (savedCart.items.length > 0) {
      dispatch({ type: "CLEAR_CART" });  // Clear first to avoid double dispatch
      savedCart.items.forEach(item => {
        // Reconstruct a product-like object
        const productLike: Product = {
          id: item.id,
          name: item.name,
          price: item.price,
          images: [item.image],
          description: "",
          stock: 1,
          sku: "",
          categoryId: "",
          featured: false,
        };
        dispatch({ 
          type: "ADD_ITEM", 
          payload: { product: productLike, quantity: item.quantity } 
        });
      });
    }
  }, []);
  
  const addItem = (product: Product, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
  };
  
  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  
  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
} 