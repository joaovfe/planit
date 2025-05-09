import { EAuthenticatedPath } from '@/core/router';
import { useAuth } from '@/modules/auth/hooks';
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
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CreateTripDto } from '../../domain/dto/create-trip.dto';
import { TripCreateData, tripCreateSchema } from '../../domain/schemas/trip-create.schema';
import { TripRepository } from '../../repositories/trips.repository';
import { TripCreateForm } from './components/trips-create-form';

interface FormWithTrip extends FieldValues {
    trip: TripCreateData;
}


export function TripCreate() {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { user } = useAuth()
    const repository = new TripRepository();

    const methods = useForm<FormWithTrip>({
        defaultValues: {
            name: '',
            // state: '',
            // city: '',
            baggageSuggestion: '',
            user: user,
            participants: [],
            destination: [],
            startDate: null,
            endDate: null,
        },
        resolver: zodResolver(tripCreateSchema

        ),
    });



    async function create(data: CreateTripDto) {
        if (loading) return;

        try {
            setLoading(true);

            console.log('data: ', data);

            await repository.create(data);

            toast.success('Viagem cadastrada com sucesso!');
            navigate(EAuthenticatedPath.TRIP);
        } catch (error) {
            toast.error(formatErrorForNotification(error));
        } finally {
            setLoading(false);
        }
    }


    async function submit(data: FormWithTrip) {

        console.log('data: ', data);

        const trip = {
            name: data.name,
            user: user,
            baggageSuggestion: data.baggageSuggestion,
            // country: data.trip.country,
            // state: data.trip.state,
            destination: data.destination,
            participants: data.participants,
            startDate: data.startDate,
            endDate: data.endDate,
            // city: data.trip.city,
        };

        create(trip);
    }

    function alertMessage(error: any) {
        const errorMessages: any = Object.values(error);
        const firstMessage: string = errorMessages[0].message;
        toast.error(firstMessage);
    }

    return (
        <Page>
            <PageHeader>
                <PageTitle toHome>Nova Viagem</PageTitle>

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
                    <TripCreateForm />
                </FormProvider>
            </PageCard>
        </Page>
    );
}
