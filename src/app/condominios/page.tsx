"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import CondominiumList from "@/components/condominium-list";
import { PlusIcon } from "lucide-react";

export default function CondominiumsPage() {
  const { data: condominiums, isLoading } = useQuery({
    queryKey: ["condominios"],
    queryFn: async () => {
      const response = await fetch("/api/condominios");
      return response.json();
    },
  });

  return (
    <main>
      <h2 className="font-bold text-3xl">Gestão de Condomínios</h2>
      <p className="text-lg mt-1">
        Aqui você pode gerenciar os condomínios cadastrados.
      </p>
      <div className="flex justify-between my-4">
        <div>
          <Input placeholder="Procure por id" />
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
