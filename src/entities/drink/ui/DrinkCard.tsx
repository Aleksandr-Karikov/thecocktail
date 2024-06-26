import { useLazy } from 'src/shared/hooks/useLazy';
import { Drink } from '../types';
import cls from './styles.module.scss';
import { clsx } from 'clsx';

interface DrinkCardProps {
    drink: Drink;
    className?: string;
}

export function DrinkCard({ drink, className }: DrinkCardProps) {
    const ref = useLazy(drink.strDrinkThumb);
    return (
        <div className={clsx(cls.card, className)}>
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
            <div className={cls.cardItem}>
                <img className={cls.image} ref={ref} alt="drink" />
            </div>
        </div>
    );
}
