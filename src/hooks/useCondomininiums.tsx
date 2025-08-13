import {
  MutationFunction,
  UseMutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { Condominium } from '@/types';
import { useRouter } from 'next/navigation';
import mock from './mock.json';

interface UseMutateCondominiumProps extends UseMutationOptions<any, Error, any, unknown> {
  mutationFn: MutationFunction<any, any> | undefined;
  onSuccessMessage: {
    title: string;
    description: string;
  };
  onErrorMessage: {
    title: string;
    description: string;
  };
}

export const useGetCondominiums = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['condominios'],
    queryFn: async () => {
      const response = await fetch('/api/condominios');

      if (!response.ok) {
        if (process.env.NEXT_PUBLIC_RETURN_MOCK === 'TRUE') {
          return mock;
        }

        toast({
          title: 'Erro ao buscar condomínios',
          description:
            'Ocorreu um erro ao buscar os condomínios.',
          variant: 'destructive',
        });

        return;
      }

      return response.json();
    },
  });
};

export const useMutateCondominium = ({
  mutationFn,
  onErrorMessage,
  onSuccessMessage,
  ...rest
}: UseMutateCondominiumProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['condominios'],
      });

      router.push('/condominios');

      toast({
        ...onSuccessMessage,
      });
    },
    onError: () => {
      toast({
        ...onErrorMessage,
        variant: 'destructive',
      });
    },
    ...rest,
  });
};
