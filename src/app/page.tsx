'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import OverviewCard from './components/overview-card';
import RecentCondominiums from './components/recent-condominiums';
import { Condominium } from '@/types';
import PageHeader from './components/page-header';

export default function Dashboard() {
  const { data: condominiums, isLoading } = useQuery({
    queryKey: ['condominios'],
    queryFn: async () => {
      const response = await fetch('/api/condominios');
      return response.json();
    },
  });

  const totalUnits = (condominiums: Condominium[]) => {
    return condominiums.reduce((acc, curr) => acc + curr.quantidadeUnidades, 0);
  };

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Veja informações gerais sobre os condomínios cadastrados."
      />
      <div className="mt-4 grid grid-cols-1 gap-8">
        <div className="rounded-lg bg-card shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">Overview</h3>
            <Link href="/condominios" className="text-sm font-bold text-blue-600" prefetch={false}>
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
