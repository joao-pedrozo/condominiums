import { MoveLeft } from 'lucide-react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  description: string;
  displayBackButton?: boolean;
}

export default function PageHeader({ description, title, displayBackButton }: PageHeaderProps) {
  return (
    <header>
      {displayBackButton && (
        <Link href="/condominios" className="mb-1 flex gap-2 font-semibold text-blue-600">
          <MoveLeft />
          <span>Voltar</span>
        </Link>
      )}
      <h2 className="text-3xl font-bold text-blue-600">{title}</h2>
      <p className="mt-1 text-lg">{description}</p>
    </header>
  );
}
