import { api } from 'src/shared/lib/axios';
import { ApiResponse } from 'src/shared/types/ApiResponse';
import { AxiosError } from 'axios';
import { UNHANDLED_ERROR } from 'src/shared/constants/api';
import { Drink, CocktailCode } from './types';

interface GetRecipeResponse {
    drinks: Drink[];
}

export async function getDrinksByCocktailCode(
    code: CocktailCode
): Promise<ApiResponse<GetRecipeResponse>> {
    try {
        const response = await api.get<GetRecipeResponse>(
            'api/json/v1/1/search.php',
            {
                params: { s: code },
            }
        );
        return { data: response.data };
    } catch (e) {
        if (e instanceof AxiosError) {
            return { error: e.message };
        } else {
            return { error: UNHANDLED_ERROR };
        }
    }
}
