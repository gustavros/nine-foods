import Header from "@/components/header";
import Search from "@/components/search";

export default function Home() {
  return (
    <div className="flex flex-col antialiased">
      <Header />
      <div className="px-5 py-6">
        <Search />
      </div>
    </div>
  );
}
