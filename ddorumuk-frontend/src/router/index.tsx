import HomeComponent from '@/pages/home';
import SelectComponent from '@/pages/select';
import Layout from '@/components/layout';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomeComponent /> },
      { path: 'select', element: <SelectComponent /> },
    ],
  },
];

export default routes;