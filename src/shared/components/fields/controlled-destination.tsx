import { useEffect, useState } from 'react';
import { UseControllerProps } from 'react-hook-form';
import { AutocompleteProps } from '@mui/material';

import { formatErrorForNotification } from '@/shared/utils/error';

import { ControlledAutocomplete } from '.';
import { DestinationListDTO } from '@/modules/home/destination/domain/dto/destination-list.dto';
import { DestinationRepository } from '@/modules/home/destination/repositories/destination.repository';
import { DestinationEntity } from '@/modules/home/destination/domain/entities/destination.entity';


interface Props
    extends UseControllerProps<any>,
    Omit<
        AutocompleteProps<any, false, false, false>,
        | 'defaultValue'
        | 'name'
        | 'renderInput'
        | 'options'
        | 'getOptionLabel'
        | 'isOptionEqualToValue'
    > {
    label?: string;
    optionsParams?: DestinationListDTO;
}

export function ControlledDestination({ optionsParams, ...props }: Props) {
    const repository = new DestinationRepository();

    const [loading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState<string | undefined>();

    const [destination, setDestination] = useState<Array<DestinationEntity>>([]);

    async function getDestinations() {
        if (loading) return;

        try {
            setLoading(true);
            setError(undefined);

            const destination = await repository.list();

            setDestination(destination);
        } catch (error) {
            setError(formatErrorForNotification(error));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getDestinations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ControlledAutocomplete
            {...props}
            options={destination}
            loading={loading}
            noOptionsText={error}
            getOptionLabel={(destination: DestinationEntity) => destination?.name ?? ''}
            isOptionEqualToValue={(option, selected) => option?.id === selected?.id}
        />
    );
}
