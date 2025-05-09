import { AutocompleteProps } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseControllerProps } from 'react-hook-form';

import { formatErrorForNotification } from '@/shared/utils/error';

import { Country } from '@/modules/country/domain/entities/country.entity';
import { RoleListDTO } from '@/modules/role/domain/dto';
import { ControlledAutocomplete } from '.';
import { Season } from '@/modules/season/domain/entities/season.entity';
import { SeasonRepository } from '@/modules/season/repositories/season.repository';

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
    optionsParams?: RoleListDTO;
}

export function ControlledSeason({ optionsParams, ...props }: Props) {
    const repository = new SeasonRepository();

    const [loading, setLoading] = useState<boolean>(false);

    const [error, setError] = useState<string | undefined>();

    const [roles, setRoles] = useState<Array<Season>>([]);

    async function getClimate() {
        if (loading) return;

        try {
            setLoading(true);
            setError(undefined);

            const data = await repository.list();

            console.log('data: ', data);

            setRoles(data);
        } catch (error) {
            setError(formatErrorForNotification(error));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getClimate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ControlledAutocomplete
            {...props}
            options={roles}
            loading={loading}
            noOptionsText={error}
            getOptionLabel={(role: Country) => role?.name ?? ''}
            isOptionEqualToValue={(option, selected) => option?.id === selected?.id}
        />
    );
}
