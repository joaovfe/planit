import {
  AccountCircleSharp,
  HomeOutlined,
  PersonOutline
} from '@mui/icons-material';
import { Navigate } from 'react-router-dom';

import { EAuthenticatedPath } from '../domain/enums/authenticated-path.enum';
import { IRoute } from '../domain/interfaces/route.interface';

import { TripCreate } from '@/modules/trips/pages/create/trips-create';
import { Home } from '@/modules/home/pages/home';
import { TripsList } from '@/modules/trips/pages/list/trips-list';
import { TripUpdate } from '@/modules/trips/pages/update/update-trip';
import { UserCreate, UserList, UserUpdate } from '@/modules/user/pages';
// import { DestinationList } from '@/modules/home/destination/pages/destination';

export const AUTHENTICATED_ROUTES: Array<IRoute> = [
  {
    name: 'Redirect',
    hidden: true,
    path: '*',
    element: <Navigate to={EAuthenticatedPath.HOME} />,
  },
  {
    name: 'Destinos',
    icon: <HomeOutlined />,
    element: <Home />,
    path: EAuthenticatedPath.HOME,
  },
  {
    name: 'Viagens',
    icon: <AccountCircleSharp />,
    path: EAuthenticatedPath.TRIP,
    children: [
      {
        index: true,
        name: 'Viages',
        element: <TripsList />,
      },
      {
        name: 'Criar Viagem',
        hidden: true,
        path: 'novo',
        children: [
          {
            name: 'Criar Viagem',
            index: true,
            element: <TripCreate />,
          },
        ],
      },
      {
        name: 'Ver Viagem',
        path: ':id',
        hidden: true,
        children: [
          {
            name: 'Editar Viagem',
            index: true,
            element: < TripUpdate />
          }
        ]
      }
    ],
  },
  {
    name: 'Usuários',
    icon: <PersonOutline />,
    path: EAuthenticatedPath.USERS,
    children: [
      {
        index: true,
        name: 'Usuários',
        element: <UserList />,
      },
      {
        name: 'Novo Usuário',
        hidden: true,
        path: 'novo',
        children: [
          {
            name: 'Novo Usuário',
            index: true,
            element: <UserCreate />,
          },
        ],
      },
      {
        name: 'Ver Usuário',
        hidden: true,
        path: ':id',
        children: [
          {
            name: 'Ver Usuário',
            index: true,
            element: <UserUpdate />,
          },
        ],
      },
    ],
  },
];
