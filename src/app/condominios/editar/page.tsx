"use client";

import Link from "next/link";
import CondominioForm from "../components/condominium-form";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/app/components/page-header";

const formSchema = z.object({
  nome: z.string(),
  endereco: z.string(),
  cnpj: z.string(),
  quantidadeUnidades: z.string(),
  inicioAdministracao: z.date(),
});

export default function EditCondominiumPage() {
  const searchParams = useSearchParams();

  const defaultValues = {
    nome: searchParams.get("nome") ?? "",
    endereco: searchParams.get("endereco") ?? "",
    cnpj: searchParams.get("cnpj") ?? "",
    quantidadeUnidades: searchParams.get("quantidadeUnidades") ?? "",
    inicioAdministracao: new Date(
      searchParams.get("inicioAdministracao") ?? ""
    ),
  };

  const mutationFn = (condominio: z.infer<typeof formSchema>) => {
    return fetch("/api/condominios", {
      method: "PUT",
      body: JSON.stringify({
        ...condominio,
        id: searchParams.get("id"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <main>
      <PageHeader
        title="Editar Condomínio"
        description="Edite um condomínio existente no sistema."
        displayBackButton
      />
      <CondominioForm
        defaultValues={defaultValues}
        mutationFn={mutationFn}
        successMessage="Condomínio editado com sucesso!"
        buttonLabel="Editar condomínio"
      />
    </main>
  );
}
