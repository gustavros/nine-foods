/* eslint-disable no-unused-vars */
"use client";

import { calculateProductTotalPrice } from "@/_helpers/price";
import { Prisma } from "@prisma/client";
import { ReactNode, createContext, useMemo, useState } from "react";

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          deliveryFee: true;
          deliveryTimeMinutes: true;
          id: true;
        };
      };
    };
  }> {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  subtotalPrice: number;
  totalPrice: number;
  totalDiscounts: number;
  totalQuantity: number;
  addProductToCart: ({
    product,
    emptyCart,
  }: {
    product: CartProduct;
    emptyCart?: boolean;
  }) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  totalPrice: 0,
  subtotalPrice: 0,
  totalDiscounts: 0,
  totalQuantity: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const clearCart = () => {
    return setProducts([]);
  };

  const totalQuantity: ICartContext["totalQuantity"] = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);
  }, [products]);

  const subtotalPrice: ICartContext["subtotalPrice"] = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity;
    }, 0);
  }, [products]);

  const totalPrice: ICartContext["totalPrice"] = useMemo(() => {
    return (
      products.reduce((acc, product) => {
        return acc + calculateProductTotalPrice(product) * product.quantity;
      }, 0) + Number(products?.[0]?.restaurant?.deliveryFee)
    );
  }, [products]);

  const totalDiscounts =
    subtotalPrice - totalPrice + Number(products?.[0]?.restaurant?.deliveryFee);

  const removeProductFromCart: ICartContext["removeProductFromCart"] = (
    productId: string,
  ) => {
    return setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id !== productId),
    );
  };

  const increaseProductQuantity: ICartContext["increaseProductQuantity"] = (
    productId: string,
  ) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }

        return cartProduct;
      }),
    );
  };

  const decreaseProductQuantity: ICartContext["decreaseProductQuantity"] = (
    productId,
  ) => {
    return setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          if (cartProduct.quantity === 1) {
            return cartProduct;
          }

          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }

        return cartProduct;
      }),
    );
  };

  const addProductToCart: ICartContext["addProductToCart"] = ({
    product,
    emptyCart,
  }) => {
    // if emptyCart is true, remove all products from the cart
    if (emptyCart) {
      setProducts([]);
    }

    // check if the product is already on the cart
    const isProductAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    // if the product is already on the cart, update the quantity
    if (isProductAlreadyOnCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }

          return cartProduct;
        }),
      );
    }

    // if the product is not on the cart, add it
    setProducts((prev) => [...prev, { ...product }]);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        removeProductFromCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        subtotalPrice,
        totalPrice,
        totalDiscounts,
        totalQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
