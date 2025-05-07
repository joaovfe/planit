import { ControlledText } from '@/shared/components';
import { Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { DestinationUpdateSchema } from '../../../domain/schemas/destination-update.schema';

export function DestinationUpdateForm() {
  const { control } = useFormContext<DestinationUpdateSchema>();

  console.log('control: ', control);

  return (
    <Grid container spacing={6}>
      <Grid item md={12} sm={12} xs={12} sx={{ marginTop: 2 }}>
        <ControlledText control={control} label="Nome" name="name" />
      </Grid>

      <Grid item md={12} sm={12} xs={12}>
        <ControlledText
          control={control}
          name="description"
          label="Descrição"
          multiline
          minRows={6}
        />
      </Grid>
    </Grid>
  );
}
