import { Skeleton } from "@/components/ui/skeleton";
import RecentCondominium from "./recent-condominium-item";
import { Condominium } from "@/types";

interface RecentCondominiumsProps {
  condominiums: Condominium[];
  isLoading: boolean;
}

export default function RecentCondominiums({
  condominiums,
  isLoading,
}: RecentCondominiumsProps) {
  if (isLoading) {
    return (
      <div className="bg-card rounded-lg shadow-sm">
        <h3 className="text-xl font-bold mb-4">Recentemente Adicionados</h3>
        <ul className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <li key={index}>
              <Skeleton className="w-full h-[60px] rounded-md" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-sm">
      <h3 className="text-xl font-bold mb-4">Recentemente Adicionados</h3>
      <ul className="space-y-4">
        {condominiums.slice(0, 3).map((condominium) => (
          <RecentCondominium key={condominium.id} condominium={condominium} />
        ))}
      </ul>
    </div>
  );
}
