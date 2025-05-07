import { TripCreateData } from '@/modules/trips/domain/schemas/trip-create.schema';
import {
    ControlledCity,
    ControlledState,
    ControlledText,
} from '@/shared/components';
import { ControlledDate } from '@/shared/components/fields/controlled-date';
import { ControlledDestination } from '@/shared/components/fields/controlled-destination';
import { ControlledParticipants } from '@/shared/components/fields/controlled-participants';
import { Divider, Grid, Typography } from '@mui/material';
import { FieldValues, useFormContext } from 'react-hook-form';

interface FormWithTrip extends FieldValues {
    trip: TripCreateData;
}

export function TripCreateForm() {
    const { control, watch } = useFormContext<FormWithTrip>();

    const state: string | undefined = watch('trip.state');
    const name: string | undefined = watch('trip.name');
    const formValues = watch('trip');

    console.log('formValues: ', formValues);

    console.log('name: ', name);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography component="h2" variant="h5" fontWeight="bold">
                    Crie uma viagem
                </Typography>
                <Divider sx={{ marginTop: '5px' }} />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
                <ControlledText label="Nome da viagem" name="trip.name" control={control} />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
                <ControlledDestination label="Destinos" name="trip.destination" control={control} />
            </Grid>

            <Grid item md={4} sm={12} xs={12}>
                <ControlledState label="Estado" name="trip.state" control={control} />
            </Grid>

            <Grid item md={4} sm={12} xs={12}>
                <ControlledCity label="Cidade" state={state} name="trip.city" control={control} />
            </Grid>

            <Grid item md={4} sm={12} xs={12}>
                <ControlledParticipants
                    label="Participantes"
                    name="trip.participants"
                    control={control}
                    placeholder="Selecione"
                    multiple
                />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
                <ControlledDate label="Data inicial" name="trip.startDate" control={control} />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
                <ControlledDate label="Data final" name="trip.endDate" control={control} />
            </Grid>
        </Grid>
    );
}
