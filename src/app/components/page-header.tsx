import { MoveLeft } from "lucide-react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description: string;
  displayBackButton?: boolean;
}

export default function PageHeader({
  description,
  title,
  displayBackButton,
}: PageHeaderProps) {
  return (
    <header>
      {displayBackButton && (
        <Link
          href="/condominios"
          className="flex gap-2 text-blue-600 font-semibold mb-1"
        >
          <MoveLeft />
          <span>Voltar</span>
        </Link>
      )}
      <h2 className="font-bold text-3xl text-blue-600">{title}</h2>
      <p className="text-lg mt-1">{description}</p>
    </header>
  );
}
