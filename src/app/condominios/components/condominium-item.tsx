import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import CondominiumDeleteDialog from './condominium-delete-dialog';
import type { Condominium } from '@/types';

interface CondominiumItemProps extends React.HTMLAttributes<HTMLLIElement> {
  condominium: Condominium;
}

export default function CondominiumItem({ condominium, className, ...rest }: CondominiumItemProps) {
  const router = useRouter();

  const searchParams = new URLSearchParams();
  searchParams.set('id', condominium.id.toString());
  searchParams.set('nome', condominium.nome);
  searchParams.set('endereco', condominium.endereco);
  searchParams.set('cnpj', condominium.cnpj);
  searchParams.set('quantidadeUnidades', condominium.quantidadeUnidades.toString());
  searchParams.set('inicioAdministracao', new Date(condominium.inicioAdministracao).toISOString());
  const editUrl = `/condominios/editar?${searchParams.toString()}`;

  return (
    <li className={`rounded-md border p-2 ${className}`} {...rest}>
      <h3 className="mb-1 font-bold">{condominium.nome}</h3>
      <p>ID: {condominium.id}</p>
      <p>Endereço: {condominium.endereco}</p>
      <p>CNPJ: {condominium.cnpj}</p>
      <p>No. Unidades: {condominium.quantidadeUnidades}</p>
      <p>
        Início Administrativo: {/* TODO: Criar utils */}
        {Intl.DateTimeFormat('pt-BR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(new Date(condominium.inicioAdministracao))}
      </p>
      <div className="mt-2 flex gap-2">
        <CondominiumDeleteDialog condominiumId={condominium.id} />

        <Button
          variant="outline"
          className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
          onClick={() => router.push(editUrl)}
        >
          Editar
        </Button>
      </div>
    </li>
  );
}
