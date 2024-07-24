'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const formSchema = z.object({
  nome: z.string(),
  endereco: z.string(),
  cnpj: z.string(),
  quantidadeUnidades: z.string(),
  inicioAdministracao: z.date(),
});

interface CondominioFormProps {
  defaultValues: z.infer<typeof formSchema>;
  mutationFn: (data: z.infer<typeof formSchema>) => Promise<any>;
  successMessage: string;
  buttonLabel: string;
}

export default function CondominioForm({
  defaultValues,
  mutationFn,
  successMessage,
  buttonLabel,
}: CondominioFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: () => {
      toast({
        title: successMessage,
        description: `O condomínio foi ${buttonLabel.toLowerCase()} com sucesso.`,
      });

      router.push('/condominios');
    },
    onError: (err) => {
      alert(`Ocorreu um erro ao ${buttonLabel.toLowerCase()} o condomínio.`);
      console.error(err);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isPending) {
      return;
    }

    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 grid grid-cols-2 gap-4">
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
                <Input placeholder="Av. Presidente Antonio Carlos" {...field} />
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
        {defaultValues.inicioAdministracao !== undefined && (
          <FormField
            control={form.control}
            name="inicioAdministracao"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Início da Administração</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="col-span-2">
          <Button
            className="w-full bg-blue-700 text-white hover:bg-blue-800 hover:text-white active:bg-blue-900"
            type="submit"
          >
            {buttonLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
