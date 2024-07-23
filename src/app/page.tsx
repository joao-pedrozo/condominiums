"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import OverviewCard from "../components/overview-card";
import RecentCondominiums from "../components/recent-condominiums";
import { Condominium } from "@/types";

export default function Dashboard() {
  const { data: condominiums, isLoading } = useQuery({
    queryKey: ["condominios"],
    queryFn: async () => {
      const response = await fetch("/api/condominios");
      return response.json();
    },
  });

  const totalUnits = (condominiums: Condominium[]) => {
    return condominiums.reduce((acc, curr) => acc + curr.quantidadeUnidades, 0);
  };

  return (
    <div>
      <h2 className="font-bold text-3xl">Dashboard</h2>
      <p className="text-lg mt-1">
        Seja bem-vindo ao sistema de gestão de condomínios.
      </p>
      <div className="grid grid-cols-1 gap-8 mt-4">
        <div className="bg-card rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Overview</h3>
            <Link
              href="/condominios"
              className="text-blue-600 font-bold text-sm"
              prefetch={false}
            >
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <OverviewCard
              title="Condomínios totais"
              value={isLoading ? <span>...</span> : condominiums.length}
              description="Condomínios totais"
            />
            <OverviewCard
              title="Unidades totais"
              value={isLoading ? <span>...</span> : totalUnits(condominiums)}
              description="Unidades totais"
            />
          </div>
        </div>
        <RecentCondominiums condominiums={condominiums} isLoading={isLoading} />
      </div>
    </div>
  );
}
