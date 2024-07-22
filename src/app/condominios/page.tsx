"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import CondominioList from "@/components/condominium-list";

export default function CondominiosPage() {
  const { data, isLoading } = useQuery({
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
        <Button>
          <Link href="/condominios/adicionar">Adicionar</Link>
        </Button>
      </div>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <CondominioList condominiums={data} />
      )}
    </main>
  );
}
