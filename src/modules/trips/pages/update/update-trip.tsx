import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { EAuthenticatedPath } from '@/core/router';

import {
    LinkButton,
    LoadingButton,
    Page,
    PageButtons,
    PageCard,
    PageHeader,
    PageTitle,
} from '@/shared/components';
import { ID } from '@/shared/domain';
import { callbackOnInvalidZod, formatErrorForNotification } from '@/shared/utils';
import { TripRepository } from '../../repositories/trips.repository';
import { TripUpdateDto } from '../../domain/dto/trip-update.dto';
import { tripUpdateSchema } from '../../domain/schemas/trip-update.schema';
import { TripUpdateForm } from './components/update-trip-form';
import { useAuth } from '@/modules/auth/hooks';
// import { useAuth } from '@/modules/auth/hooks';
// import { EAbilityAction, EAbilityCodes } from '@/modules/role/domain';

export function TripUpdate() {
    // const { user } = useAuth();
    const { id } = useParams();

    const { user } = useAuth();
    const navigate = useNavigate();

    console.log('user: ', user);


    // const canDelete = user?.role?.permissions.some(permission =>
    //   permission.action === EAbilityAction.DELETE && permission.code === EAbilityCodes.COMPANIES
    // );
    const repository = new TripRepository();

    const [loading, setLoading] = useState<boolean>(false);

    // const { openConfirmDialog } = useConfirmDialog();

    const methods = useForm<TripUpdateDto>({
        defaultValues: {
            name: '',
            user: undefined,
            // state: '',
            // city: '',
            participants: [],
            destination: {},
            startDate: null,
            endDate: null,
        },
        resolver: zodResolver(tripUpdateSchema),
    });

    async function update(id: ID, data: TripUpdateDto) {
        if (loading) return;

        try {
            setLoading(true);

            console.log('data: ', data);

            await repository.update(id, data);

            toast.success('Viagem atualizada com sucesso!');

            navigate(EAuthenticatedPath.TRIP);
        } catch (error) {
            toast.error(formatErrorForNotification(error));
        } finally {
            setLoading(false);
        }
    }

    async function submit(data: TripUpdateDto) {
        if (!id) {
            toast.error('Identificador da Empresa não encontrado!');
            return;
        }


        const transformedData = {
            ...data,
            user: user || undefined,
        };

        update(id, transformedData);
    }

    async function getProduction(id: ID) {
        if (loading) return;

        try {
            setLoading(true);

            const { participants, startDate, endDate, ...rest } = await repository.getProductionById(id);

            const normalizedParticipants = Array.isArray(participants)
                ? participants
                : participants
                    ? [participants]
                    : [];

            methods.reset({
                ...rest,
                participants: normalizedParticipants,
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
            });

        } catch (error) {
            toast.error(formatErrorForNotification(error));
            navigate(EAuthenticatedPath.TRIP);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        if (id) getProduction(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <Page>
            <PageHeader>
                <PageTitle>Editar Produção</PageTitle>

                <PageButtons display='flex' flexWrap='wrap'>
                    {/* {canDelete && (
            <LoadingButton
              loading={loading}
              loadingIndicator='Deletando...'
              onClick={() => handleDelete(id!)}
              size='large'
              variant='contained'
              sx={{ minWidth: '180px', backgroundColor: 'background.paper', color: 'text.primary', '&:hover': { backgroundColor: 'text.disabled' } }}
            >
              Excluir
            </LoadingButton>
          )} */}
                    <LinkButton to='/viagens' variant='outlined' size='large' sx={{ minWidth: '180px' }}>
                        Cancelar
                    </LinkButton>
                    <LoadingButton
                        loading={loading}
                        loadingIndicator='Salvando...'
                        onClick={methods.handleSubmit(submit, callbackOnInvalidZod)}
                        variant='contained'
                        size='large'
                        sx={{ minWidth: '180px' }}
                    >
                        Salvar
                    </LoadingButton>
                </PageButtons>
            </PageHeader>

            <PageCard sx={{ flexGrow: 1 }}>
                <FormProvider {...methods}>
                    <TripUpdateForm />
                </FormProvider>
            </PageCard>
        </Page>
    );
}
