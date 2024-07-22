import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CondominioDeleteDialog from "@/components/condominium-delete-dialog";
import type { Condominium } from "@/types";

interface CondominiumItemProps extends React.HTMLAttributes<HTMLLIElement> {
  condominium: Condominium;
}

export default function CondominiumItem({
  condominium,
  className,
  ...rest
}: CondominiumItemProps) {
  const router = useRouter();

  const searchParams = new URLSearchParams();
  searchParams.set("id", condominium.id.toString());
  searchParams.set("nome", condominium.nome);
  searchParams.set("endereco", condominium.endereco);
  searchParams.set("cnpj", condominium.cnpj);
  searchParams.set(
    "quantidadeUnidades",
    condominium.quantidadeUnidades.toString()
  );
  const editUrl = `/condominios/editar?${searchParams.toString()}`;

  return (
    <li className={`border mt-2 p-2 rounded-md ${className}`} {...rest}>
      <h3 className="font-bold mb-1">{condominium.nome}</h3>
      <p>ID: {condominium.id}</p>
      <p>Endereço: {condominium.endereco}</p>
      <p>CNPJ: {condominium.cnpj}</p>
      <p>No. Unidades: {condominium.quantidadeUnidades}</p>
      <p>
        Início administrativo:{" "}
        {Intl.DateTimeFormat("pt-BR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }).format(new Date(condominium.inicioAdministracao))}
      </p>
      <div className="flex gap-2 mt-2">
        <Button className="w-full" onClick={() => router.push(editUrl)}>
          Editar
        </Button>
        <CondominioDeleteDialog condominiumId={condominium.id} />
      </div>
    </li>
  );
}