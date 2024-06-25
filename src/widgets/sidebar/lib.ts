import { CocktailCode } from 'src/entities/drink';
import { SidebarElement } from './types';

export const sidebarItems: SidebarElement[] = Object.values(CocktailCode).map(
    (code) => ({
        path: `/cocktails/${code}`,
        title: code,
    })
);
