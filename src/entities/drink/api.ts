import { api } from 'src/shared/lib/axios';
import { ApiResponse } from 'src/shared/types/ApiResponse';
import { AxiosError } from 'axios';
import { UNHANDLED_ERROR } from 'src/shared/constants/api';
import { Drink, CocktailCode, Ingredient } from './types';

interface GetRecipeResponse {
    drinks: Drink[];
}

export async function getDrinksByCocktailCode(
    code: CocktailCode
): Promise<ApiResponse<GetRecipeResponse>> {
    try {
        const response = await api.get<{ drinks: Record<string, string>[] }>(
            'api/json/v1/1/search.php',
            {
                params: { s: code },
            }
        );
        const drinks = response.data.drinks.map((drink) => {
            const ingredients: Ingredient[] = [];
            for (const [key, value] of Object.entries(drink)) {
                if (value && key.startsWith('strIngredient')) {
                    const [, index] = key.split('strIngredient');
                    const measureKey = `strMeasure${index}`;
                    const measure = drink[measureKey];
                    ingredients.push({ name: value, measure });
                }
            }
            return { ...drink, ingredients } as Drink;
        });
        console.log(drinks);
        return { data: { drinks } };
    } catch (e) {
        if (e instanceof AxiosError) {
            return { error: e.message };
        } else {
            return { error: UNHANDLED_ERROR };
        }
    }
}
