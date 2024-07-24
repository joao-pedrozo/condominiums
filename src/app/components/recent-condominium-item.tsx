import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Condominium } from "@/types";

interface RecentCondominiumItemProps {
  condominium: Condominium;
}

export default function RecentCondominiumItem({
  condominium,
}: RecentCondominiumItemProps) {
  return (
    <li className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-medium">{condominium.nome}</h3>
        <p className="text-muted-foreground text-sm">
          Início administrativo:{" "}
          {format(new Date(condominium.inicioAdministracao), "PPP", {
            locale: ptBR,
          })}
        </p>
      </div>
      <Link
        href={`/condominios`}
        className="text-blue-600 font-bold text-sm"
        prefetch={false}
      >
        Ver
      </Link>
    </li>
  );
}
