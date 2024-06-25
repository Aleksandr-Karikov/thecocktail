import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CocktailPage } from 'src/pages/cocktail';
import { ErrorPage } from 'src/pages/error';
import { Layout } from 'src/widgets/layout';
import { NotFound } from 'src/widgets/not-found';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: `/cocktails/:code`,
                element: <CocktailPage />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);

export function AppRouterProvider() {
    return <RouterProvider router={router} />;
}
