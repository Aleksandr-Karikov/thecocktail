import { CocktailCode } from './types';

export function isCocktailCode(code: string): code is CocktailCode {
    return Object.values<string>(CocktailCode).includes(code);
}
