import CondominioItem from "@/components/condominium-item";
import { Condominium } from "@/types";

interface CondominiumListProps {
  condominiums: Condominium[];
}

export default function CondominioList({ condominiums }: CondominiumListProps) {
  return (
    <ul>
      {condominiums.map((condominium) => (
        <CondominioItem key={condominium.id} condominium={condominium} />
      ))}
    </ul>
  );
}
