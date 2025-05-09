import { Divider, Grid, Typography } from '@mui/material';
import { ControlledPassword, ControlledText } from '@/shared/components';
import { useFormContext } from 'react-hook-form';
import { UserUpdateData } from '@/modules/user/domain';
import { ControlledRole } from '@/shared/components/fields/controlled-role';
import { ControlledClimate } from '@/shared/components/fields/controlled-climate';
import { ControlledCountry } from '@/shared/components/fields/controlled-country';
import { ControlledSeason } from '@/shared/components/fields/controlled-season';

export function UserUpdateForm() {
  const { control } = useFormContext<UserUpdateData>();

  return (
    <Grid container spacing={2}>
      <Grid item md={12} sm={12} xs={12}>
        <Typography component='h2' variant='h5' fontWeight='bold'>
          Dados de Acesso
        </Typography>
        <Divider orientation='horizontal' variant='middle' flexItem />
      </Grid>

      <Grid item md={6} sm={12} xs={12}>
        <ControlledText label='Nome' name='name' control={control} />
      </Grid>

      <Grid item md={3} sm={6} xs={12}>
        <ControlledClimate label='Clima favorito' name='climatePreference' control={control} />
      </Grid>

      <Grid item md={6} sm={6} xs={12}>
        <ControlledCountry label='País que gostaria de visitar' name='countryDesired' control={control} />
      </Grid>

      <Grid item md={6} sm={6} xs={12}>
        <ControlledSeason label='Estação do ano favorita' name='seasonPreference' control={control} />
      </Grid>




      <Grid item md={6} sm={12} xs={12}>
        <ControlledText control={control} name='email' label='E-mail' />
      </Grid>

      <Grid item md={6} sm={12} xs={12}>
        <ControlledPassword control={control} name='password' label='Senha' />
      </Grid>
      <Grid item md={6} sm={12} xs={12}>
        <ControlledRole label='Perfil' name='role' control={control} />
      </Grid>
    </Grid>
  );
}
