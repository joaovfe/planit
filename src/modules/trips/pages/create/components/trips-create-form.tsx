import { DestinationEntity } from '@/modules/home/destination/domain/entities/destination.entity';
import { TripCreateData } from '@/modules/trips/domain/schemas/trip-create.schema';
import { TripRepository } from '@/modules/trips/repositories/trips.repository';
import {
    ControlledText
} from '@/shared/components';
import { ControlledDate } from '@/shared/components/fields/controlled-date';
import { ControlledDestination } from '@/shared/components/fields/controlled-destination';
import { ControlledParticipants } from '@/shared/components/fields/controlled-participants';
import { Divider, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { BaggageItemSuggestion } from './baggage-item-suggestion';
import { BaggageItems } from '@/modules/trips/domain/entities/baggate-items.entity';
import { BaggageItemDto } from '@/modules/baggage/domain/dto/baggage-item.dto';

interface FormWithTrip extends FieldValues {
    trip: TripCreateData;
}

export function TripCreateForm() {
    const { control, watch } = useFormContext<FormWithTrip>();
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const repository = new TripRepository();
    const { setValue } = useFormContext<FormWithTrip>();


    const destinationsWatching = watch('destination')

    console.log('destinationsWatching: ', destinationsWatching);


    const fetchSuggestions = async (destination: DestinationEntity) => {
        try {
            console.log('destination: ', destination);
            const response = await repository.getBaggageItems(destination.id);
            console.log('response: ', response);
            setSuggestions(response);
            setValue('baggageSuggestion', response);
        } catch (error) {
            console.error("Erro ao buscar sugestões:", error);
        }
    };
    useEffect(() => {
        if (destinationsWatching && destinationsWatching.id) {
            fetchSuggestions(destinationsWatching);
        }
    }, [destinationsWatching]);
    console.log('suggestions: ', suggestions);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography component="h2" variant="h5" fontWeight="bold">
                    Crie uma viagem
                </Typography>
                <Divider sx={{ marginTop: '5px' }} />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
                <ControlledText label="Nome da viagem" name="name" control={control} />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
                <ControlledDestination label="Destinos" name="destination" control={control} />
            </Grid>

            {/* <Grid item md={4} sm={12} xs={12}>
                <ControlledState label="Estado" name="trip.state" control={control} />
            </Grid>

            <Grid item md={4} sm={12} xs={12}>
                <ControlledCity label="Cidade" state={state} name="trip.city" control={control} />
            </Grid> */}

            <Grid item md={4} sm={12} xs={12}>
                <ControlledParticipants
                    label="Participantes"
                    name="participants"
                    control={control}
                    placeholder="Selecione"
                    multiple
                />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
                <ControlledDate label="Data inicial" name="startDate" control={control} />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
                <ControlledDate label="Data final" name="endDate" control={control} />
            </Grid>

            {suggestions.length > 0 && (
                <Grid item xs={12}>
                    <Typography variant="h6" fontWeight="bold" >Sugestões de Bagagem</Typography>
                    {suggestions.map((item, index) => (
                        <BaggageItemSuggestion key={index} name={item} />
                    ))}
                </Grid>
            )}
        </Grid>
    );
}
