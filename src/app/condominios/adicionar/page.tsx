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
import { useRouter } from "next/navigation";

const formSchema = z.object({
  nome: z.string(),
  endereco: z.string(),
  cnpj: z.string(),
  quantidadeUnidades: z.string(),
});

export default function AddCondominioPage() {
  const { toast } = useToast();
  const router = useRouter();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (condominio: z.infer<typeof formSchema>) => {
      return fetch("/api/condominios", {
        method: "POST",
        body: JSON.stringify(condominio),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "Condomínio adicionado com sucesso!",
        description: "O condoínio foi adicionado com sucesso.",
      });

      router.push("/condominios");
    },
    onError: (err) => {
      alert("Ocorreu um erro ao adicionar o condomínio.");
      console.error(err);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      endereco: "",
      cnpj: "",
      quantidadeUnidades: "0",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isPending) {
      return;
    }

    mutate(values);
  }

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
          <Button type="submit">Adicionar condomínio</Button>
        </form>
      </Form>
    </main>
  );
}
