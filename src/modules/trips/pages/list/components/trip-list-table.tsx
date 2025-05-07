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
import { useTripsListParams } from '@/modules/trips/hooks/trips-list-params.hook';
import { TripRepository } from '@/modules/trips/repositories/trips.repository';
import { useUser } from '@/modules/user/hooks';

export function TripListTable() {
    const { user } = useAuth();
    const canDelete = true

    const navigate = useNavigate();

    const repository = new TripRepository();

    const { params, onChangePagination } = useTripsListParams();
    const { deleteUser } = useUser();

    const [toggleColumns, setToggleColumns] = useState<Record<string, IOption<boolean>>>({
        user: { label: "Criador", value: true },
        name: { label: 'Nome', value: true },
        departureDateTime: { label: "Data da viagem", value: true },
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
            name: 'departureDatetime',
            label: 'Data da Viagem',
            options: {
                display: true,
                customBodyRender: (value: string) => {
                    const date = new Date(value);
                    return date.toLocaleString('pt-BR');
                },
            },
        },
        {
            name: 'participants',
            label: 'Participantes',
            options: {
                customBodyRender: (participants: any[]) => {
                    if (!participants || participants.length === 0) return 'Nenhum';
                    return participants.map(p => p.name).join(', ');
                },
                display: true,
            }
        },
        {
            name: 'season',
            label: 'Estação',
            options: {
                customBodyRender: (season: any) => season?.name ?? '-',
                display: true,
            },
        },

        {
            name: 'user',
            label: 'Criado por',
            options: {
                customBodyRender: (user: any) => user?.name ?? '-',
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
                            action: () => deleteUser(id, mutate),
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
