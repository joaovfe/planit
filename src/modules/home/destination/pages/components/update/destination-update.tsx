import { LoadingButton, PageCard } from '@/shared/components';
import { callbackOnInvalidZod, formatErrorForNotification } from '@/shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { DestinationDto } from '../../../domain/dto/destination.dto';
import { DestinationUpdateSchema, destinationUpdateSchema } from '../../../domain/schemas/destination-update.schema';
import { DestinationRepository } from '../../../repositories/destination.repository';
import { DestinationUpdateForm } from './destination-update-form';


interface DestinationUpdateModelProps {
    isOpen: boolean;
    onClose: () => void;
    id?: number | undefined;
    data?: DestinationDto | undefined;
}

export function DestinationUpdate({
    isOpen,
    onClose,
    id = undefined,
}: DestinationUpdateModelProps) {
    // const { handleSubmit, reset } = useForm({});
    const [loading, setLoading] = useState<boolean>(false);
    const repository = new DestinationRepository();
    const [_, setDestinationData] = useState<DestinationDto | null>(null);

    const methods = useForm<DestinationUpdateSchema>({
        defaultValues: {
            name: '',
            description: '',
        },
        resolver: zodResolver(destinationUpdateSchema),
    });

    async function update(id: number, data: DestinationDto) {
        if (loading) return;

        try {
            setLoading(true);
            await repository.update(id, data);

            toast.success('Usuário atualizado com sucesso!');
            getDestination(id);
            onClose()

        } catch (error) {
            toast.error(formatErrorForNotification(error));
        } finally {
            setLoading(false);
        }
    }

    async function getDestination(id: number) {
        if (loading) return;

        try {
            setLoading(true);

            const destination = await repository.get(id);
            setDestinationData(destination);
            methods.reset({
                ...destination,
            });
        } catch (error) {
            toast.error(formatErrorForNotification(error));
        } finally {
            setLoading(false);
        }
    }
    async function submit(data: DestinationUpdateSchema) {
        if (!id) {
            toast.error('Identificador do usuário não encontrado!');
            return;
        }

        update(id, {
            id: id,
            name: data.name,
            description: data.description,
        });
    }

    useEffect(() => {
        if (id) getDestination(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    return (
        <Modal open={isOpen} onClose={onClose}>
            <PageCard sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                padding: 2,
            }}>
                <FormProvider {...methods}>
                    <DestinationUpdateForm />
                </FormProvider>
                <Grid item xs={12} style={{ marginTop: 16 }}>
                    <LoadingButton
                        loading={loading}
                        loadingIndicator="Salvando..."
                        onClick={methods.handleSubmit(submit, callbackOnInvalidZod)}
                        variant="contained"
                        size="large"
                    >
                        Salvar
                    </LoadingButton>
                    <Button variant="outlined" color="secondary" onClick={onClose} sx={{ ml: 2 }}>
                        Cancelar
                    </Button>
                </Grid>
            </PageCard>
        </Modal>
    );
}
