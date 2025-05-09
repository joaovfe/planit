import { AutocompleteProps } from '@mui/material';
import { useEffect, useState } from 'react';
import { UseControllerProps } from 'react-hook-form';

import { formatErrorForNotification } from '@/shared/utils/error';

import { Climate } from '@/modules/climate/domain/entities/climate.entity';
import { ClimateRepository } from '@/modules/climate/repositories/climate-repository';
import { RoleListDTO } from '@/modules/role/domain/dto';
import { ControlledAutocomplete } from '.';

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

export function ControlledClimate({ optionsParams, ...props }: Props) {
  const repository = new ClimateRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | undefined>();

  const [roles, setRoles] = useState<Array<Climate>>([]);

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
      getOptionLabel={(role: Climate) => role?.name ?? ''}
      isOptionEqualToValue={(option, selected) => option?.id === selected?.id}
    />
  );
}
