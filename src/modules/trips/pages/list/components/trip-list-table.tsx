import { MUIDataTableColumnDef, MUIDataTableOptions } from 'mui-datatables';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import {
    DataTable,
    DataTableColumnMenu,
    DataTableToggleColumns
} from '@/shared/components';
import { IMenu, IOption } from '@/shared/domain';

import { useAuth } from '@/modules/auth/hooks';
import { useTrip } from '@/modules/trips/hooks/trip.hook';
import { useTripsListParams } from '@/modules/trips/hooks/trips-list-params.hook';
import { TripRepository } from '@/modules/trips/repositories/trips.repository';
import { formatDate } from '@/shared/utils';
import { Chip } from '@mui/material';

export function TripListTable() {
    const { user } = useAuth();
    const canDelete = true

    const navigate = useNavigate();

    const repository = new TripRepository();

    const { params, onChangePagination } = useTripsListParams();
    const { deleteTrip } = useTrip();

    const [toggleColumns, setToggleColumns] = useState<Record<string, IOption<boolean>>>({
        user: { label: "Criador", value: true },
        name: { label: 'Nome', value: true },
        endDate: { label: "Data final", value: true },
        startDate: { label: "Data inicial", value: true },
        season: { label: "Estação", value: true },
        participants: { label: "Participantes", value: true }

        // email: { label: 'E-mail', value: true },
    });

    const { data, isLoading, error, mutate } = useSWR([`trip-list-${user?.id}`, params], ([_url, value]) =>
        repository.list(value),
    );

    function handleToggleColumn(column: string) {
        setToggleColumns((prev) => ({
            ...prev,
            [column]: {
                label: prev[column].label,
                value: !prev[column].value,
            },
        }));
    }

    const columns: Array<MUIDataTableColumnDef> = [

        {
            name: 'name',
            label: toggleColumns['name'].label,
            options: {
                sortThirdClickReset: true,
                display: toggleColumns['name'].value,
            },
        },

        {
            name: 'startDate',
            label: 'Inicio da Viagem',
            options: {
                display: true,
                customBodyRender: (value: string) => {
                    return formatDate(value);
                },
            },
        },
        {
            name: 'endDate',
            label: 'Final da Viagem',
            options: {
                display: true,
                customBodyRender: (value: string) => {
                    return formatDate(value);
                },
            },
        },
        {
            name: 'participants',
            label: 'Participantes',
            options: {
                customBodyRender: (participants: any[]) => {
                    if (!participants || participants.length === 0) return 'Nenhum';
                    <Chip


                    />


                    return participants.map(p => p.name).join(', ');
                },
                display: true,
            }
        },
        {
            name: 'user',
            label: 'Criado por',
            options: {
                customBodyRender: (user: any) => {
                    if (!user || !user.name) return '-';

                    return <Chip label={user.name} sx={{
                        color: 'text.primary',
                        height: 16,
                        lineHeight: 1,
                        letterSpacing: 0.2,
                    }} />;
                },
                display: true,
            },
        },

        {
            name: 'id',
            label: ' ',
            options: {
                sort: false,
                customHeadLabelRender: () => {
                    return (
                        <DataTableToggleColumns
                            toggleColumns={toggleColumns}
                            onToggle={handleToggleColumn}
                            setToggleColumns={setToggleColumns}
                        />
                    );
                },
                customBodyRender: (id: number, { }) => {


                    const items: Array<IMenu> = [
                        {
                            label: 'Ver Detalhes',
                            action: () => navigate(`./${id}`),
                        },

                    ];

                    if (canDelete) {
                        items.push({
                            label: 'Excluir',
                            action: () => deleteTrip(id, mutate),
                        });
                    }

                    return <DataTableColumnMenu items={items} />;
                },
            },
        },
    ];

    const options: MUIDataTableOptions = {
        page: (params.pagination.skip ?? 1) - 1,
        rowsPerPage: params.pagination.take,
        count: data?.total,

        setRowProps: () => ({ style: { cursor: 'pointer' } }),

        onRowClick: (_, { dataIndex }) => {
            const { id } = data?.data[dataIndex] as any;

            if (id) navigate(`./${id}`);
        },

        onChangePage: (currentPage: number) =>
            onChangePagination({
                skip: currentPage + 1,
            }),

        onChangeRowsPerPage: (numberOfRows: number) =>
            onChangePagination({
                take: numberOfRows,
            }),

        onColumnSortChange: (changedColumn: string, direction: 'asc' | 'desc' | 'none') => {
            if (direction === 'none') {
                onChangePagination({
                    orderBy: undefined,
                    ordering: undefined,
                });
                return;
            }

            onChangePagination({
                orderBy: changedColumn,
                ordering: direction,
            });
        },
    };

    return (
        <Fragment>
            <DataTable
                loading={isLoading}
                data={data ? data.data : []}
                columns={columns}
                options={options}
                error={error}
            />
        </Fragment>
    );
}
