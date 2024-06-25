import { makeAutoObservable } from 'mobx';
import { getDrinksByCocktailCode } from './api';
import { CocktailCode, Drink } from './types';

interface FetchDrinksOptions {
    ignoreCache?: boolean;
    setSelected?: boolean;
}

class Cocktail {
    drinks: Map<CocktailCode, Drink[]>;
    error?: string;
    isLoading = false;
    selectedDrinkId?: string;

    constructor() {
        makeAutoObservable(this);
        this.drinks = new Map();
    }

    async fetchDrinks(code: CocktailCode, options?: FetchDrinksOptions) {
        const ignoreCache = options?.ignoreCache ?? false;
        const setSelected = options?.setSelected ?? false;

        const updateSelected = (drinks: Drink[]) => {
            // Задаем выбранный элемент
            if (drinks.length > 0) {
                this.setSelectedDrinkId(drinks[0].idDrink);
            }
        };

        if (this.drinks.has(code) && !ignoreCache) {
            const drinks = this.drinks.get(code) ?? [];
            if (setSelected) {
                updateSelected(drinks);
            }
            return drinks;
        }

        // сбрасываем ошибку
        this.setError();
        this.setIsLoading(true);
        const response = await getDrinksByCocktailCode(code);
        this.setIsLoading(false);

        if (response.error) {
            this.setError(response.error);
        } else {
            const drinks = response.data?.drinks ?? [];
            this.setDrinks(code, drinks);
            if (setSelected) {
                updateSelected(drinks);
            }
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
    setSelectedDrinkId(id?: string) {
        this.selectedDrinkId = id;
    }
}

export default new Cocktail();
