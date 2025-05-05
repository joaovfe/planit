import {
  AccountCircleSharp,
  HomeOutlined
} from '@mui/icons-material';
import { Navigate } from 'react-router-dom';

import { EAuthenticatedPath } from '../domain/enums/authenticated-path.enum';
import { IRoute } from '../domain/interfaces/route.interface';

import { DestinationCreate } from '@/modules/home/destination/pages/components/create/destination-create';
import { Home } from '@/modules/home/pages/home';
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
    path: EAuthenticatedPath.DESTINATION,
    children: [
      // {
      //   index: true,
      //   name: 'Destino',
      //   element: <DestinationList />,
      // },
      {
        name: 'Criar Viagem',
        hidden: true,
        path: 'novo',
        children: [
          {
            name: 'Criar Viagem',
            index: true,
            element: <DestinationCreate />,
          },
        ],
      },
    ],
  },
];
