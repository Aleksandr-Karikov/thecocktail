export enum CocktailCode {
    Margarita = 'margarita',
    MapEntryojito = 'mojito',
    Kir = 'kir',
    A1 = 'a1',
}

export interface Ingredient {
    name: string;
    measure: string | null;
}
export interface Drink {
    idDrink: string;
    strDrink: string;
    strDrinkAlternate: string | null;
    strTags: string | null;
    strVideo: string | null;
    strCategory: string;
    strIBA: string | null;
    strAlcoholic: string;
    strGlass: string;
    strInstructions: string;
    strInstructionsES: string | null;
    strInstructionsDE: string | null;
    strInstructionsFR: string | null;
    strInstructionsIT: string | null;
    strInstructionsZH_HANS: string | null;
    strInstructionsZH_HANT: string | null;
    ingredients: Ingredient[];
    strImageSource: string | null;
    strImageAttribution: string | null;
    strCreativeCommonsConfirmed: string;
    dateModified: string;
}
