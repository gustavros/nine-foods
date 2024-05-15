"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/_components/ui/dialog";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";
import { Button } from "@/_components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createProduct } from "../_actions/create-product";
import { Dispatch, SetStateAction, useContext } from "react";
import { TableContext } from "@/_context/table";

interface DashboardAddProductDialogProps {
  isAddProductDialogOpen: boolean;
  setIsAddProductDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export function DashboardAddProductDialog({
  isAddProductDialogOpen,
  setIsAddProductDialogOpen,
}: DashboardAddProductDialogProps) {
  const { categories } = useContext(TableContext);

  const form = useForm();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await createProduct({
        name: data.name,
        description: data.description,
        category: {
          connect: {
            id: data.categoryId,
          },
        },
        imageUrl: data.imageUrl,
        price: Number(data.price),
        discountPercentage: Number(data.discountPercentage),
        restaurant: {
          connect: {
            id: "f18568b8-a390-4683-9075-87bc05c6f8f0",
          },
        },
      });

      toast.success("Produto criado com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro ao criar o produto");
      console.log(error);
    }
  });

  return (
    <Dialog
      open={isAddProductDialogOpen}
      onOpenChange={setIsAddProductDialogOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar novo produto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-left">
                Nome
              </Label>
              <Input
                id="name"
                placeholder="Ex: Batata Frita"
                className="col-span-3"
                {...form.register("name")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description" className="text-left">
                Descrição
              </Label>
              <Input
                id="description"
                placeholder="Ex: Batata frita com mostarda..."
                className="col-span-3"
                {...form.register("description")}
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="imageUrl" className="text-left">
                URL da imagem
              </Label>
              <Input
                id="imageUrl"
                placeholder="URL da imagem do produto"
                className="mt-2"
                {...form.register("imageUrl")}
              />
              <small className="mt-1 pl-1 text-zinc-600">
                Exemplo: https://link-da-imagem
              </small>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="category">
                Selecione uma categoria para o produto
              </Label>

              <select className="col-span-3" {...form.register("categoryId")}>
                <Label htmlFor="categoryId">Selecione uma categoria</Label>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <hr className="my-4" />

            <div className="flex flex-col gap-2">
              <Label htmlFor="price" className="text-left">
                Preço (R$)
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="Ex: 20.40"
                className="col-span-3"
                {...form.register("price")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="discountPercentage" className="text-left">
                Desconto (%) do produto
              </Label>
              <Input
                id="discountPercentage"
                type="number"
                placeholder="Ex: 10"
                className="col-span-3"
                {...form.register("discountPercentage")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="mt-4 w-full">
              Adicionar produto
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
