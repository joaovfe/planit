import { AutocompleteProps } from '@mui/material';
import { useEffect, useState } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';

import { formatErrorForNotification } from '@/shared/utils/error';



import { User, UserListDTO } from '@/modules/user/domain';
import { UserRepository } from '@/modules/user/repositories';
import { ControlledAutocomplete } from './';

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
    optionsParams?: UserListDTO;
    required?: boolean;
}

export function ControlledParticipants<T extends FieldValues>({
    optionsParams,
    ...props
}: Props<T>) {

    const repository = new UserRepository();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [participants, setParticipants] = useState<Array<User>>([]);

    async function getParticipants() {
        if (loading) return;

        try {
            setLoading(true);
            setError(undefined);

            const { data } = await repository.list(optionsParams);



            setParticipants(data);

            // setParticipants(
            //     participantsData
            // );
            console.log('participants: ', participants);
        } catch (error) {
            setError(formatErrorForNotification(error));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getParticipants();
    }, []);


    useEffect(() => {
        console.log('participants atualizados:', participants);
    }, [participants]);


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
