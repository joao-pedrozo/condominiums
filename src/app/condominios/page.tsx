"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import CondominiumList from "@/components/condominium-list";

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
      <div className="flex justify-between mt-4">
        <div>
          <Input placeholder="Procure por id" />
        </div>
        <Link href="/condominios/adicionar">
          <Button>Adicionar</Button>
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
