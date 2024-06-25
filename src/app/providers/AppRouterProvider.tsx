import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider,
} from 'react-router-dom';
import { CocktailCode } from 'src/entities/drink';
import { CocktailPage } from 'src/pages/cocktail';
import { Layout } from 'src/widgets/layout';
import { NotFound } from 'src/widgets/not-found';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route
                index
                element={
                    <Navigate
                        to={`/cocktails/${CocktailCode.Margarita}`}
                        replace
                    />
                }
            />
            <Route path={`/cocktails/:code`} element={<CocktailPage />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

export function AppRouterProvider() {
    return <RouterProvider router={router} />;
}
