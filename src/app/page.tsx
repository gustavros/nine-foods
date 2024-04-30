import CategoryList from "@/components/category-list";
import Header from "@/components/header";
import Search from "@/components/search";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Image
          src={"/promo-banner-01.png"}
          alt="Até 30% de desconto em pizzas."
          width={0}
          height={0}
          quality={100}
          sizes="100vw"
          className="h-auto w-full object-contain"
        />
      </div>
    </>
  );
}
