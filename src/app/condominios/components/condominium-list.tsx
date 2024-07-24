import CondominiumItem from "./condominium-item";
import { Condominium } from "@/types";

interface CondominiumListProps {
  condominiums: Condominium[];
}

export default function CondominiumList({
  condominiums,
}: CondominiumListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {condominiums.map((condominium) => (
        <CondominiumItem key={condominium.id} condominium={condominium} />
      ))}
    </ul>
  );
}
