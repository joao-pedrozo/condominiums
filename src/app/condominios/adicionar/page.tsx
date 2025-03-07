'use client';

import Link from 'next/link';
import CondominiumForm from '../components/condominium-form';
import { z } from 'zod';
import PageHeader from '@/app/components/page-header';

const formSchema = z.object({
  nome: z.string(),
  endereco: z.string(),
  cnpj: z.string(),
  quantidadeUnidades: z.string(),
  inicioAdministracao: z.date(),
});

export default function AddCondominiumPage() {
  const defaultValues = {
    nome: '',
    endereco: '',
    cnpj: '',
    quantidadeUnidades: '0',
    inicioAdministracao: new Date(),
  };

  const mutationFn = async (condominio: z.infer<typeof formSchema>) => {
    const response = await fetch('/api/condominios', {
      method: 'POST',
      body: JSON.stringify(condominio),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar condomínio');
    }

    return response.json();
  };

  return (
    <main>
      <PageHeader
        title="Adicionar Condomínio"
        description="Adicione um novo condomínio ao sistema."
        displayBackButton
      />
      <CondominiumForm
        defaultValues={defaultValues}
        mutationFn={mutationFn}
        successMessage="Condomínio adicionado com sucesso!"
        buttonLabel="Adicionar condomínio"
      />
    </main>
  );
}
