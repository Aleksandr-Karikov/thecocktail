import { Drink } from '../types';
import cls from './styles.module.scss';

interface DrinkCardProps {
    drink: Drink;
}

export function DrinkCard({ drink }: DrinkCardProps) {
    return (
        <div className={cls.card}>
            <div className={cls.cardItem}>
                <div>
                    <p>{drink.strCategory}</p>
                    <p>{drink.strAlcoholic}</p>
                    <p>{drink.strGlass}</p>
                </div>
                <div>
                    <h2>instructions:</h2>
                    <p>{drink.strInstructions}</p>
                </div>
                <div>
                    <h2>list of ingredients:</h2>
                    {drink.ingredients.map((ing) => {
                        return (
                            <p
                                key={ing.name}
                            >{`${ing.measure ?? ''} ${ing.name}`}</p>
                        );
                    })}
                </div>
            </div>
            <div className={cls.cardItem}></div>
        </div>
    );
}
