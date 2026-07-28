import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cafenova_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    try {
      localStorage.setItem("cafenova_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== id));
    toast.error("Item removed from order");
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToCartAndCheckout = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to your order!`, {
      icon: '🍽️',
      style: {
        borderRadius: '12px',
        background: '#0f172a',
        color: '#fff',
        border: '1px solid rgba(99,102,241,0.3)',
      },
    });
    navigate("/order");
  };

  const addMultipleToCartAndCheckout = (items) => {
    setCartItems((prevItems) => {
      let updated = [...prevItems];
      items.forEach((item) => {
        const existingIndex = updated.findIndex((i) => i.id === item.id);
        if (existingIndex > -1) {
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + 1,
          };
        } else {
          updated.push({ ...item, quantity: 1 });
        }
      });
      return updated;
    });
    toast.success(`Must-Try tasting experience added to your order!`, {
      icon: '🌟',
      style: {
        borderRadius: '12px',
        background: '#0f172a',
        color: '#fff',
        border: '1px solid rgba(99,102,241,0.4)',
      },
    });
    navigate("/order");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const totalCount = cartItems.reduce(
    (count, item) => count + (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToCartAndCheckout,
        addMultipleToCartAndCheckout,
        subtotal,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
