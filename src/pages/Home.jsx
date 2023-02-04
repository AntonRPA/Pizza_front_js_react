import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { useEffect, useState } from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activCategory, setActivCategory] = useState(0);
  const [selectSort, setSelectSort] = useState({
    name: 'популярности (убыв.)',
    sortProperty: 'rating',
  });

  //Смена активной категории
  const onClickCategory = (i) => {
    setActivCategory(i);
    console.log('Select category: ' + i);
  };

  //Get json массив объектов (пицц)
  useEffect(() => {
    setIsLoading(true); //Включения скелетона

    const sortBy = selectSort.sortProperty.replace('-', '');
    const order = selectSort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = activCategory > 0 ? `&category=${activCategory}` : '';

    fetch(
      `https://63dcc767367aa5a7a401c039.mockapi.io/items?sortBy=${sortBy}&order=${order}${category}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получение items');
      });

    window.scrollTo(0, 0); //скролл вверх при первом переходе на страницу главную
  }, [activCategory, selectSort]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories activCategory={activCategory} onClickCategory={onClickCategory} />
        <Sort selectSort={selectSort} onClickSortProps={(i) => setSelectSort(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
}

export default Home;
