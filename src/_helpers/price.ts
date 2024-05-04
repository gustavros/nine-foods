import { Product } from "@prisma/client";

export function calculateProductTotalPrice(product: Product): number {
  if (product.discountPercentage === 0) {
    return Number(product.price);
  }

  const discount = (Number(product.price) * product.discountPercentage) / 100;

  return Number(product.price) - discount;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
}
