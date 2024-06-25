import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DrinkCard, isCocktailCode } from 'src/entities/drink';
import { NotFound } from 'src/widgets/not-found';
import { drinkStore } from 'src/entities/drink';
export function CocktailPageObserver() {
    const { code } = useParams();

    const isCorrectCode = !code || !isCocktailCode(code);
    const { drinks: drinksMap, isLoading, error, selectedDrink } = drinkStore;

    useEffect(() => {
        if (isCorrectCode) {
            return;
        }
        void drinkStore.fetchDrinks(code, {
            onSuccess: (drinks) => {
                if (drinks.length) {
                    drinkStore.setSelectedDrink(drinks[0]);
                }
            },
        });
    }, [code, isCorrectCode]);

    if (!code || !isCocktailCode(code)) {
        return <NotFound />;
    }

    if (isLoading) {
        return <div>Загрузка</div>;
    }
    const selectedDrinks = drinksMap.get(code);
    return (
        <div>
            <div>
                {selectedDrinks?.length &&
                    selectedDrinks.map((drink) => (
                        <button
                            key={drink.idDrink}
                            onClick={() => drinkStore.setSelectedDrink(drink)}
                        >
                            {drink.strDrink}
                        </button>
                    ))}
            </div>
            {selectedDrink && !error && <DrinkCard drink={selectedDrink} />}
        </div>
    );
}

export const CocktailPage = observer(CocktailPageObserver);
