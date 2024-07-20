"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSWR from "swr";

export default function CondominiosPage() {
  const { data, isLoading } = useSWR("/api/condominios", async (url) => {
    const response = await fetch(url);

    return await response.json();
  });

  console.log(data);

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
        <Button>Novo condomínio</Button>
      </div>

      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {data.map((condominio) => (
            <li key={condominio.id} className="border mt-2 p-2 rounded-md">
              <h3 className="font-bold mb-1">{condominio.nome}</h3>
              <p>Endereço: {condominio.endereco}</p>
              <p>CNPJ: {condominio.cnpj}</p>
              <p>No. Unidades: {condominio.quantidadeUnidades}</p>
              <p>
                Início administrativo:{" "}
                {Intl.DateTimeFormat("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }).format(new Date(condominio.inicioAdministracao))}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
