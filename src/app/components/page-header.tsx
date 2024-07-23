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
          className="text-blue-500 font-semibold mb-2 block"
        >
          {"<--"} Voltar
        </Link>
      )}
      <h2 className="font-bold text-3xl">{title}</h2>
      <p className="text-lg mt-1">{description}</p>
    </header>
  );
}
