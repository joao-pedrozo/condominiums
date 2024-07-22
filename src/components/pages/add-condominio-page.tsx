"use client";

import Link from "next/link";
import CondominiumForm from "@/components/condominium-form";
import { z } from "zod";

const formSchema = z.object({
  nome: z.string(),
  endereco: z.string(),
  cnpj: z.string(),
  quantidadeUnidades: z.string(),
  inicioAdministracao: z.date(),
});

export default function AddCondominiumPage() {
  const defaultValues = {
    nome: "",
    endereco: "",
    cnpj: "",
    quantidadeUnidades: "0",
    inicioAdministracao: new Date(),
  };

  const mutationFn = (condominio: z.infer<typeof formSchema>) => {
    return fetch("/api/condominios", {
      method: "POST",
      body: JSON.stringify(condominio),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <main>
      <Link
        href="/condominios"
        className="text-blue-500 font-semibold mb-1 block"
      >
        {"<--"} Voltar
      </Link>
      <h2 className="font-bold text-3xl">Adicionar Condomínio</h2>
      <p className="text-lg mt-1">Adicione um novo condomínio ao sistema.</p>
      <CondominiumForm
        defaultValues={defaultValues}
        mutationFn={mutationFn}
        successMessage="Condomínio adicionado com sucesso!"
        buttonLabel="Adicionar condomínio"
      />
    </main>
  );
}
