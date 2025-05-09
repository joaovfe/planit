import { toast } from 'react-toastify';

import { useConfirmDialog } from '@/shared/components';
import { ID } from '@/shared/domain/types/id.type';
import { formatErrorForNotification } from '@/shared/utils/error';
import { TripRepository } from '../repositories/trips.repository';

export function useTrip() {
    const repository = new TripRepository();
    const { openConfirmDialog } = useConfirmDialog();

    async function deleteTrip(id: ID, callback?: () => void) {
        const continueRemove = await openConfirmDialog({
            title: 'Confirmar Exclusão',
            description:
                'Você tem certeza que deseja excluir esta fase principal? Essa é uma ação irreversível.',
        });

        if (!continueRemove) return;

        await toast.promise(repository.delete(id), {
            pending: 'Excluindo viagem...',
            success: 'Viagem excluída com sucesso!',
            error: {
                render: ({ data }) => {
                    return formatErrorForNotification(data);
                },
            },
        });

        if (callback) callback();
    }

    return {
        deleteTrip
    };
}
