import Link from "next/link";

export default function AddCondominioPage() {
  return (
    <main>
      <Link
        href="/condominios"
        className="text-blue-500 font-semibold mb-1 block"
      >
        {"<--"} Voltar
      </Link>
      <h2 className="font-bold text-3xl">Adicionar Condomínio</h2>
      <p className="text-lg mt-1">Adicione um novo condomínio ao sistema.</p>
    </main>
  );
}
