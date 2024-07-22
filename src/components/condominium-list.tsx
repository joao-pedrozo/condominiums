import CondominiumItem from "@/components/condominium-item";
import { Condominium } from "@/types";

interface CondominiumListProps {
  condominiums: Condominium[];
}

export default function CondominiumList({
  condominiums,
}: CondominiumListProps) {
  return (
    <ul>
      {condominiums.map((condominium) => (
        <CondominiumItem key={condominium.id} condominium={condominium} />
      ))}
    </ul>
  );
}
