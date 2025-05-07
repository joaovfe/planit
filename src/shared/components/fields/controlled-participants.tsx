import { FieldValues, UseControllerProps } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { AutocompleteProps } from '@mui/material';

import { formatErrorForNotification } from '@/shared/utils/error';



import { ControlledAutocomplete } from './';
import { useAuth } from '@/modules/auth/hooks';
import { TripRepository } from '@/modules/trips/repositories/trips.repository';
import { Trips } from '@/modules/trips/domain/entities/trip.entity';
import { TripListDto } from '@/modules/trips/domain/dto/trips-list.dto';
import { ParticipantsDto } from '@/modules/trips/domain/dto/participants.dto';

interface Props<T extends FieldValues>
    extends UseControllerProps<T>,
    Omit<
        AutocompleteProps<any, boolean, boolean, boolean>,
        | 'defaultValue'
        | 'name'
        | 'renderInput'
        | 'options'
        | 'getOptionLabel'
        | 'isOptionEqualToValue'
    > {
    label?: string;
    placeholder?: string;
    optionsParams?: TripListDto;
    required?: boolean;
}

export function ControlledParticipants<T extends FieldValues>({
    optionsParams,
    ...props
}: Props<T>) {

    const repository = new TripRepository();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [participants, setParticipants] = useState<Array<ParticipantsDto>>([]);

    async function getCongregations() {
        if (loading) return;

        try {
            setLoading(true);
            setError(undefined);

            const { data } = await repository.list(optionsParams);

            const participantsData = data
                ?.map(trip => trip.participants)
                .flat()
                .filter((p): p is ParticipantsDto => p !== undefined);

            setParticipants(
                participantsData
            );
            console.log('participants: ', participants);
        } catch (error) {
            setError(formatErrorForNotification(error));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCongregations();
    }, []);

    return (
        <ControlledAutocomplete
            {...props}
            loading={loading}
            options={participants}
            noOptionsText={error}
            getOptionLabel={(option) => option?.name ?? ''}
            getOptionDisabled={(option) => option?.id === 0}
            isOptionEqualToValue={(option, selected) => option?.id === selected?.id}
        />
    );
}
