import { UserCreateData } from '@/modules/user/domain';
import { ControlledText } from '@/shared/components';
// import { ControlledPassword, ControlledRole, ControlledText } from '@/shared/components';
import { Divider, Grid, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export function DestinationCreateForm() {
    const { control } = useFormContext<UserCreateData>();

    return (
        <Grid container spacing={2}>
            <Grid item md={12} sm={12} xs={12}>
                <Typography component='h2' variant='h5' fontWeight='bold'>
                    Crie um destino
                </Typography>
                <Divider orientation='horizontal' variant='middle' flexItem sx={{ marginTop: '5px', marginLeft: 0 }} />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
                <ControlledText label='Nome' name='name' control={control} />
            </Grid>

            <Grid item md={6} sm={12} xs={12}>
                <ControlledText control={control} name='email' label='E-mail' />
            </Grid>

        </Grid>
    );
}
