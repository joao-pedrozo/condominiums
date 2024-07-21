"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  nome: z.string(),
  endereco: z.string(),
  cnpj: z.string(),
  quantidadeUnidades: z.string(),
});

export default function EditCondominioPage() {
  const { toast } = useToast();
  const router = useRouter();

  const searchParams = useSearchParams();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (condominio: z.infer<typeof formSchema>) => {
      return fetch("/api/condominios", {
        method: "PUT",
        body: JSON.stringify({
          ...condominio,
          id: searchParams.get("id"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "Condomínio editado com sucesso!",
        description: "O condoínio foi editado com sucesso.",
      });

      router.push("/condominios");
    },
    onError: (err) => {
      alert("Ocorreu um erro ao editar o condomínio.");
      console.error(err);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: searchParams.get("nome") ?? "",
      endereco: searchParams.get("endereco") ?? "",
      cnpj: searchParams.get("cnpj") ?? "",
      quantidadeUnidades: searchParams.get("quantidadeUnidades") ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isPending) {
      return;
    }

    mutate({
      ...values,
      quantidadeUnidades: Number(values.quantidadeUnidades),
    });
  }

  return (
    <main>
      <Link
        href="/condominios"
        className="text-blue-500 font-semibold mb-1 block"
      >
        {"<--"} Voltar
      </Link>
      <h2 className="font-bold text-3xl">Editar Condomínio</h2>
      <p className="text-lg mt-1">Edite um condomínio existente no sistema.</p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-2 grid grid-cols-2 gap-4"
        >
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Condominio Village" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endereco"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Av. Presidente Antonio Carlos"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cnpj"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <Input placeholder="921.274.283-32" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantidadeUnidades"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade de unidades</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Editar condomínio</Button>
        </form>
      </Form>
    </main>
  );
}
