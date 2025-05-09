// import { useAuth } from '@/modules/auth/hooks';
// import { useProductivePhaseListParams } from '@/modules/company/hooks/productive-phase-list-params.hook';
import { LinkButton, Page, PageButtons, PageCard, PageHeader, PageTitle } from '@/shared/components';
import { Card, CardContent, Grid, Typography } from '@mui/material';
// import useSWR from 'swr';
// import { ProductivePhaseListTable } from '../components/productive-phase-list-table';
import { useEffect, useState } from 'react';
import { DestinationCardProps } from '../destination/pages/components/list/destination-card';
import { Cards, HomeRepository } from '../repositories/home-repository';
import { DestinationRepository } from '../destination/repositories/destination.repository';
import { DestinationDto } from '../destination/domain/dto/destination.dto';
import { TripRepository } from '@/modules/trips/repositories/trips.repository';
// import { useForm } from 'react-hook-form';

export function Home() {
  const [cards, setCards] = useState<DestinationDto[]>([
    {
      id: 0,
      name: '',
      description: '',
    },
  ]);
  const [tripSuggestion, setTripSuggestion] = useState<string | null>(null);
  // const { user } = useAuth();
  // const { control, watch } = useForm({
  //   defaultValues: {
  //     searchText: '',
  //     level: undefined,
  //   },
  // });
  // const searchText = watch('searchText');
  // const level = watch('level');
  // const productivePhaseRepository = new ProductivePhaseRepository();
  const repository = new DestinationRepository();
  const tripRepository = new TripRepository();
  // const { params, onChangePagination } = useProductivePhaseListParams();
  // const { data, isLoading, error, mutate } = useSWR(
  //   [
  //     `productive-phase-list-${user?.id}`,
  //     { ...params, filter: { search: searchText, level: level } },
  //   ],
  //   ([_url, value]) => productivePhaseRepository.list(value),
  // );

  useEffect(() => {
    repository.list().then((value) => {
      setCards(value);
    });

    const fetchSuggestion = async () => {
      try {
        const suggestion = await tripRepository.suggestTrip();
        setTripSuggestion(suggestion.message);
        console.log('suggestion: ', suggestion);
      } catch (error) {
        console.error('Erro ao buscar sugestão de viagem', error);
      }
    };


    fetchSuggestion();
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const updateCards = async () => {
    const updatedCards = await repository.list();
    setCards(updatedCards);
  };

  console.log('cards: ', cards);

  return (
    <Page>
      <PageHeader>
        <PageTitle toHome>Destinos</PageTitle>
        {/* <PageButtons> */}
        {/* <LinkButton to='./novo' variant='contained' size='large' sx={{ minWidth: '180px' }}>
            Nova Viagem
          </LinkButton> */}
        {/* </PageButtons> */}
        <Grid spacing={3} container>
          <Grid xs={12} md={4} item>
            {/* <Card variant='outlined' sx={{ borderRadius: 2, flexGrow: 1, boxShadow: 1 }}> */}
            {/* <CardContent>
                <Typography variant='h6' component='div'>
                  Viagens cadastradas
                </Typography>
                <Typography variant='h5' color={'primary'}>
                  {cards[0].countAllAssets}
                </Typography>
              </CardContent> */}
            {/* </Card> */}
          </Grid>


          {/* <Grid xs={12} md={4} item>
            <Card variant='outlined' sx={{ borderRadius: 2, flexGrow: 1, boxShadow: 1 }}>
              <CardContent>
                <Typography variant='h6' component='div'>
                  Alarmes Disparados
                </Typography>
                <Typography variant='h5' color={'primary'}>
                  {cards.countAllSubsetsCompany}
                </Typography>
              </CardContent>
            </Card>
          </Grid> */}

          {/* <Grid xs={12} md={4} item>
            <Card variant='outlined' sx={{ borderRadius: 2, flexGrow: 1, boxShadow: 1 }}>
              <CardContent>
                <Typography variant='h6' component='div'>
                  Alarmes ativados
                </Typography>
                <Typography variant='h5' color={'primary'}>
                  {cards.countAllSubsetsCompany}
                </Typography>
              </CardContent>
            </Card>
          </Grid> */}
        </Grid>
      </PageHeader>


      {/* 
      {data && data.data && data.data.length > 0 && (
        <Grid item xs={12}>
          <AlarmLogTable logs={data.data} />
        </Grid>
      )} */}

      {tripSuggestion && (
        <Card variant='outlined' sx={{ mb: 2, borderRadius: 2 }}>
          <CardContent>
            <Typography variant='subtitle1' fontWeight='bold'>
              Sugestão de Destino:
            </Typography>
            <Typography variant='body2'>
              {tripSuggestion}
            </Typography>
          </CardContent>
        </Card>
      )}

      <PageCard sx={{ flexGrow: 1 }}>
        <Grid spacing={2} container>
          <Grid md={12} item>
            <Typography variant='h6'>Cátalogo</Typography>
          </Grid>
          <Grid md={12} item>
            <DestinationCardProps onUpdate={updateCards} />
          </Grid>
        </Grid>
      </PageCard>
    </Page>
  );
}
