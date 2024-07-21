"use client";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CondominiosPage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ["condominios"],
    queryFn: async () => {
      const response = await fetch("/api/condominios");
      return response.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/condominios`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      return response.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["condominios"],
      });

      toast({
        title: "Condomínio deletado com sucesso!",
        description: "O condomínio foi deletado com sucesso.",
      });
    },
  });

  const router = useRouter();

  return (
    <main>
      <h2 className="font-bold text-3xl">Gestão de Condomínios</h2>
      <p className="text-lg mt-1">
        Aqui você pode gerenciar os condomínios cadastrados.
      </p>

      <div className="flex justify-between mt-4">
        <div>
          <Input placeholder="Procure por id" />
        </div>
        <Button>
          <Link href="/condominios/adicionar">Adicionar</Link>
        </Button>
      </div>

      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {data.map((condominio) => {
            const searchParams = new URLSearchParams();
            searchParams.set("id", condominio.id);
            searchParams.set("nome", condominio.nome);
            searchParams.set("endereco", condominio.endereco);
            searchParams.set("cnpj", condominio.cnpj);
            searchParams.set(
              "quantidadeUnidades",
              condominio.quantidadeUnidades.toString()
            );
            const editUrl = `/condominios/editar?${searchParams.toString()}`;

            return (
              <li key={condominio.id} className="border mt-2 p-2 rounded-md">
                <h3 className="font-bold mb-1">{condominio.nome}</h3>
                <p>ID: {condominio.id}</p>
                <p>Endereço: {condominio.endereco}</p>
                <p>CNPJ: {condominio.cnpj}</p>
                <p>No. Unidades: {condominio.quantidadeUnidades}</p>
                <p>
                  Início administrativo:{" "}
                  {Intl.DateTimeFormat("pt-BR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }).format(new Date(condominio.inicioAdministracao))}
                </p>
                <div className="flex gap-2 mt-2">
                  <Button
                    className="w-full"
                    onClick={() => router.push(editUrl)}
                  >
                    Editar
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="w-full">Excluir</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Tem certeza que deseja excluir este condomínio?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          disabled={deleteMutation.isPending}
                          onClick={() => deleteMutation.mutate(condominio.id)}
                        >
                          Continuar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
