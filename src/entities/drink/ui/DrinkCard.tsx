import { Drink } from '../types';

interface DrinkCardProps {
    drink: Drink;
}

export function DrinkCard({ drink }: DrinkCardProps) {
    return <div>{drink.idDrink}</div>;
}
