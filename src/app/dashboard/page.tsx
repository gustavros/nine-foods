import { db } from "@/_lib/prisma";
import { DashboardDataTable } from "./_components/dashboard-data-table";

import { DashboardUser } from "./_components/dashboard-user";
import Link from "next/link";

export default async function Dashboard() {
  const restaurants = await db.restaurant.findMany({});

  return (
    <div className="flex h-screen flex-col">
      <div className="flex w-full items-center justify-between border-b border-border px-5 py-6">
        <Link href="/" className="font-bold">
          nine foods.
        </Link>

        <DashboardUser />
      </div>
      <div className="flex flex-col px-5 py-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-sm text-gray-500">
          Gerencie seus restaurantes e produtos
        </p>

        <DashboardDataTable restaurants={restaurants} />
      </div>
    </div>
  );
}
