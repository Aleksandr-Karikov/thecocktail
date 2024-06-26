import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DrinkCard, isCocktailCode } from 'src/entities/drink';
import { NotFound } from 'src/widgets/not-found';
import { drinkStore } from 'src/entities/drink';
import { Tab, Tabs } from 'src/shared/ui/tabs';
import cls from './styles.module.scss';
export function CocktailPageObserver() {
    const { code } = useParams();

    const isCorrectCode = !code || !isCocktailCode(code);
    const { drinks: drinksMap, isLoading, error, selectedDrinkId } = drinkStore;

    useEffect(() => {
        if (isCorrectCode) {
            return;
        }
        void drinkStore.fetchDrinks(code, {
            setSelected: true,
        });
    }, [code, isCorrectCode]);

    if (!code || !isCocktailCode(code)) {
        return <NotFound />;
    }

    if (isLoading) {
        return <div>Загрузка</div>;
    }
    if (error) {
        return <div>Ошибка</div>;
    }
    const selectedDrinks = drinksMap.get(code);
    return (
        <Tabs
            selectedTab={selectedDrinkId}
            onChangeTab={(tab) => drinkStore.setSelectedDrinkId(tab)}
        >
            {selectedDrinks?.length &&
                selectedDrinks.map((drink) => (
                    <Tab
                        key={drink.idDrink}
                        value={drink.idDrink}
                        label={drink.strDrink}
                    >
                        <div className={cls.cardWrapper}>
                            <DrinkCard className={cls.card} drink={drink} />
                        </div>
                    </Tab>
                ))}
        </Tabs>
    );
}

export const CocktailPage = observer(CocktailPageObserver);
