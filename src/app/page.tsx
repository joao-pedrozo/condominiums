"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data: condominiums, isLoading } = useQuery({
    queryKey: ["condominios"],
    queryFn: async () => {
      const response = await fetch("/api/condominios");
      return response.json();
    },
  });

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
            <div className="bg-muted rounded-lg p-4">
              <h3 className="text-4xl font-bold mb-2">
                {isLoading ? <span>...</span> : condominiums.length}
              </h3>
              <p className="text-muted-foreground">Condominíos totais</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <h3 className="text-4xl font-bold mb-2">
                {isLoading ? (
                  <span>...</span>
                ) : (
                  condominiums.reduce(
                    (acc, curr) => acc + curr.quantidadeUnidades,
                    0
                  )
                )}
              </h3>
              <p className="text-muted-foreground">Unidades totais</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-4">Recentemente Adicionados</h3>
          <ul className="space-y-4">
            {isLoading ? (
              <>
                <li>
                  <Skeleton className="w-full h-[60px] rounded-md" />
                </li>
                <li>
                  <Skeleton className="w-full h-[60px] rounded-md" />
                </li>
                <li>
                  <Skeleton className="w-full h-[60px] rounded-md" />
                </li>
              </>
            ) : (
              condominiums.slice(0, 3).map((condominium) => (
                <li
                  className="flex items-center justify-between"
                  key={condominium.id}
                >
                  <div>
                    <h3 className="text-lg font-medium">{condominium.nome}</h3>
                    <p className="text-muted-foreground text-sm">
                      Início administrativo:{" "}
                      {Intl.DateTimeFormat("pt-BR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(condominium.inicioAdministracao))}
                    </p>
                  </div>
                  <Link
                    href="/condominios"
                    className="text-blue-600 font-bold text-sm"
                    prefetch={false}
                  >
                    Ver
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
