import { LinkButton, Page, PageButtons, PageCard, PageHeader, PageTitle } from '@/shared/components';
import { TripListFilter } from './components/trip-list-filter';
import { TripListTable } from './components/trip-list-table';

export function TripsList() {
    return (
        <Page>
            <PageHeader>
                <PageTitle toHome>Tipos de Perfil</PageTitle>

                <PageButtons>
                    <LinkButton to='./novo' variant='contained' size='large' sx={{ minWidth: '180px' }}>
                        Nova Viagem
                    </LinkButton>
                </PageButtons>

            </PageHeader>

            <PageCard sx={{ flexGrow: 1 }}>
                <TripListFilter />
                <TripListTable />
            </PageCard>
        </Page>
    );
}
