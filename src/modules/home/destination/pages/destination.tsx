// import { useAuth } from '@/modules/auth/hooks';
// import { useProductivePhaseListParams } from '@/modules/company/hooks/productive-phase-list-params.hook';
import { LinkButton, Page, PageButtons, PageCard, PageHeader, PageTitle } from '@/shared/components';
import { Box, Button } from '@mui/material';
// import useSWR from 'swr';
// import { ProductivePhaseListTable } from '../components/productive-phase-list-table';
import { useAuth } from '@/modules/auth/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { useDestinationListParams } from '../hook/destination-list-params.hook';
import { DestinationRepository } from '../repositories/destination.repository';
import { DestinationListFilter } from './components/list/destination-list-filter';
import { DestinationListTable } from './components/list/destination-list-table';

// import { Cards } from '../repositories/home-repository';
// import { useForm } from 'react-hook-form';

export function DestinationList() {
    const [isModalOpen, setModalOpen] = useState(false);
    // const [cards] = useState<Cards>({
    //     countAllAssets: 0,
    //     countAllSubsetsCompany: 0,
    // });



    const { user } = useAuth();
    const { watch } = useForm({
        defaultValues: {
            searchText: '',
            level: undefined,
        },
    });
    const searchText = watch('searchText');
    const level = watch('level');
    const repository = new DestinationRepository();
    const { params, onChangePagination } = useDestinationListParams();
    const { data, isLoading, error, mutate } = useSWR(
        [
            `fornos-${user?.id}`,
            { ...params, filter: { search: searchText, level: level } },
        ],
        ([_url, value]) => repository.list(value),
    );

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = async () => {
        setModalOpen(false);
        await mutate();
    };

    return (
        <Page>
            <PageHeader>
                <PageTitle toHome>Destinos</PageTitle>
                <PageButtons>
                    <LinkButton to='./novo' variant='contained'
                        size='large'
                        sx={{ minWidth: '180px' }}>
                        Novo Destino
                    </LinkButton>
                </PageButtons>
            </PageHeader>
            <PageCard sx={{ flexGrow: 1 }}>
                <Box sx={{ width: '100%' }}>
                    <DestinationListFilter />
                    <DestinationListTable
                        data={data}
                        isLoading={isLoading}
                        error={error}
                        mutate={mutate}
                        params={params}
                        onChangePagination={onChangePagination}
                    />
                </Box>
            </PageCard>
        </Page>
    );
}
