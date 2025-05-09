import { Divider, Grid, Typography } from '@mui/material';
import { ControlledPassword, ControlledText } from '@/shared/components';
import { useFormContext } from 'react-hook-form';
import { UserCreateData } from '@/modules/user/domain';
import { ControlledClimate } from '@/shared/components/fields/controlled-climate';
import { ControlledCountry } from '@/shared/components/fields/controlled-country';
import { ControlledSeason } from '@/shared/components/fields/controlled-season';
import { ControlledRole } from '@/shared/components/fields/controlled-role';
import { ERoleUserReference } from '@/modules/role/domain';

export function UserForm() {
  const { control } = useFormContext<UserCreateData>();

  return (
    <Grid container spacing={2}>
      <Grid item md={12} sm={12} xs={12} marginTop={6}>
        <Typography component='h2' variant='h5' fontWeight='bold'>
          Dados de Acesso
        </Typography>
        <Divider orientation='horizontal' variant='middle' flexItem />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <ControlledText label='Nome de Exibição' name='name' control={control} />
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

      <Grid item sm={6} xs={6} md={12}>
        <ControlledRole label='Perfil' name='role' control={control} defaultValue={ERoleUserReference.USER} />
      </Grid>



      <Grid item md={6} sm={12} xs={12}>
        <ControlledText control={control} name='email' label='E-mail' />
      </Grid>

      <Grid item md={6} sm={12} xs={12}>
        <ControlledPassword control={control} name='password' label='Senha' />
      </Grid>
    </Grid>
  );
}
