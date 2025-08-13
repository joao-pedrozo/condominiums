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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useMutateCondominium } from '@/hooks/useCondomininiums';

interface CondominiumDeleteDialogProps {
  condominiumId: number;
}

async function mutationFn(condominiumId: number) {
  const response = await fetch(`/api/condominios/${condominiumId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar condomínio');
  }
}

export default function CondominiumDeleteDialog({ condominiumId }: CondominiumDeleteDialogProps) {
  const { mutate, isPending } = useMutateCondominium({
    mutationFn,
    onSuccessMessage: {
      title: 'Condominío deletado com sucesso!',
      description: 'O condomínio foi deletado com sucesso.',
    },
    onErrorMessage: {
      title: 'Erro ao deletar o condomínio.',
      description:
        'Ocorreu um erro ao deletar o condomínio.',
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full border-red-600 text-red-600 hover:bg-red-50 hover:text-red-600"
        >
          Excluir
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja excluir este condomínio?</AlertDialogTitle>
          <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() => mutate(condominiumId)}
            className="bg-blue-700 hover:bg-blue-800"
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
