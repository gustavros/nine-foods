"use client";

import { getProducts } from "@/app/dashboard/_actions/get-products";
import { Category, Product } from "@prisma/client";
import {
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { createContext, useEffect, useState } from "react";

interface ITableContext<> {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  isAddProductDialogOpen: boolean;
  setIsAddProductDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  columnVisibility: VisibilityState;
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
  rowSelection: RowSelectionState;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
}

export const TableContext = createContext<ITableContext>({
  products: [],
  setProducts: () => {},
  categories: [],
  setCategories: () => {},
  isAddProductDialogOpen: false,
  setIsAddProductDialogOpen: () => {},
  loading: false,
  setLoading: () => {},
  sorting: [],
  setSorting: () => {},
  columnFilters: [],
  setColumnFilters: () => {},
  columnVisibility: {},
  setColumnVisibility: () => {},
  rowSelection: {},
  setRowSelection: () => {},
});

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    setLoading(true);

    const fetchProducts = async () => {
      try {
        const productsFound = await getProducts();

        setProducts(productsFound);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <TableContext.Provider
      value={{
        categories,
        columnFilters,
        columnVisibility,
        isAddProductDialogOpen,
        loading,
        products,
        rowSelection,
        setCategories,
        setColumnFilters,
        setColumnVisibility,
        setIsAddProductDialogOpen,
        setLoading,
        setProducts,
        setRowSelection,
        setSorting,
        sorting,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
