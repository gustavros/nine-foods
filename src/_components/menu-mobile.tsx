import {
  MenuIcon,
  LogIn,
  HomeIcon,
  ScrollTextIcon,
  HeartIcon,
  UtensilsIcon,
  SandwichIcon,
  PizzaIcon,
  FishIcon,
  IceCreamIcon,
  GrapeIcon,
  LogOutIcon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export default function MenuMobile() {
  const { data } = useSession();

  // CRIAR FUNÇÃO PARA FAZER LOGIN SE O USUARIO NÃO ESTIVER LOGADO
  function handleWithLoginIfUserNotLogged() {
    if (!data?.user) {
      return signIn("google");
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-dvw ">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        {data?.user?.name ? (
          <div className="flex items-center justify-between pt-6">
            <div className="flex items-center gap-3 ">
              <Avatar>
                {data.user.image && (
                  <AvatarImage src={data.user.image} alt={data.user.name} />
                )}
                <AvatarFallback>
                  {data.user.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-semibold">{data.user.name}</h3>
                <p className="text-muted-foreground ">{data.user.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-6">
            <h2>Faça seu login</h2>

            <Button onClick={() => signIn("google")} size={"icon"}>
              <LogIn size={16} />
            </Button>
          </div>
        )}

        <hr className="my-6" />

        <div className="flex flex-col gap-1 ">
          <Button className="flex w-full items-center justify-start gap-3">
            <HomeIcon size={16} />

            <p className="text-sm">Início</p>
          </Button>

          <Button
            asChild
            variant={"ghost"}
            className="flex w-full items-center justify-start gap-3"
            onClick={handleWithLoginIfUserNotLogged}
          >
            <Link href="/my-orders">
              <ScrollTextIcon size={16} />

              <p className="text-sm">Meus pedidos</p>
            </Link>
          </Button>

          <Button
            variant={"ghost"}
            className="flex w-full items-center justify-start gap-3"
            onClick={handleWithLoginIfUserNotLogged}
          >
            <HeartIcon size={16} />

            <p className="text-sm">Restaurantes favoritos</p>
          </Button>
        </div>

        <hr className="my-6" />

        <div className="flex flex-col gap-1">
          <Button
            variant={"ghost"}
            className="flex w-full items-center justify-start gap-3"
          >
            <UtensilsIcon size={16} />

            <p className="text-sm">Pratos</p>
          </Button>

          <Button
            variant={"ghost"}
            className="flex w-full items-center justify-start gap-3"
          >
            <SandwichIcon size={16} />

            <p className="text-sm">Lanches</p>
          </Button>

          <Button
            variant={"ghost"}
            className="flex w-full items-center justify-start gap-3"
          >
            <PizzaIcon size={16} />

            <p className="text-sm">Pizza</p>
          </Button>

          <Button
            variant={"ghost"}
            className="flex w-full items-center justify-start gap-3"
          >
            <FishIcon size={16} />

            <p className="text-sm">Japonesa</p>
          </Button>

          <Button
            variant={"ghost"}
            className="flex w-full items-center justify-start gap-3"
          >
            <IceCreamIcon size={16} />

            <p className="text-sm">Sobremesas</p>
          </Button>

          <Button
            variant={"ghost"}
            className="flex w-full items-center justify-start gap-3"
          >
            <GrapeIcon size={16} />

            <p className="text-sm">Sucos</p>
          </Button>
        </div>

        <hr className="my-6" />

        {data?.user?.name && (
          <Button
            variant={"ghost"}
            onClick={() => signOut()}
            className="flex w-full items-center justify-start gap-1"
          >
            <LogOutIcon size={16} />
            Sair da conta
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
}
