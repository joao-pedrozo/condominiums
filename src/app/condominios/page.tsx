'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import CondominiumList from './components/condominium-list';
import { PlusIcon } from 'lucide-react';
import PageHeader from '../components/page-header';
import { useGetCondominiums } from '@/hooks/useCondomininiums';

export default function CondominiumsPage() {
  const { data: condominiums, isLoading } = useGetCondominiums();

  return (
    <main>
      <PageHeader
        title="Gestão de Condomínios"
        description="Aqui você pode gerenciar os condomínios cadastrados."
      />
      <div className="my-4 flex justify-between">
        <div className="opacity-50">
          <Input disabled placeholder="Procure por id" />
        </div>
        <Link href="/condominios/adicionar">
          <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white">
            <PlusIcon className="mr-2" size={19} /> Adicionar condomínio
          </Button>
        </Link>
      </div>
      {isLoading ? (
        <p className="mt-2">Carregando condomínios...</p>
      ) : (
        <CondominiumList condominiums={condominiums} />
      )}
    </main>
  );
}
