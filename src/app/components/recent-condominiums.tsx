import { Skeleton } from '@/components/ui/skeleton';
import RecentCondominium from './recent-condominium-item';
import { Condominium } from '@/types';

interface RecentCondominiumsProps {
  condominiums: Condominium[];
  isLoading: boolean;
}

export default function RecentCondominiums({ condominiums, isLoading }: RecentCondominiumsProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg bg-card shadow-sm">
        <h3 className="mb-4 text-xl font-bold">Recentemente Adicionados</h3>
        <ul className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <li key={index}>
              <Skeleton className="h-[60px] w-full rounded-md" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-card shadow-sm">
      <h3 className="mb-4 text-xl font-bold">Recentemente Adicionados</h3>
      <ul className="space-y-4">
        {condominiums.slice(0, 3).map((condominium) => (
          <RecentCondominium key={condominium.id} condominium={condominium} />
        ))}
      </ul>
    </div>
  );
}
