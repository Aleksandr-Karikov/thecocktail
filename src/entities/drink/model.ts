import { makeAutoObservable } from 'mobx';
import { getDrinksByCocktailCode } from './api';
import { CocktailCode, Drink } from './types';

interface FetchDrinksOptions {
    onSuccess?: (drinks: Drink[]) => void;
    ignoreCache?: boolean;
}

class Cocktail {
    drinks: Map<CocktailCode, Drink[]>;
    error?: string;
    isLoading = false;
    selectedDrink?: Drink;

    constructor() {
        makeAutoObservable(this);
        this.drinks = new Map();
    }

    async fetchDrinks(code: CocktailCode, options?: FetchDrinksOptions) {
        const ignoreCache = options?.ignoreCache ?? false;

        if (this.drinks.has(code) && !ignoreCache) {
            return this.drinks.get(code);
        }
        this.setIsLoading(true);
        const response = await getDrinksByCocktailCode(code);
        this.setIsLoading(false);
        if (response.error) {
            this.setError(response.error);
        } else {
            const drinks = response.data?.drinks ?? [];
            options?.onSuccess?.(drinks);
            this.setDrinks(code, drinks);
            this.setError();
        }
    }
    setDrinks(code: CocktailCode, drinks: Drink[]) {
        this.drinks = new Map(this.drinks).set(code, drinks);
    }
    setIsLoading(is: boolean) {
        this.isLoading = is;
    }
    setError(error?: string) {
        this.error = error;
    }
    setSelectedDrink(drink?: Drink) {
        this.selectedDrink = drink;
    }
}

export default new Cocktail();
