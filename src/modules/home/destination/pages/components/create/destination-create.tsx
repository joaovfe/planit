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
import { formatErrorForNotification } from '@/shared/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DestinationCreateDto } from '../../../domain/dto/destination-create.dto';
import { EDestinationType } from '../../../domain/enums/destination-type.enum';
import { DestinationCreateData, destinationCreateSchema } from '../../../domain/schemas/destination-create.schema';
import { DestinationRepository } from '../../../repositories/destination.repository';
import { DestinationCreateForm } from './destination-create-form';

export function DestinationCreate() {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const userRepository = new DestinationRepository();

    const methods = useForm<DestinationCreateData>({
        defaultValues: {
            name: '',
            description: '',

        },
        resolver: zodResolver(destinationCreateSchema),
    });

    async function create(data: DestinationCreateDto) {
        if (loading) return;

        try {
            setLoading(true);

            await userRepository.create(data);

            toast.success('Usuário cadastrado com sucesso!');
            navigate(EAuthenticatedPath.USERS);
        } catch (error) {
            toast.error(formatErrorForNotification(error));
        } finally {
            setLoading(false);
        }
    }

    async function submit(data: DestinationCreateDto) {
        const user = {
            name: data.name,
            type: EDestinationType.City,
            description: data.description
        };
        create(user);
    }

    function alertMessage(error: any) {
        const errorMessages: any = Object.values(error);
        const firstMessage: string = errorMessages[0].message;
        toast.error(firstMessage);
    }

    return (
        <Page>
            <PageHeader>
                <PageTitle toHome>Novo Destino</PageTitle>

                <PageButtons>
                    <LinkButton to='/destino' variant='outlined' size='large' sx={{ minWidth: '180px' }}>
                        Cancelar
                    </LinkButton>
                    <LoadingButton
                        loading={loading}
                        loadingIndicator='Salvando...'
                        onClick={methods.handleSubmit(submit, alertMessage)}
                        variant='contained'
                        size='large'
                        sx={{ width: '180px' }}
                    >
                        Salvar
                    </LoadingButton>
                </PageButtons>
            </PageHeader>

            <PageCard>
                <FormProvider {...methods}>
                    <DestinationCreateForm />
                </FormProvider>
            </PageCard>
        </Page>
    );
}
